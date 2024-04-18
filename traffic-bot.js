import puppeteer from 'puppeteer';

export async function searchGoogle(query, website) {
  const browser = await puppeteer.launch({ headless: false }); // Set headless to false to see the browser in action
  const page = await browser.newPage();

  // Step 1: Search for a keyword in Google
  await page.goto('https://www.google.com');
  await page.type('textarea[name=q]', query); // Replace 'your keyword here' with your actual keyword
  await page.keyboard.press('Enter');

  await page.waitForNavigation();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Step 2: Click on the first result
  const searchResults = await page.$$('a');
  let resultToClick;
  const resultLinks = [];
  for (let link of searchResults) {
    const href = await page.evaluate((el) => el.href, link);
    if (href && href.includes(website)) {
      resultLinks.push(link);
    }
  }
  if (resultLinks.length > 0) {
    resultToClick = resultLinks[0];
  } else {
    console.log('No search results for this keyword : ', query);
    await browser.close();
    return;
  }

  await resultToClick.scrollIntoView();
  await resultToClick.click();
  await page.waitForNavigation();

  // Step 4: Randomly click a link
  const returnedLinks = await page.$$('a');
  const links = [];
  for (let link of returnedLinks) {
    const href = await page.evaluate((el) => el.href, link);
    if (href && href.includes(website)) {
      links.push(link);
    }
  }
  const randomIndex = Math.floor(Math.random() * links.length);

  await links[randomIndex].scrollIntoView();
  await links[randomIndex].click();
  await page.waitForNavigation();

  await page.evaluate(async () => {
    window.scrollBy(0, window.innerHeight);
  });

  await browser.close();
}
