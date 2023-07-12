import puppeteer from 'puppeteer'

export function findStateAndCity(frame: puppeteer.Frame) {
  return new Promise(async (resolve, reject) => {
    await frame.waitForTimeout(5000)

    const uf = await frame.$eval('#txtUf', (el: any) => el.value)
    const city = await frame.$eval('#txtCidade', (el: any) => el.value)

    resolve({ uf, city })
  })
}
