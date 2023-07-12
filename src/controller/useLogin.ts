import { ElementHandle, Frame, Page } from 'puppeteer'
import { usePuppetter } from './usePuppetter'

export async function login() {
  const { page, browser } = await usePuppetter(
    'https://df.issnetonline.com.br',
  )




  const login = '#btnAcionaCertificado'
  
  const seletorInput = "#txtLogin"

  // const checkingFillingCNPJ = await page.$eval(
  //   seletorInput,
  //   (el: any) => el.textContent == 31554504449)

  // await page.waitForSelector(login)
  // await page.click(login)

  // await page.waitForNavigation({ waitUntil: 'load' })
  const body = '#page-content-wrapper-main .container iframe'


  await page.waitForSelector(body, { visible: true, timeout: 120000 })


  return { page, browser }
}

export async function GetIframePage(page: Page): Promise<Frame> {
  const body = '#page-content-wrapper-main .container iframe'
  await page.waitForSelector(body, { visible: true, timeout: 120000 })

  const iframeHandle = await page.waitForSelector(body)

  const frame: any = await iframeHandle?.contentFrame()

  const title = '.text-center img'

  
  const wrapper = await page.$('.toggled')

  if (wrapper === null) {
    await page.$eval('#menu-toggle', (el: any) => el.click())
    await page.$eval(
      '#Menu1_MenuPrincipal > ul > li:nth-child(8) > ul > li:nth-child(1) > div > a',
      (el: any) => el.click(),
    )
  } else {
    await page.$eval(
      '#Menu1_MenuPrincipal > ul > li:nth-child(8) > ul > li:nth-child(1) > div > a',
      (el: any) => el.click(),
    )
  }

  return frame
}