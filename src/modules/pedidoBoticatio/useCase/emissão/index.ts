import { PedidoRepository } from "../../repositoriesBot/pedidoRepositories";
import { EmissionControllerBot } from "./emissionController";
import { EmissionUseCaseBot } from "./emissionUseCase";

const pedidosRepository = PedidoRepository.getInstance();
const emissionUseCaseBot = new EmissionUseCaseBot(pedidosRepository);
const emissionControllerBot = new EmissionControllerBot(emissionUseCaseBot);

export { emissionControllerBot };
