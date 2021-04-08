import { NextApiHandler } from 'next';
import puppeteer from 'puppeteer';

export default (async (req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 404;
    return res.json({});
  }

  const postPath = req.body?.postPath;

  if (postPath == null) throw new Error('Bad request');

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.goto(`https://www.snappr.com/enterprise-blog${postPath}`);

    const element = await page.waitForSelector('.page-title');
    const value: string | null = await element?.evaluate(
      (el) => el.textContent
    );

    res.json({ title: value });
  } finally {
    await browser.close();
  }
}) as NextApiHandler;
