import { Page } from 'puppeteer'

export async function nextNote(pageRes: Page) {
  const wrapper = await pageRes.$('.toggled')

  if (wrapper === null) {
    await pageRes.$eval('#menu-toggle', (el: any) => el.click())
    await pageRes.$eval(
      '#Menu1_MenuPrincipal > ul > li:nth-child(8) > ul > li:nth-child(1) > div > a',
      (el: any) => el.click(),
    )
  } else {
    await pageRes.$eval(
      '#Menu1_MenuPrincipal > ul > li:nth-child(8) > ul > li:nth-child(1) > div > a',
      (el: any) => el.click(),
    )
  }
}
