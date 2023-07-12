import { Frame } from 'puppeteer'

interface RecordNoteProps {
  frame: Frame
  isRecording: boolean
}

export async function recordNote({ frame, isRecording }: RecordNoteProps) {
  if (isRecording === true) {
    const gravar = '#btnAssinar'

    await frame.waitForTimeout(5000)
    await frame.$eval(gravar, (el: any) => el.click())
    await frame.waitForTimeout(5000)
    console.log("gravado")
    return
  }

  if (isRecording === false) {
    const visualizar = '#btnVisualizar'

    await frame.waitForTimeout(5000)
    await frame.$eval(visualizar, (el: any) => el.click())
    await frame.waitForTimeout(5000)

    
  }
}
