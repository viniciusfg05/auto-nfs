import puppeteer from 'puppeteer'

interface useStatusOfServiceProvidedProps {
  frame: puppeteer.Frame
  desiredState: string
  desiredCity: string
}

export async function useStatusOfServiceProvided({
  frame,
  desiredState,
  desiredCity,
}: useStatusOfServiceProvidedProps) {
  async function estadoPrestacao() {
    const seletor = '#ddlUFEmissao'
    await frame.waitForSelector(seletor)

    await frame.select(seletor, desiredState)

    await frame.waitForTimeout(2000)
  }

  async function cidadePrestacao() {
    await frame.waitForTimeout(2000)

    const options = await frame.$$('#ddlCidadeEmissao > option')

    await Promise.all(
      options.map(async (option, i) => {
        const optionValue = await option.getProperty('textContent')

        const optionText = await optionValue.jsonValue()

        if (optionText === desiredCity) {
          const index = i + 1

          const optionSelect = await frame.$(
            `#ddlCidadeEmissao > option:nth-child(${index})`,
          )

          const optionSelectValue = await optionSelect?.getProperty('value')
          const optionSelectValueNumber: string | undefined =
            await optionSelectValue?.jsonValue()

          async function cidadePrestacao(value: string) {
            const seletor = '#ddlCidadeEmissao'
            await frame.waitForSelector(seletor)

            await frame.select(seletor, value)

            await frame.waitForTimeout(2000)
          }

          await cidadePrestacao(optionSelectValueNumber!)
        }
      }),
    )
  }

  await estadoPrestacao()
  await cidadePrestacao()
}
