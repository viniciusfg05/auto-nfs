import { Frame, Page } from 'puppeteer'

interface DestinyProp {
  cnpj: string
  page: Page
  frame: Frame
}

export function DestinyCNPJ({ cnpj, ...props }: DestinyProp) {
  return new Promise(async (resolve, reject) => {
    try {
      const inputCNPJ = '#txtCpfCnpj'
      await props.frame.waitForSelector(inputCNPJ)

      await props.frame.waitForTimeout(5000)

      await props.frame.focus(inputCNPJ)
      await props.page.keyboard.type(cnpj)
      await props.page.keyboard.press('Tab')

      await props.frame.waitForTimeout(5000)

      const checkingFillingCNPJ = await CheckingFillingCNPJ()

      async function CheckingFillingCNPJ() {
        const inputCNPJ = '#txtCpfCnpj'

        await props.frame.waitForSelector(inputCNPJ)
        const checkingFillingCNPJ = await props.frame.$eval(
          inputCNPJ,
          (el: any) => el.textContent == cnpj,
        )

        return checkingFillingCNPJ
      }

      checkingFillingCNPJ === true
        ? resolve('OK')
        : reject({ message: 'CNPJ não foi preenchido' })
    } catch (err) {
      reject(err)
    }
  })
}
