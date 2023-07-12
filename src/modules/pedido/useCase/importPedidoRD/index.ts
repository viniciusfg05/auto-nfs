import { PedidoRepository } from '../../repositories/pedidoRepositories'
import { ImportPedidoUseCase } from './importPedidoUseCase'
import { ImportPedidoController } from './importPedidoController'

const pedidoRepositories = PedidoRepository.getInstance()
const importPedidoUseCase = new ImportPedidoUseCase(pedidoRepositories)
const importPedidoController = new ImportPedidoController(importPedidoUseCase)

export { importPedidoController }
