import * as vscode from 'vscode';
import { SidebarProvider } from './sidebarProvider';
import { MemoryWatcher } from './memoryWatcher';

async function detectProjectType(): Promise<'node' | 'python' | 'unknown'> {
    const packageJson = await vscode.workspace.findFiles('package.json', '**/node_modules/**', 1);
    if (packageJson.length > 0) {
        return 'node';
    }
    const pythonFiles = await vscode.workspace.findFiles('{requirements.txt,pyproject.toml}', '**/venv/**,**/.venv/**', 1);
    if (pythonFiles.length > 0) {
        return 'python';
    }
    return 'unknown';
}

export function activate(context: vscode.ExtensionContext) {
    const sidebarProvider = new SidebarProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider("vsc-optimizer-view", sidebarProvider)
    );

    // Phase 1: Memory Leak Watcher Initialization
    const memoryWatcher = new MemoryWatcher();
    memoryWatcher.start();
    context.subscriptions.push({ dispose: () => memoryWatcher.stop() });

    // Phase 1: Core Performance Engine - Smart Setting Injection
    context.subscriptions.push(
        vscode.commands.registerCommand('vsc-optimizer.boost', async () => {
            const config = vscode.workspace.getConfiguration();
            const target = vscode.ConfigurationTarget.Global;

            // 1. Smart Setting Injection: Exclude heavy folders from watcher
            const currentExcludes = config.get<object>('files.watcherExclude') || {};
            const newExcludes = {
                ...currentExcludes,
                '**/node_modules/**': true,
                '**/dist/**': true,
                '**/temp/**': true
            };
            await config.update('files.watcherExclude', newExcludes, target);
            await config.update('editor.minimap.enabled', false, target);

            vscode.window.showInformationMessage("🚀 Boost Mode Activated: Smart settings injected!");
        })
    );

    // Phase 2: SmartSafe Mode Profile
    context.subscriptions.push(
        vscode.commands.registerCommand('vsc-optimizer.smartSafe', async () => {
            if (!vscode.workspace.workspaceFolders) {
                vscode.window.showErrorMessage("SmartSafe Mode requires an open folder or workspace.");
                return;
            }

            const config = vscode.workspace.getConfiguration();
            const target = vscode.ConfigurationTarget.Workspace;
            const projectType = await detectProjectType();

            let watcherExclude = config.get<object>('files.watcherExclude', {});
            let searchExclude = config.get<object>('search.exclude', {});
            let message: string;

            if (projectType === 'node') {
                watcherExclude = { ...watcherExclude, '**/node_modules/**': true, '**/dist/**': true };
                searchExclude = { ...searchExclude, '**/node_modules': true, '**/dist': true };
                message = "Applied Node.js-specific safe settings to the workspace.";
            } else if (projectType === 'python') {
                watcherExclude = { ...watcherExclude, '**/__pycache__/**': true, '**/venv/**': true, '**/.venv/**': true };
                searchExclude = { ...searchExclude, '**/__pycache__': true, '**/venv': true, '**/.venv': true };
                message = "Applied Python-specific safe settings to the workspace.";
            } else {
                vscode.window.showInformationMessage("SmartSafe: No specific project type (Node/Python) detected. Manual configuration is recommended.");
                return;
            }

            await config.update('files.watcherExclude', watcherExclude, target);
            await config.update('search.exclude', searchExclude, target);
            vscode.window.showInformationMessage(`🛡️ SmartSafe Mode: ${message}`);
        })
    );
}