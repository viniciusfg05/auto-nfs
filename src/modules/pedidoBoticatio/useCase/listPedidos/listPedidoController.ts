import { Request, Response } from "express";
import { ListImportUseCaseBot } from "./listPedidoUseCase";

class ListImportControllerBot {
  constructor(private listImportUseCase: ListImportUseCaseBot) {}

  handle(req: Request, res: Response): Response {
    const all = this.listImportUseCase.execute();

    return res.json(all);
  }
}

export { ListImportControllerBot };
