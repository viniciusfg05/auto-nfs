import { Frame, Page } from 'puppeteer'
import { fillCNAE } from './fill-cnae'
import { fillNBS } from './fill-nbs'

interface FillCnaeAndNbsProps {
  nbs: string
  frame: Frame
  pageRes: Page
}

export async function fillCnaeAndNbs({
  frame,
  pageRes,
  nbs,
}: FillCnaeAndNbsProps) {
  let cnae: string = ''

  if (nbs === '1406') {
    cnae = '4322302'
  }

  if (nbs === '710') {
    cnae = '4322302'
  }

  if (nbs === '1401') {
    cnae = '4322302'
  }

  if (nbs === '705') {
    cnae = '4322302'
  }

  await fillCNAE({ frame, pageRes, cnae })

  const NBS = await fillNBS({ frame, nbs: nbs! })

  return { NBS }
}
