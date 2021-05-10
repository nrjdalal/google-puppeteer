const puppeteer = require("puppeteer");

const search = `"gym california"`;
console.log(`\n${search}`);

const searcher = async () => {
  const browser = await puppeteer.launch({
    // headless: false,
    // args: ["--window-size=1280,720"],
  });
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto("https://www.google.com/?gl=us&hl=en&pws=0");
  await page.type("input.gLFyf", search);
  await page.keyboard.press("Enter");
  await page.waitForNavigation();
  await page.waitForTimeout(5000);

  try {
    console.log("\nPaid links -\n");
    const paidlinks = await page.$$eval("div.d5oMvf > a", (links) =>
      links.map((link) => link.href)
    );
    for (i = 0; i < paidlinks.length; i++) {
      console.log(paidlinks[i]);
    }

    console.log("\nSEO links -\n");
    const seolinks = await page.$$eval("div.yuRUbf > a", (links) =>
      links.map((link) => link.href)
    );
    for (i = 0; i < seolinks.length; i++) {
      console.log(seolinks[i]);
    }

    console.log(
      `\nPaid links - ${paidlinks.length}\nSEO links - ${seolinks.length}\n`
    );
  } catch {
    console.log("Something Went Wrong!");
  }

  await browser.close();
};

searcher();
