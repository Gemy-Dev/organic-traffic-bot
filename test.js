import puppeteer from 'puppeteer';

export async function searchGoogle(query, website) {
  const browser = await puppeteer.launch({ headless: false }); // Set headless to false to see the browser in action
  const page = await browser.newPage();

  // Step 1: Search for a keyword in Google
  await page.goto('https://www.google.com');
  await page.type('textarea[name=q]', query); // Replace 'your keyword here' with your actual keyword
  await page.keyboard.press('Enter');

  await page.waitForNavigation({
    waitUntil: 'domcontentloaded',
  });

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
    console.log('Visiting website : ', website);
  } else {
    console.log('No search results for this keyword : ', query);
    await browser.close();
    return;
  }

  await resultToClick.scrollIntoView();
  await resultToClick.click();

  // click random links on the website

  await page.waitForNavigation({
    waitUntil: 'networkidle2',
  });

  // wait using Promise for random time to simulate human behavior
  const randomTime = Math.floor(Math.random() * 5000) + 3000;
  await new Promise((resolve) => setTimeout(resolve, randomTime));

  await browser.close();
}

await searchGoogle('vh magazine', 'vh.ma');
