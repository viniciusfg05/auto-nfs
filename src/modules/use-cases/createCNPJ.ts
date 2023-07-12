import { Frame, Page } from 'puppeteer'
import { useCreateCNPJ } from '../../controller/useCreateCNPJ'

interface CreateCnpjProp {
  cnpj: string
  frame: Frame
  page: Page
}

export function createCnpj({ cnpj, frame, page }: CreateCnpjProp) {
  return new Promise(async (resolve, reject) => {
    const selector =
      'body > div.bootbox.modal.fade.in > div > div > div.modal-footer > div > button.btn.btn-success.nc-ok'

    const seletor = '#iframeModal'

    await frame.$eval(selector, (el: any) => el.click())
    // await frame.$eval("#base-modal > div > div > div.modal-header > button", (el: any) => el.click());

    const frameModal = await frame.$(seletor)
    const frameContent = await frameModal?.contentFrame()

    const resCNPJ = await useCreateCNPJ(cnpj, frame)
    const { name, cep, complement, numberAddress, number, ddd, email } = resCNPJ

    if (resCNPJ !== undefined) {
      const NomeRazao = '#TxtNomeRazao'
      const TxtFantasia = '#TxtFantasia'
      const cepAddress = '#txtCep'
      const numberAddressSelector = '#TxtNumero'
      const complementAddress = '#txtcomplemento'
      const emailCompany = '#txtemail'
      const numberPhone = '#TxtFone'
      const dddPhone = '#txtfoneddd'

      await frameContent?.waitForSelector(NomeRazao)
      await frameContent?.focus(NomeRazao)
      await page.keyboard.type(name!)

      await frameContent?.waitForTimeout(2000)

      await frameContent?.waitForSelector(TxtFantasia)
      await frameContent?.focus(TxtFantasia)
      await page.keyboard.type(name!)

      await frameContent?.waitForSelector(cepAddress)
      await frameContent?.focus(cepAddress)
      await page.keyboard.type(cep!)
      await page.keyboard.press('Tab')

      await frameContent?.waitForTimeout(3000)

      await frameContent?.waitForSelector(emailCompany)
      await frameContent?.focus(emailCompany)
      await page.keyboard.type(email!)

      await frameContent?.waitForTimeout(2000)

      await frameContent?.waitForSelector(numberAddressSelector)
      await frameContent?.focus(numberAddressSelector)
      // await frameContent?.$eval(numberAddressSelector, async (el: HTMLInputElement) => el.value = numberAddress === undefined ? "999" : numberAddress);
      await page.keyboard.type(numberAddress!)

      await frameContent?.waitForTimeout(2000)

      await frameContent?.waitForSelector(complementAddress)
      await frameContent?.focus(complementAddress)
      await page.keyboard.type(complement === undefined ? '' : complement)

      await frameContent?.waitForTimeout(2000)

      await frameContent?.waitForSelector(numberPhone)
      await frameContent?.focus(numberPhone)
      await page.keyboard.type(number)

      await frameContent?.waitForTimeout(2000)

      await frameContent?.waitForSelector(dddPhone)
      await frameContent?.focus(dddPhone)
      await page.keyboard.type(ddd)

      await frameContent?.waitForTimeout(4000)

      const done = await frameContent?.$eval('#btnGravar', (el: any) =>
        el.click(),
      )
    }
    resolve('ok')
  })
}
