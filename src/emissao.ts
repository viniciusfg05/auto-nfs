import { useStatusOfServiceProvided } from './controller/useEstadoPrestacao'
import { DestinyCNPJ } from './modules/use-cases/destiny'
import { createCnpj } from './modules/use-cases/createCNPJ'
import { fillDescription } from './modules/use-cases/createDescription'
import { cnpjExists } from './modules/use-cases/cnpj-existis'
import { findStateAndCity } from './modules/use-cases/find-state-and-city'
import { fillValueNote } from './modules/use-cases/fill-value-note'
import { fillIssAliquata } from './modules/use-cases/fill-iss-aliquata'
import { recordNote } from './modules/use-cases/record-note'
import { nextNote } from './controller/use-next-note'
import { fillCnaeAndNbs } from './modules/use-cases/fill-cnae-nbs'
import { useServiceIncidence } from './controller/useServiceIncidence'
import { CheckTaxIss } from './modules/use-cases/check-tax-iss'
import { confirmRecording } from './modules/use-cases/confirm-note'
import { useSaveInvoicePdf } from './controller/use-save-invoice-pdf'
import { Page } from 'puppeteer'

interface EmissionProps {
  browser: any
  frame: any
  pageRes: Page
  cnpj?: string
  value?: string
  description?: string
  cnae?: string
  nbs?: string
  iss?: string
  centro: string
  idFilial: string
  pedido: string
  projeto?: string
  requisicao?: string
}

export async function Emission({
  browser,
  pageRes,
  frame,
  cnpj,
  description,
  value,
  cnae,
  nbs,
  iss,
  centro,
  idFilial,
  pedido,
  projeto,
  requisicao,
}: EmissionProps) {
  // cnpj = '61.585.865/1555-11'

  await DestinyCNPJ({ cnpj: cnpj!, frame, page: pageRes }).then(async () => {
    await cnpjExists(cnpj, frame!)
      .then(async () => {
        await findStateAndCity(frame).then(async (stateProvider: any) => {
          await useStatusOfServiceProvided({
            frame,
            desiredCity: stateProvider.city,
            desiredState: stateProvider.uf,
          })

          await pageRes.waitForTimeout(5000)

          await useServiceIncidence({
            frame,
            desiredCity: stateProvider.city,
            desiredState: stateProvider.uf,
          })


        })
      })
      .catch(async () => {
        await createCnpj({ cnpj: cnpj!, frame, page: pageRes! }).then(
          async () => {
            await DestinyCNPJ({ cnpj: cnpj!, frame, page: pageRes }).then(
              async () => {
                await findStateAndCity(frame).then(
                  async (stateProvider: any) => {
                    await useStatusOfServiceProvided({
                      frame,
                      desiredCity: stateProvider.city,
                      desiredState: stateProvider.uf,
                    })

                    await pageRes.waitForTimeout(5000)

                    await useServiceIncidence({
                      frame,
                      desiredCity: stateProvider.city,
                      desiredState: stateProvider.uf,
                    })
                  },
                )
              },
            )
          },
        )
      })
  })


  await fillDescription({
    frame,
    page: pageRes,
    data: { centro, description, idFilial, pedido, projeto, requisicao },
  })

  const { NBS } = await fillCnaeAndNbs({ frame, nbs: nbs!, pageRes })

  const VALUE = await fillValueNote({ valueNote: value!, frame, pageRes })

  await fillIssAliquata({ iss: iss!, frame, pageRes })

  await CheckTaxIss({ frame, pageRes, isTax: true })

  await recordNote({ frame, isRecording: true })

  await confirmRecording(frame);

  await nextNote(pageRes)

  return `Nota emitida com CNPJ: ${cnpj} NBS: ${NBS}, descrição: ${description}, value: ${value}`
}
