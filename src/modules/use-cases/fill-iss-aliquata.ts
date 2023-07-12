import { Frame, Page } from 'puppeteer'

interface FillIssAliquataProps {
  iss: string
  pageRes: Page
  frame: Frame
}

export async function fillIssAliquata({
  iss,
  frame,
  pageRes,
}: FillIssAliquataProps) {
  const aliquataSeletor = '#txtAliq'

  await frame.waitForSelector(aliquataSeletor)

  await frame.click(aliquataSeletor)

  await pageRes.waitForTimeout(1000)

  await frame.type(aliquataSeletor, iss)

  await pageRes.keyboard.press('Tab')

  return iss
}
