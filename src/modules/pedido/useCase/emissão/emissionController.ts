import { Request, Response } from 'express'
import { EmissionUseCase } from './emissionUseCase'

class EmissionController {
  constructor(private emissaoUseCase: EmissionUseCase) {}

  handle(req: Request, res: Response): Response {
    const allPedidos = this.emissaoUseCase.execute()
    return res.status(200).end()
  }
}

export { EmissionController }
