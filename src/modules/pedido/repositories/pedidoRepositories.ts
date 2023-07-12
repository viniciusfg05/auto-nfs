import { usePuppetter } from '../../../controller/usePuppetter'
import { Emission } from '../../../emissao'
import { GetIframePage, login } from '../../../login'
import { Pedidos } from '../model/Pedidos'
import { ICategoryRepository, ICreatePedidoDTO } from './ICreatePedidos'

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

class PedidoRepository implements ICategoryRepository {
  private pedidos: Pedidos[]

  private static INSTANCE = new PedidoRepository()

  private constructor() {
    this.pedidos = []
  }

  public static getInstance(): PedidoRepository {
    if (!PedidoRepository.INSTANCE) {
      PedidoRepository.INSTANCE = new PedidoRepository()
    }

    return PedidoRepository.INSTANCE
  }

  create({
    cnpjFilial,
    description,
    centro,
    idFilial,
    nbs,
    pedido,
    projeto,
    requisicao,
    value,
  }: ICreatePedidoDTO): void {
    const createPedidos = new Pedidos()

    Object.assign(createPedidos, {
      cnpjFilial,
      centro,
      idFilial,
      nbs,
      pedido,
      value,
      projeto,
      requisicao,
      description,
    })

    this.pedidos.push(createPedidos)
  }

  list(): Pedidos[] {
    return this.pedidos
  }

  async emission(): Promise<Pedidos[]> {
    return this.pedidos
  }
}
export { PedidoRepository }
