import { Request, Response } from "express";
import { EmissionUseCaseBot } from "./emissionUseCase";

class EmissionControllerBot {
  constructor(private emissaoUseCaseBot: EmissionUseCaseBot) {}

  handle(req: Request, res: Response): Response {
    const allPedidos = this.emissaoUseCaseBot.execute();

    return res.status(200).end();
  }
}

export { EmissionControllerBot };
