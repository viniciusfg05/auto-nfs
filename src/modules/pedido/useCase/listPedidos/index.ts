import { PedidoRepository } from '../../repositories/pedidoRepositories'
import { ListImportUseCase } from './listPedidoUseCase'
import { ListImportController } from './listPedidoController'

const pedidosRepository = PedidoRepository.getInstance()
const listImportUseCase = new ListImportUseCase(pedidosRepository)
const listImportController = new ListImportController(listImportUseCase)

export { listImportController }
