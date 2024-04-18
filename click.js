import puppeteer from 'puppeteer';

const searchGoogle = async (query) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://www.google.com', {
    timeout: 60000,
  });

  await page.type('textarea[name=q]', query);

  await page.keyboard.press('Enter');

  await page.waitForNavigation();

  const websites = await page.evaluate(() => {
    const elements = document.querySelectorAll('.LC20lb, .MBeuO, .DKV0Md');
    let websites = [];
    elements.forEach((element) => {
      const closestLink = element.closest('a');
      if (closestLink && closestLink.href.includes('azdinebouali.tech')) {
        websites.push(closestLink.href);
      }
    });
    return websites;
  });

  for (const website of websites) {
    console.log(website);

    const newPage = await browser.newPage();
    await newPage.goto(website, {
      timeout: 60000,
    });

    const links = await newPage.evaluate(() => {
      const elements = document.querySelectorAll('a');
      let links = [];
      elements.forEach((element) => {
        links.push(element.href);
      });
      return links;
    });

    for (const link of links) {
      console.log(link);
    }
  }
};

await searchGoogle('azdine bouali');
