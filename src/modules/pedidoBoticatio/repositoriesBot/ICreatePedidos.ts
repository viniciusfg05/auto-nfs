import { Pedidos } from "../model/Pedidos";

interface ICreatePedidoDTO {
  cnpj: string;
  description: string;
  pedido: string;
  ncm: string;
  value: string;
  responsible: string;
  item: string;
  nbs: string;
}

interface ICategoryRepository {
  list(): Pedidos[];

  emission(): Promise<Pedidos[]>;

  create({
    cnpj,
    description,
    item,
    ncm,
    pedido,
    responsible,
    value,
    nbs,
  }: ICreatePedidoDTO): void;
}

export { ICategoryRepository, ICreatePedidoDTO };
