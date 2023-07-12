import { Pedidos } from "../../model/Pedidos";
import { ICategoryRepository } from "../../repositoriesBot/ICreatePedidos";

class ListImportUseCaseBot {
  constructor(private pedidosRepository: ICategoryRepository) {}

  execute(): Pedidos[] {
    const categoriesList = this.pedidosRepository.list();

    return categoriesList;
  }
}

export { ListImportUseCaseBot };
