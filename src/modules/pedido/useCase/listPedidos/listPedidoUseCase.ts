import { Pedidos } from '../../model/Pedidos'
import { ICategoryRepository } from '../../repositories/ICreatePedidos'

class ListImportUseCase {
  constructor(private pedidosRepository: ICategoryRepository) {}

  execute(): Pedidos[] {
    const categoriesList = this.pedidosRepository.list()

    return categoriesList
  }
}

export { ListImportUseCase }
