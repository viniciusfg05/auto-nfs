import { Frame, Page } from 'puppeteer'

interface DescriptionProps {
  data: {
    description?: string
    idFilial: string
    pedido: string
    centro: string
    requisicao?: string
    projeto?: string
  }
  frame: Frame
  page: Page
}

export async function fillDescription({
  frame,
  page,
  data: { description, idFilial, pedido, centro, requisicao, projeto },
}: DescriptionProps) {
  return new Promise(async (resolve, reject) => {
    const descriptionSeletor = '#txtDescServicos'

    await frame.waitForSelector(descriptionSeletor)
    await frame.click(descriptionSeletor)

    await page.waitForTimeout(1000)

    if (requisicao && projeto !== undefined) {
      const descriptionFilling = `${description}, ID FILIAL: ${idFilial.trim()}, Centro: ${centro}, 
      requisição: ${requisicao}, projeto: ${projeto}, Pedido: ${pedido}`

      await frame.type(descriptionSeletor, descriptionFilling)

      await page.keyboard.press('Tab')

      await CheckingFillingDescription({ descriptionFilling, page, frame })

      await page.keyboard.press('Tab')

      resolve(descriptionFilling)
    } else {
      const descriptionFilling = `${description}, ID FILIAL: ${idFilial.trim()}, Centro: ${centro}, Pedido: ${pedido}`

      await frame.type(descriptionSeletor, descriptionFilling)

      await CheckingFillingDescription({ descriptionFilling, page, frame })

      await page.keyboard.press('Tab')

      resolve(descriptionFilling)
    }
  })
}

interface FillingDescriptionProp {
  descriptionFilling: string
  page: Page
  frame: Frame
}

export async function CheckingFillingDescription({
  descriptionFilling,
  page,
  frame,
}: FillingDescriptionProp) {
  const descriptionSeletor = '#txtDescServicos'
  await frame.waitForSelector(descriptionSeletor)

  const checkingFillingCNPJ = await frame.$eval(
    descriptionSeletor,
    (el: any) => el.textContent !== undefined,
  )
  await frame.$eval(descriptionSeletor, (el: any) => el.textContent)

  return checkingFillingCNPJ
}
