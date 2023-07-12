import { Request, Response } from 'express'
import { ImportPedidoUseCase } from './importPedidoUseCase'

class ImportPedidoController {
  constructor(private importPedidoUseCase: ImportPedidoUseCase) {}

  handle(req: Request, res: Response): Response {
    const { file } = req

    const note = this.importPedidoUseCase.execute(file!)

    return res.json({ note })
  }
}

export { ImportPedidoController }
