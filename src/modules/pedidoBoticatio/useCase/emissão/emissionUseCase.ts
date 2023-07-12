import { Browser, Page } from "puppeteer";
import { Pedidos } from "../../model/Pedidos";
import { ICategoryRepository } from "../../repositoriesBot/ICreatePedidos";
import { GetIframePage, login } from "../../../../controller/useLogin";
import { Emission } from "../../../../emissao-boticario";

interface dataNoteProps {
  cnpj: string;
  description: string;
  pedido: string;
  ncm: string;
  value: string;
  responsible: string;
  item: string;
  nbs: string;
}

class EmissionUseCaseBot {
  constructor(private pedidosRepository: ICategoryRepository) {}

  async emissionNotes(pedidos: Pedidos[]) {
    const { page } = await login();

    const frame = await GetIframePage(page);

    const dataNotes: dataNoteProps[] = pedidos.map((pedido) => {
      return {
        cnpj: pedido.cnpj,
        description: pedido.description,
        item: pedido.item,
        nbs: pedido.nbs,
        pedido: pedido.pedido,
        ncm: pedido.ncm,
        responsible: pedido.responsible,
        value: pedido.value,
      };
    });

    for (let dataNote of dataNotes) {
      let cnae: string = "";

      if (dataNote.nbs === "710") {
        cnae = "4322302";
      }

      if (dataNote.nbs === "1401") {
        cnae = "4322302";
      }

      if (dataNote.nbs === "1703") {
        cnae = "8219999";
      }

      const emission = await Emission({
        pageRes: page,
        frame,
        cnpj: dataNote.cnpj,
        description: dataNote.description,
        item: dataNote.item,
        nbs: dataNote.nbs,
        cnae: cnae,
        pedido: dataNote.pedido,
        ncm: dataNote.ncm,
        responsible: dataNote.responsible,
        value: dataNote.value,
        iss: "2",
      });

      console.log(emission);
      // return dataNotes;
    }
  }

  async execute(): Promise<Pedidos[]> {
    const pedidos = this.pedidosRepository.emission();
    await this.emissionNotes(await pedidos);

    return pedidos;
  }
}

export { EmissionUseCaseBot };
