import puppeteer from "puppeteer";

export const preparePageForTests = async (page: puppeteer.Page) => {
  const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" +
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36";
  await page.setUserAgent(userAgent);
};

interface usePuppetterProps {
  href?: string;
}

// const extensionPath = "C:\Users\vinic\AppData\Local\Google\Chrome\User Data\Default\Extensions"


export async function usePuppetter(href?: string) {
  const browser = await puppeteer.launch({
    // executablePath: "C:/Program Files/Google/Chrome/Application/chrome",
    headless: false,
    // userDataDir: "C:\Users\vinic\AppData\Local\Google\Chrome\User Data\Default",
    defaultViewport: null, // Desabilitar o viewport padrão para ter controle total sobre o tamanho da janela
    args: [
      '--start-maximized', // Iniciar o Chrome maximizado
      '--disable-infobars', // Desativar a barra de informações do Chrome
      '--disable-notifications', // Desativar as notificações do Chrome
      '--disable-popup-blocking', // Desabilitar o bloqueio de pop-ups
      '--ignore-certificate-errors', // Ignorar erros de certificado
      '--no-sandbox', // Executar o Chrome em um ambiente de sandbox desabilitado
      // `--disable-extensions-except=${extensionPath}`,
      // `--load-extension=${extensionPath}`,
    ],
  });
  const page = await browser.newPage();


  await preparePageForTests(page);
  await page.goto(String(href));
  return { page, browser };
}

// export async function usePuppetter(href: string) {
//   const browser = await puppeteer.launch({ headless: false })
//   const page = await browser.newPage()
//   await preparePageForTests(page)
//   await page.goto(href)

//   return page
// }
