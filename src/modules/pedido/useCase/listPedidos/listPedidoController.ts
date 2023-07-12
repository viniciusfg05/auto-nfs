import { Request, Response } from 'express'
import { ListImportUseCase } from './listPedidoUseCase'

class ListImportController {
  constructor(private listImportUseCase: ListImportUseCase) {}

  handle(req: Request, res: Response): Response {
    const all = this.listImportUseCase.execute()

    return res.json(all)
  }
}

export { ListImportController }
