import { usePuppetter } from './usePuppetter'
import puppeteer from 'puppeteer'

export async function useCreateCNPJ(cnpj: string, frame?: any) {
  const { page } = await usePuppetter('https://consultacnpj.com/')

  const aceitarCookie =
    '#modal > div > div.modal--content > div > div.modal_lgpd-notice-footer.row > a.modal-lgpd-notice__btn__primary.mt4.pt3.pb3.font-weight-bold'
  const input =
    '#__layout > div > div:nth-child(2) > div.consulta-cnpj-home.container > div.row > div > div.query--wrapper > div.cnpj--wrapper > div > div > input'

  await page.$eval(aceitarCookie, (el: any) => el.click())

  await page.focus(input)
  await page.keyboard.type(cnpj)

  await page.waitForTimeout(6000)

  const SeletorNomeDaEmpresa = '#company-data > div:nth-child(7) > p'
  const SeletorCep =
    '#company-data > div:nth-child(13) > div.d-flex.bg--secondary.print-grow-1 > div.p4.print-border.print-mr-2.print-grow-1 > p'
  const SeletorBairro =
    '#company-data > div:nth-child(13) > div.d-flex.bg--secondary.print-grow-1 > div.p4.print-border.print-mr-2.print-grow-2 > p'
  const SeletorLogradouro =
    '#company-data > div:nth-child(12) > div.p4.bg--secondary.print-border.print-mr-2.print-grow-3 > p'
  const SeletorEmail =
    '#company-data > div:nth-child(14) > div > p'
  
    const SeletorNumber =
    '#company-data > div:nth-child(12) > div.d-flex.print-grow-2 > div.p4.print-border.print-mr-2.print-grow-1 > p'
  
    const SeletorNumberRua =
    '#company-data > div:nth-child(12) > div.d-flex.print-grow-2 > div.p4.print-border.print-mr-2.print-grow-1 > p'
  const SeletorComplete =
    '#company-data > div:nth-child(12) > div.d-flex.print-grow-2 > div.p4.print-border.print-grow-2 > p'

  const nomeDaEmpresa = await page.$eval(SeletorNomeDaEmpresa, (el) =>
    el.textContent?.trim(),
  )
  const CompleteDaEmpresa = await page.$eval(SeletorComplete, (el) =>
    el.textContent?.trim(),
  )
  const NumberRuaDaEmpresa = await page.$eval(SeletorNumberRua, (el) =>
    el.textContent?.trim(),
  )
  const BairroDaEmpresa = await page.$eval(SeletorBairro, (el) =>
    el.textContent?.trim(),
  )
  const LogradouroDaEmpresa = await page.$eval(SeletorLogradouro, (el) =>
    el.textContent?.trim(),
  )
  const EmailDaEmpresa = await page.$eval(SeletorEmail, (el) =>
    el.textContent?.trim(),
  )
  const cepDaEmpresa = await page.$eval(SeletorCep, (el) =>
    el.textContent?.trim().replace(/[-.]/g, ''),
  )
  const numberDaEmpresa = await page.$eval(
    SeletorNumber,
    (el) => el.textContent?.split('/')!,
  )
  const numero1 = String(numberDaEmpresa[0]).trim()
  const ddd = numero1.substring(1, 3) // "41"
  const number = numero1.substring(5)

  const dataEmpresa = {
    name: nomeDaEmpresa,
    bairro: BairroDaEmpresa,
    lagradouro: LogradouroDaEmpresa,
    email: EmailDaEmpresa,
    numberAddress: NumberRuaDaEmpresa,
    cep: cepDaEmpresa,
    complement: CompleteDaEmpresa,
    ddd,
    number,
  }

  console.log(dataEmpresa)
  return dataEmpresa
}
