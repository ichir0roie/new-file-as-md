
import * as vscode from 'vscode';
import { stat, write, writeFile, existsSync } from 'fs';
import { promisify } from 'util';

const promiseStat = promisify(stat);

// https://github.com/microsoft/vscode/issues/3553
export async function getCurrentFolder(): Promise<string | undefined> {
	const originalClipboard = await vscode.env.clipboard.readText();

	await vscode.commands.executeCommand('copyFilePath');
	let folder = await vscode.env.clipboard.readText();  // returns a string

	if (folder.split("\r\n").length !== 1 || folder === '') {
		vscode.window.showErrorMessage("please select one folder.");
		return undefined;
	}

	await vscode.env.clipboard.writeText(originalClipboard);

	// see note below for parsing multiple files/folders
	let newUri = await vscode.Uri.file(folder);          // make it a Uri 
	let basePath = newUri.fsPath;
	if (basePath === "\\isDirectory") {
		vscode.window.showErrorMessage("can not select workspace root . ");
		return '';
	}
	const statsPath = await promiseStat(basePath);
	if (!statsPath.isDirectory()) {
		const slashPos = basePath.lastIndexOf('\\');
		basePath = basePath.substring(0, slashPos);
	}

	return basePath;
}