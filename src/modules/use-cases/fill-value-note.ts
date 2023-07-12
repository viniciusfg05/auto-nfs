import puppeteer, { Frame, Page } from 'puppeteer'

interface FillValueNoteProps {
  valueNote: string
  frame: Frame
  pageRes: Page
}

export async function fillValueNote({
  frame,
  pageRes,
  valueNote,
}: FillValueNoteProps) {
  const valor = '#txtTotal'

  await frame.waitForSelector(valor)
  await frame.click(valor)
  await pageRes.waitForTimeout(1000)
  await frame.type(valor, valueNote)
  await pageRes.keyboard.press('Tab')

  return valueNote
}
