import { nextNote } from "./controller/use-next-note";
import { useStatusOfServiceProvided } from "./controller/useEstadoPrestacao";
import { useServiceIncidence } from "./controller/useServiceIncidence";
import { CheckTaxIss } from "./modules/use-cases/check-tax-iss";
import { cnpjExists } from "./modules/use-cases/cnpj-existis";
import { confirmRecording } from "./modules/use-cases/confirm-note";
import { createCnpj } from "./modules/use-cases/createCNPJ";
import { DestinyCNPJ } from "./modules/use-cases/destiny";
import { fillCnaeAndNbs } from "./modules/use-cases/fill-cnae-nbs";
import { fillIssAliquata } from "./modules/use-cases/fill-iss-aliquata";
import { fillValueNote } from "./modules/use-cases/fill-value-note";
import { findStateAndCity } from "./modules/use-cases/find-state-and-city";
import { recordNote } from "./modules/use-cases/record-note";

interface EmissionProps {
  frame: any;
  pageRes: any;
  cnae?: string;
  iss?: string;

  cnpj: string;
  description: string;
  pedido: string;
  ncm: string;
  value: string;
  responsible: string;
  item: string;
  nbs: string;
}

export async function Emission({
  pageRes,
  frame,
  cnpj,
  description,
  value,
  responsible,
  cnae,
  nbs,
  iss,
  pedido,
  item,
  ncm,
}: EmissionProps) {
  
  await DestinyCNPJ({ cnpj: cnpj!, frame, page: pageRes }).then(async () => {
    await cnpjExists(cnpj, frame!)
      .then(async () => {
        await findStateAndCity(frame).then(async (stateProvider: any) => {
          await useStatusOfServiceProvided({
            frame,
            desiredCity: stateProvider.city,
            desiredState: stateProvider.uf,
          })

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


  async function fillDescription({
    description,
    pedido,
    item,
    ncm,
    responsible,
  }: any) {
    const descriptionSeletor = "#txtDescServicos";

    await frame.waitForSelector(descriptionSeletor);
    await frame.click(descriptionSeletor);

    await pageRes.waitForTimeout(1000);

    await frame.type(
      descriptionSeletor,
      `${item}, ${ncm}, ${description}, ${responsible}, pedido: ${pedido}`
    );

    await pageRes.keyboard.press("Tab");

    return;
  }

  const FillDescription = await fillDescription({
    description,
    pedido,
    item,
    ncm,
    responsible,
  })

  const { NBS } = await fillCnaeAndNbs({ frame, nbs: nbs!, pageRes })

  const VALUE = await fillValueNote({ valueNote: value!, frame, pageRes })

  await fillIssAliquata({ iss: iss!, frame, pageRes })

  await CheckTaxIss({ frame, pageRes, isTax: true })

  await recordNote({ frame, isRecording: false })

  await confirmRecording(frame);

  await nextNote(pageRes)

  return `Nota emitida com CNPJ: ${cnpj} NBS: ${NBS}, descrição: ${FillDescription}, value: ${VALUE}`
}
