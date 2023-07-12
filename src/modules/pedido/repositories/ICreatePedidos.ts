import { Pedidos } from '../model/Pedidos'

interface ICreatePedidoDTO {
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

interface ICategoryRepository {
  list(): Pedidos[]

  emission(): Promise<Pedidos[]>

  create({
    cnpjFilial,
    nbs,
    description,
    idFilial,
    centro,
    pedido,
    value,
    projeto,
    requisicao,
  }: ICreatePedidoDTO): void
}

export { ICategoryRepository, ICreatePedidoDTO }
