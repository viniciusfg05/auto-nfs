import puppeteer from 'puppeteer'

export function cnpjExists(cnpj?: string, frame: puppeteer.Frame) {
  return new Promise(async (resolve, reject) => {
    try {
      const inputCNPJ = '#txtCpfCnpj'

      const cnpjExists = await frame.$eval(
        inputCNPJ,
        (el: any) => el.value == cnpj,
      )

      if (cnpjExists) {
        throw new Error('CNPJ does not exist')
      }

      resolve('ok')
    } catch (err) {
      reject(err)
    }
  })
}
