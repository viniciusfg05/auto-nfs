import { PedidoRepository } from "../../repositoriesBot/pedidoRepositories";
import { ListImportControllerBot } from "./listPedidoController";
import { ListImportUseCaseBot } from "./listPedidoUseCase";

const pedidosRepository = PedidoRepository.getInstance();
const listImportUseCaseBot = new ListImportUseCaseBot(pedidosRepository);
const listImportControllerBot = new ListImportControllerBot(
  listImportUseCaseBot
);

export { listImportControllerBot };
