import { app, BrowserWindow, Menu, Tray } from 'electron'
import { getAppIcon } from './util'

export class AppTray {
  mainWin: BrowserWindow
  tip = '科林斯词典'
  icon = getAppIcon()
  tray
  constructor(win: BrowserWindow) {
    this.mainWin = win
    this.tray = new Tray(this.icon)
    this.createMenu()
  }

  createMenu() {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: '打开',
        // icon: path.join(__static, './favicon.ico'),
        click: () => {
          this.showMainWin()
        }
      },
      {
        label: '退出',
        click: () => {
          app.exit(0)
        }
      }
    ])
    this.tray.setToolTip(this.tip)
    this.tray.setContextMenu(contextMenu)
    this.tray.on('click', () => {
      this.showMainWin()
    })
  }

  showMainWin() {
    if (this.mainWin.isMinimized()) {
      this.mainWin.restore()
    }
    if (!this.mainWin.isFocused()) {
      this.mainWin.focus()
    }
    if (!this.mainWin.isVisible()) {
      this.mainWin.show()
    }
  }
}
