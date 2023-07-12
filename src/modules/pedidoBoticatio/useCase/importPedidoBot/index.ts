import { PedidoRepository } from "../../repositoriesBot/pedidoRepositories";
import { ImportPedidoControllerBot } from "./importPedidoController";
import { ImportPedidoUseCaseBot } from "./importPedidoUseCase";

const pedidoRepositories = PedidoRepository.getInstance();
const importPedidoUseCaseBot = new ImportPedidoUseCaseBot(pedidoRepositories);
const importPedidoControllerBot = new ImportPedidoControllerBot(
  importPedidoUseCaseBot
);

export { importPedidoControllerBot };
