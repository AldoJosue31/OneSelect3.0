const { app, BrowserWindow, ipcMain, Menu } = require("electron")
const url = require('url')
const path = require("path")
require('./server.js')



app.disableHardwareAcceleration();

  
let mainWindow;
let win;
let Orden;


let menuAplicacionPlantilla = [
    {
        label: 'Info',
        submenu: [
            {
                label: 'Acerca de',
                accelerator: process.platform == 'darwin' ? 'Comand+J' : 'Ctrl+J',
                click: () => {
                  mainWindow.webContents.openDevTools()
                }
            }
        ]
    },
    {
        label: 'Show/Hide Dev Tools',
        accelerator: process.platform == 'darwin' ? 'Comand+D' : 'Ctrl+D',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        label: 'Main',
        accelerator: process.platform == 'darwin' ? 'Comand+R' : 'Ctrl+R',
        click: () => {
          mainWindow.reload();
        }
      },
      { 
        label: "Refresh Page", 
        accelerator: process.platform == 'darwin' ? 'Comand+D' : 'Ctrl+N',
        click() {
          
        } 
      },
    
      {
        label: 'Registros',
        accelerator: process.platform == 'darwin' ? 'Comand+L ' : 'Ctrl+L',
        click: () => {
          mainWindow.loadFile("registros.html");
        }
      }
];

  
// Function to create independent window or main window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 650,
    minWidth: 825,
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
        titleBarOverlay: {
            color: '#2f3241',
            symbolColor: '#74b1be'
        },
    // Make sure to add webPreferences with
    // nodeIntegration and contextIsolation
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      slashes: true,
    },
    show: false,
  });

  mainWindow.setIcon(path.join(__dirname, 'assets/Logo_OneSelect_Claro.png'));
  
  // Main window loads index.html file
  mainWindow.loadURL('http://localhost:3000')

  let menu = Menu.buildFromTemplate(menuAplicacionPlantilla);
  mainWindow.setMenu(menu);
  mainWindow.on('close', function() { 
    app.quit();
  });

  
  // To maximize the window
  mainWindow.maximize();
  mainWindow.show();
}


function createChild() {
  win = new BrowserWindow({
    width: 1000,
    height: 1000,
    minHeight: 650,
    minWidth: 825,
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
        titleBarOverlay: {
            color: '#2f3241',
            symbolColor: '#74b1be'
        },
    // Make sure to add webPreferences with
    // nodeIntegration and contextIsolation
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    show: false,
  });

  win.on('show', function() { 
    mainWindow.loadURL('http://localhost:3000')
  });
  win.on('show', function() { 
    ipcMain.on("RecargarRegistros", (event, arg) => {
      win.reload();
    });
  });

  win.setIcon(path.join(__dirname, 'assets/Logo_OneSelect_Claro.png'));
  
  // Main window loads index.html file
  win.loadURL('http://localhost:3000/registros')
  // To maximize the window

  win.show();
}

ipcMain.on("dividirRegistros", (event, arg) => {
  createChild();
});

function nuevaVentanaOrden() {
  Orden = new BrowserWindow({
    width: 1000,
    height: 1000,
    minHeight: 650,
    minWidth: 825,
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
        titleBarOverlay: {
            color: '#2f3241',
            symbolColor: '#74b1be'
        },
    // Make sure to add webPreferences with
    // nodeIntegration and contextIsolation
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    show: false,
  });

  Orden.on('show', function() { 
    mainWindow.loadURL('http://localhost:3000')
  });

  Orden.on('show', function() { 
    ipcMain.on("RecargarRegistros", (event, arg) => {
      mainWindow.reload();
    });
  });

  Orden.setIcon(path.join(__dirname, 'assets/Logo_OneSelect_Claro.png'));
  
  // Main window loads index.html file
  Orden.loadURL('http://localhost:3000/index-cliente')
  // To maximize the window

  Orden.show();
}

ipcMain.on("dividirIndex", (event, arg) => {
  nuevaVentanaOrden()
});

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
  
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});