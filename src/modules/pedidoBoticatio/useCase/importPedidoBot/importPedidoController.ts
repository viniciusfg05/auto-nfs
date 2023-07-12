import { Request, Response } from "express";
import { ImportPedidoUseCaseBot } from "./importPedidoUseCase";

class ImportPedidoControllerBot {
  constructor(private importPedidoUseCase: ImportPedidoUseCaseBot) {}

  handle(req: Request, res: Response): Response {
    const { file } = req;

    this.importPedidoUseCase.execute(file!);

    return res.send();
  }
}

export { ImportPedidoControllerBot };
