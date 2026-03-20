import * as vscode from 'vscode';

export class MemoryWatcher {
    private _interval: ReturnType<typeof setInterval> | undefined;

    // Check every 30 seconds
    private static readonly INTERVAL_MS = 30000;

    // Warning threshold for active languages (indicating heavy extension load)
    private static readonly LANGUAGE_COUNT_THRESHOLD = 30;

    public start(): void {
        if (this._interval) {
            return;
        }

        // Initial check
        this.check();

        this._interval = setInterval(() => {
            this.check();
        }, MemoryWatcher.INTERVAL_MS);

        console.log("Memory Leak Watcher started.");
    }

    public stop(): void {
        if (this._interval) {
            clearInterval(this._interval);
            this._interval = undefined;
        }
    }

    private async check(): Promise<void> {
        const languages = await vscode.languages.getLanguages();

        // Internal monitoring log
        console.log(`[MemoryWatcher] Active languages count: ${languages.length}`);

        if (languages.length > MemoryWatcher.LANGUAGE_COUNT_THRESHOLD) {
            vscode.window.showWarningMessage(
                `High Resource Usage: ${languages.length} languages active. Consider disabling unused extensions to free up memory.`
            );
        }
    }
}