import { Frame, Page } from "puppeteer"
import { usePuppetter } from "./usePuppetter"

export async function useSaveInvoicePdf() {
  const { page} = await usePuppetter('https://df.issnetonline.com.br/online/NotaDigital/Nota_Digital_204.aspx?EF+4E+50+D1+44+B1+18+A8+DF+5C+59+97+6E+CD+6B+EA+1+E0+ED+8E+DA+C9+FC+57+10+E0+D6+16+DA+57+75+AE+F5+9C+39+AC+18+59+58+29+BF+EC+4+DE+AC+DE+FC+F9+20+C1+7A+3C+C6+16+EE+57+5C+8+D8+36+98+16+50+BB+B7+C2+3F+7E+F8+1B+BF+DB+12+E1+62+6E+D+2+9E+D3+15+BA+A0+AD+C4+DC+B+F9+14+78+53+B3+24+6E+5C+5+4D+CA+CE+F1+DC+4B+A0+A7+14+45+B9+DC+7F+19+4+F5+BA+FB+88+53+DA+25+B3+E4+20+EE+B0+4C+2C+50+B2+42+FB+26+6E+EA+28+A9+30+A0+4E+60+DE+82+CC+B3+AD+61+')

  const selectorFrameToLoadPdf = '#iframeModal'
  const selectorBottonPrint = "#btnImprimir"


  // await page.waitForTimeout(5000)

  // await page.waitForSelector(selectorBottonPrint)
 const res =  await page.$eval("#conteudo", (el: any) => el.outerHTML);



console.log(res)
}