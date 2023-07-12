import { PedidoRepository } from '../../repositories/pedidoRepositories'
import { EmissionController } from './emissionController'
import { EmissionUseCase } from './emissionUseCase'

const pedidosRepository = PedidoRepository.getInstance()
const emissionUseCase = new EmissionUseCase(pedidosRepository)
const emissionController = new EmissionController(emissionUseCase)

export { emissionController }
