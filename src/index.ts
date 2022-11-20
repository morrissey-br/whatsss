import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://web.whatsapp.com/");

  await page.waitForSelector('div[data-testid="qrcode"]');
  const qrCode = await page.evaluate(() => {
    const qrCodeDiv = document.querySelector('div[data-testid="qrcode"]');
    const qrCode = qrCodeDiv?.getAttribute("data-ref");
    return qrCode;
  });
  console.log(qrCode);

  await browser.close();
})();
