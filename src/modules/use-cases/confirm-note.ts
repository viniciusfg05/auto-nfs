import { Frame } from 'puppeteer'

export async function confirmRecording(frame: Frame) {
  const confirmar = '#btnAssinaSenha'
  const input = "#txtSenhaAssinatura"
  const ok = "#btnOkAssinaSenha"

  await frame.waitForTimeout(5000)
  await frame.$eval(confirmar, (el: any) => el.click())
  console.log("confirm")

  await frame.waitForSelector(input, { visible: true, timeout: 120000 })


  await frame.type(input, '315545')

  console.log("senha")

  await frame.waitForTimeout(10000)

  await frame.$eval(ok, (el: any) => el.click())

  await frame.waitForTimeout(5000)

}
