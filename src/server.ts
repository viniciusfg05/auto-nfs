import express from 'express'
import { Emission } from './emissao'
import multer from 'multer'
import { ListImportController } from './modules/pedido/useCase/listPedidos/listPedidoController'
import { listImportController } from './modules/pedido/useCase/listPedidos'
import { ListImportUseCase } from './modules/pedido/useCase/listPedidos/listPedidoUseCase'

import dataEmission from '../data.json'
import { importPedidoController } from './modules/pedido/useCase/importPedidoRD'
import { emissionController } from './modules/pedido/useCase/emissão'
import { importPedidoControllerBot } from './modules/pedidoBoticatio/useCase/importPedidoBot'
import { listImportControllerBot } from './modules/pedidoBoticatio/useCase/listPedidos'
import { emissionControllerBot } from './modules/pedidoBoticatio/useCase/emissão'

const app = express()

const upload = multer({
  dest: './tmp',
})

app.use(express.json())

interface dataNoteProps {
  cnpjFilial: string
  nbs: string
  description: string
  idFilial: string
  centro: string
  pedido: string
  value: string
  projeto?: string
  requisicao?: string
}

app.post("/import", upload.single("file"), (req, res) => {
  return importPedidoController.handle(req, res);
});

app.post("/import/bot", upload.single("file"), (req, res) => {
  return importPedidoControllerBot.handle(req, res);
});

app.get("/", upload.single("file"), (req, res) => {
  return listImportController.handle(req, res);
});

app.get("/bot", upload.single("file"), (req, res) => {
  return listImportControllerBot.handle(req, res);
});

app.post("/emission", (req, res) => {
  return emissionController.handle(req, res);
});

app.post("/emission/bot", (req, res) => {
  return emissionControllerBot.handle(req, res);
});

app.listen(3339, () => console.log('Server is running'))
