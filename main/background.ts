import { app, Menu } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import * as remote from '@electron/remote';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();
  await installExtension(REACT_DEVELOPER_TOOLS);
  const dockMenu = Menu.buildFromTemplate([
    {
      label: 'New Window',
      click() {
        console.log('New Window');
      },
    },
    {
      label: 'New Window with Settings',
      submenu: [{ label: 'Basic' }, { label: 'Pro' }],
    },
    { label: 'New Command...' },
  ]);
  if (process.platform === 'darwin') {
    app.dock.setMenu(dockMenu);
    const nativeImage = require('electron').nativeImage;
    const image = nativeImage.createFromPath(
      '../renderer/public/images/logo.png',
    );
    app.dock.setIcon(image);
  }

  const mainWindow = createWindow('main', {
    fullscreen: true,
    title: 'Humbly',
    icon: '../renderer/public/images/logo.png',
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});
