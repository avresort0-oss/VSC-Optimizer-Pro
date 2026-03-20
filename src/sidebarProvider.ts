import * as vscode from "vscode";

export class SidebarProvider implements vscode.WebviewViewProvider {
  constructor(private readonly _extensionUri: vscode.Uri) { }

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    webviewView.webview.options = { enableScripts: true };
    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "onBoost":
          vscode.commands.executeCommand("vsc-optimizer.boost");
          break;
        case "onDevMode":
          vscode.window.showInformationMessage("Dev Mode Activated");
          break;
        case "onSmartSafe":
          vscode.commands.executeCommand("vsc-optimizer.smartSafe");
          break;
        case "onClean":
          vscode.window.showInformationMessage("Cache Purge Initiated");
          break;
      }
    });
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: var(--vscode-font-family);
          background-color: var(--vscode-editor-background);
          color: var(--vscode-editor-foreground);
          padding: 10px;
        }
        .card {
          background: var(--vscode-sideBar-background);
          border: 1px solid var(--vscode-widget-border);
          border-radius: 6px;
          padding: 12px;
          margin-bottom: 15px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        h3 {
          margin-top: 0;
          margin-bottom: 10px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--vscode-descriptionForeground);
        }
        .btn {
          display: block;
          width: 100%;
          padding: 8px 12px;
          margin-bottom: 8px;
          border: none;
          background-color: var(--vscode-button-background);
          color: var(--vscode-button-foreground);
          cursor: pointer;
          border-radius: 2px;
          font-size: 13px;
          text-align: left;
          transition: filter 0.2s;
        }
        .btn:hover {
          background-color: var(--vscode-button-hoverBackground);
        }
        .btn-secondary {
          background-color: var(--vscode-button-secondaryBackground);
          color: var(--vscode-button-secondaryForeground);
        }
        .btn-secondary:hover {
          background-color: var(--vscode-button-secondaryHoverBackground);
        }
        /* Live Graph Placeholder */
        .graph-box {
          height: 80px;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 5px;
          border-radius: 4px;
          overflow: hidden;
        }
        .bar {
          width: 8px;
          background: #00ffaa;
          transition: height 0.3s ease;
          box-shadow: 0 0 4px #00ffaa;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h3>Resource Monitor</h3>
        <div class="graph-box" id="graph"></div>
      </div>

      <div class="card">
        <h3>Profiles</h3>
        <button class="btn btn-secondary" onclick="msg('onDevMode')">🛠️ Dev Mode</button>
        <button class="btn" onclick="msg('onBoost')">🚀 Performance Mode</button>
        <button class="btn btn-secondary" onclick="msg('onSmartSafe')">🛡️ SmartSafe Mode</button>
      </div>

      <div class="card">
        <h3>Maintenance</h3>
        <button class="btn btn-secondary" onclick="msg('onClean')">🧹 Clear Cache</button>
      </div>

      <script>
        const vscode = acquireVsCodeApi();
        function msg(type) { vscode.postMessage({ type }); }

        // Simulated Graph Animation
        const graph = document.getElementById('graph');
        for(let i=0; i<15; i++) {
          const bar = document.createElement('div');
          bar.className = 'bar';
          bar.style.height = Math.random() * 100 + '%';
          graph.appendChild(bar);
        }
        setInterval(() => {
          const bars = document.querySelectorAll('.bar');
          bars.forEach(b => b.style.height = Math.random() * 80 + 10 + '%');
        }, 800);
      </script>
    </body>
    </html>`;
  }
}