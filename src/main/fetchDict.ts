import { ipcHelper } from '@electron-toolkit/utils'
import axios from 'axios'
import * as cheerio from 'cheerio'

async function fetchDict(word: string) {
  const ret = await axios.get(`https://dict.youdao.com/w/${word}`)
  return renderColinsBlock(ret.data)
}

async function renderColinsBlock(html: string) {
  const $ = cheerio.load(html)
  return $('#collinsResult').prop('outerHTML')
}

ipcHelper.handle('fetchDict', async (_event, word: string) => {
  return await fetchDict(word)
})
