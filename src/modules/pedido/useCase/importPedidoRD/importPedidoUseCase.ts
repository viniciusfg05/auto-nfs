import fs from 'fs'
import { parse } from 'csv-parse'
import { PedidoRepository } from '../../repositories/pedidoRepositories'

interface IImportPedido {
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

interface IImportPedidoEnvolve {
  cnpjFilial: string
  description: string
  pedido: string
  ncm: string
  value: string
  responsible: string
}

class ImportPedidoUseCase {
  constructor(private pedidosRepository: PedidoRepository) {}

  // PEdidos de Preventiva
  loadPedidos(file: Express.Multer.File): Promise<IImportPedido[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)

      const parseFile = parse()

      const pedidos: IImportPedido[] = []

      stream.pipe(parseFile)

      parseFile
        .on('data', async (line) => {
          const [
            lote,
            nameFornecedor,
            cnpjFornecedor,
            description,
            nbs,
            material,
            value,
            idFilial,
            centro,
            cnpjFilial,
            projeto,
            requisicao,
            pedido,
            nf,
          ] = line

          pedidos.push({
            cnpjFilial,
            nbs,
            description,
            idFilial,
            centro,
            pedido,
            projeto,
            requisicao,
            value,
          })
        })
        .on('end', () => {
          fs.promises.unlink(file.path)
          resolve(pedidos)
        })
        .on('error', (err) => {
          reject(err)
        })
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const pedidos = await this.loadPedidos(file)

    console.log(pedidos.length, 'Notas a serem emitidas')

    pedidos.map(async (pedidos) => {
      const {
        description,
        centro,
        cnpjFilial,
        idFilial,
        nbs,
        value,
        pedido,
        projeto,
        requisicao,
      } = pedidos

      this.pedidosRepository.create({
        description,
        centro,
        cnpjFilial,
        idFilial,
        nbs,
        pedido,
        value,
        projeto,
        requisicao,
      })
    })
  }
}

export { ImportPedidoUseCase }
