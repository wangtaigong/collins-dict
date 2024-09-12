import { is } from '@electron-toolkit/utils'
import { nativeImage } from 'electron'
import path from 'path'

export function getAppIcon() {
  const filePath = is.dev
    ? path.join(__dirname, '../../resources/icon.png')
    : path.join(__dirname, '../../resources/icon.png')
  return nativeImage.createFromPath(filePath)
}
