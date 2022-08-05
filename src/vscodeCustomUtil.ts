import * as vscode from 'vscode';

export function getConfiguration(path:string){
    
	let ws=vscode.workspace;
	let config=ws.getConfiguration();
    let value:any=config.get(path);
    return value;
}















