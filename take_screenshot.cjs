const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Simulate a 1080p desktop with standard dpr
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
    
    await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2' });
    
    await page.screenshot({ path: 'screenshot_localhost_desktop.png', fullPage: true });

    await browser.close();
})();
