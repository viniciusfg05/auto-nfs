import { Browser, Page } from 'puppeteer'
import { Emission } from '../../../../emissao'
import { Pedidos } from '../../model/Pedidos'
import { ICategoryRepository } from '../../repositories/ICreatePedidos'
import fs from 'fs'
import { GetIframePage, login } from '../../../../controller/useLogin'
import { useSaveInvoicePdf } from '../../../../controller/use-save-invoice-pdf'

interface dataNoteProps {
  cnpjFilial: string
  nbs: string
  description: string
  idFilial: string
  centro: string
  pedido: string
  value: string
  projeto?: string
  requisicao?: string
}

const dataNoteEmission: string[] = []

class EmissionUseCase {
  constructor(private pedidosRepository: ICategoryRepository) {}

  async emissionNotes(pedidos: Pedidos[]) {
    const { browser, page } = await login()

    const frame = await GetIframePage(page)

    for await (const dataNote of pedidos) {

      const emission = await Emission({
        browser,
        pageRes: page,
        frame,
        description: dataNote.description,
        cnpj: dataNote.cnpjFilial.trim(),
        nbs: dataNote.nbs,
        value: dataNote.value,
        iss: '2',
        centro: dataNote.centro,
        idFilial: dataNote.idFilial,
        pedido: dataNote.pedido,
        projeto: dataNote.projeto,
        requisicao: dataNote.requisicao,
      })

      // dataNoteEmission.push(emission)
      console.log(emission)

      fs.writeFile(
        'data.json',
        JSON.stringify(dataNoteEmission, null, 2),
        (err) => {
          if (err) throw new Error('Something went error')
          return dataNoteEmission
        },
      )

    }
  }

  async execute(): Promise<Pedidos[]> {
    // console.log(categoriesList);
    const pedidos = this.pedidosRepository.emission()
    await this.emissionNotes(await pedidos)

    return pedidos
  }
}

export { EmissionUseCase }
