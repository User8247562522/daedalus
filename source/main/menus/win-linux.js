import { compact } from 'lodash';
import environment from '../../common/environment';

export const winLinuxMenu = (app, window, {
  openAbout, goToAdaRedemption, goToNetworkStatus, restartInSafeMode, restartWithoutSafeMode
}, isInSafeMode) => (
  [{
    label: 'Daedalus',
    submenu: compact([{
      label: 'About',
      click() {
        openAbout();
      }
    }, {
      label: 'Ada redemption',
      click() {
        goToAdaRedemption();
      }
    }, {
      label: 'GPU safe mode',
      type: 'checkbox',
      checked: isInSafeMode,
      click() {
        isInSafeMode ?
          restartWithoutSafeMode() :
          restartInSafeMode();
      },
    }, {
      label: 'Network status',
      accelerator: 'Ctrl+S',
      click() {
        goToNetworkStatus();
      },
    }, {
      label: 'Close',
      accelerator: 'Ctrl+W',
      click() {
        app.quit();
      }
    }])
  }, {
    label: 'Edit',
    submenu: [{
      label: 'Undo',
      accelerator: 'Ctrl+Z',
      role: 'undo'
    }, {
      label: 'Redo',
      accelerator: 'Shift+Ctrl+Z',
      role: 'redo'
    }, {
      type: 'separator'
    }, {
      label: 'Cut',
      accelerator: 'Ctrl+X',
      role: 'cut'
    }, {
      label: 'Copy',
      accelerator: 'Ctrl+C',
      role: 'copy'
    }, {
      label: 'Paste',
      accelerator: 'Ctrl+V',
      role: 'paste'
    }, {
      label: 'Select All',
      accelerator: 'Ctrl+A',
      role: 'selectall'
    }]
  }, {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'Ctrl+R',
        click() { window.webContents.reload(); }
      },
      environment.isWindows() ? {
        label: 'Toggle Full Screen',
        accelerator: 'F11',
        click() { window.setFullScreen(!window.isFullScreen()); }
      } : {
        label: 'Toggle Maximum Window Size',
        accelerator: 'F11',
        click() {
          if (window.isMaximized()) {
            window.unmaximize();
          } else {
            window.maximize();
          }
        }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Ctrl+I',
        click() { window.toggleDevTools(); }
      }
    ]
  }]
);
