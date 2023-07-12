import { Pedidos } from "../model/Pedidos";
import { ICategoryRepository, ICreatePedidoDTO } from "./ICreatePedidos";

class PedidoRepository implements ICategoryRepository {
  private pedidos: Pedidos[];

  private static INSTANCE = new PedidoRepository();

  private constructor() {
    this.pedidos = [];
  }

  public static getInstance(): PedidoRepository {
    if (!PedidoRepository.INSTANCE) {
      PedidoRepository.INSTANCE = new PedidoRepository();
    }

    return PedidoRepository.INSTANCE;
  }

  create({
    cnpj,
    description,
    item,
    ncm,
    pedido,
    responsible,
    value,
    nbs,
  }: ICreatePedidoDTO): void {
    const createPedidos = new Pedidos();

    Object.assign(createPedidos, {
      cnpj,
      description,
      item,
      ncm,
      pedido,
      responsible,
      value,
      nbs,
    });

    this.pedidos.push(createPedidos);
  }

  list(): Pedidos[] {
    return this.pedidos;
  }

  async emission(): Promise<Pedidos[]> {
    return this.pedidos;
  }
}
export { PedidoRepository };
