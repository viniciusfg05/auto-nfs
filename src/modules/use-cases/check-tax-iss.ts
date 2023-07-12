import { Frame, Page } from "puppeteer";

interface CheckTaxIssProps {
  frame: Frame
  pageRes: Page
  isTax: boolean;
}

export async function CheckTaxIss({ frame, pageRes, isTax}: CheckTaxIssProps) {
  const selectorTaxIss = "#chkIssqnRetido"

  await pageRes.waitForTimeout(4000)

  await frame.waitForSelector(selectorTaxIss)
  // await frame.$eval(selectorTaxIss, (el: any) => el.checked = isTax)
  await frame.click(selectorTaxIss)

  await pageRes.waitForTimeout(1000)


  return 
}