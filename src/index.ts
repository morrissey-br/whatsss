import puppeteer from "puppeteer";
import qrcodeTerminal from "qrcode-terminal";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://web.whatsapp.com/");

  await page.waitForSelector('div[data-testid="qrcode"]');
  const qrcode = await page.evaluate(() => {
    const qrcodeDiv = document.querySelector('div[data-testid="qrcode"]');
    const qrcode = qrcodeDiv?.getAttribute("data-ref");
    return qrcode;
  });

  if (qrcode) {
    qrcodeTerminal.generate(qrcode, { small: true });
  }

  // await browser.close();
})();
