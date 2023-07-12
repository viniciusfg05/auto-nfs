import puppeteer, { Frame, Page } from 'puppeteer'

interface FillCNAEProps {
  cnae: string
  frame: Frame
  pageRes: Page
}

export async function fillCNAE({ frame, pageRes, cnae }: FillCNAEProps) {
  const cnaeSelector = '#ddlDescricaoCNAE'

  await frame.waitForSelector(cnaeSelector)

  await frame.select(cnaeSelector, cnae)

  await pageRes.waitForTimeout(2000)

  return cnae
}
