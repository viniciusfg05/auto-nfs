import fs from "fs";
import { parse } from "csv-parse";
import { PedidoRepository } from "../../repositoriesBot/pedidoRepositories";

interface IImportPedidoEnvolve {
  cnpj: string;
  description: string;
  pedido: string;
  ncm: string;
  value: string;
  responsible: string;
  item: string;
  nbs: string;
}

class ImportPedidoUseCaseBot {
  constructor(private pedidosRepository: PedidoRepository) {}

  async loadPdidosEnvolve(
    file: Express.Multer.File
  ): Promise<IImportPedidoEnvolve[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const parseFile = parse();
      stream.pipe(parseFile);

      const pedidos: IImportPedidoEnvolve[] = [];

      parseFile
        .on("data", async (line) => {
          const [
            cnpj,
            ie,
            ,
            item,
            ncm,
            description,
            responsible,
            pedido,
            nbs,
            value,
            dateEmission,
          ] = line;

          pedidos.push({
            cnpj,
            description,
            ncm,
            item,
            responsible,
            pedido,
            nbs,
            value,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          console.log("Total de pedidos", pedidos.length);

          resolve(pedidos);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const pedidosEnvolve = await this.loadPdidosEnvolve(file);

    pedidosEnvolve.map(async (pedidos: IImportPedidoEnvolve) => {
      const { cnpj, description, ncm, pedido, responsible, value, item, nbs } =
        pedidos;

      this.pedidosRepository.create({
        cnpj,
        description,
        ncm,
        item,
        responsible,
        pedido,
        nbs,
        value,
      });
    });
  }
}

export { ImportPedidoUseCaseBot };
