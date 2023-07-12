import { Frame } from 'puppeteer'

interface FillNBSProps {
  nbs: string
  frame: Frame
}

export async function fillNBS({ frame, nbs }: FillNBSProps) {
  const nbsSelector = '#ddllistaitemservico'

  await frame.waitForSelector(nbsSelector)

  await frame.select(nbsSelector, nbs)

  return nbs
}
