// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { create } from 'domain';
import { stat, write, writeFile,existsSync } from 'fs';
import { promisify } from 'util';
import * as vscode from 'vscode';

import * as cmn from './common';

import {TextGenerator} from './textGenerator';

import {getCurrentFolder} from "./getCurrentPath";


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "newmarkdown" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// https://stackoverflow.com/questions/51961457/how-to-get-file-name-or-path-in-vscode-extension-when-user-right-click-on-file-i
	
	let disposable = vscode.commands.registerCommand('newfileasmd.newFileAsMD', (uri:vscode.Uri) => {
		console.log('run createFile');
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
 		createFile(uri);
	});
	
	context.subscriptions.push(disposable);
}

async function createFile(uri:vscode.Uri){
	let basePath:string|undefined="";
	if (uri===undefined){
		basePath=await getCurrentFolder();
	}else{
		basePath=uri.fsPath;
	}
	if (basePath===undefined){
		return;
	}else if(basePath===""){
		return;
	}
	const filepath=await createFileAdjusted(basePath);
	if (filepath!==undefined){
		const fileUri=vscode.Uri.file(filepath);
		vscode.window.showTextDocument(fileUri);
	}
}



export async function createFileAdjusted(basePath:string,input:string|undefined=undefined){
	const dateString=new cmn.DateString();
	let createFilePath="";
	if (input===undefined){
		input=await vscode.window.showInputBox();
	}

	let filename="";
	let extension="";
	let modeNameIsDate=false;
	if(input){
		const dotPos=input.lastIndexOf(".");
		// .
		if(input==="."){
			filename="";
			extension="md";
		}else if (dotPos>=0){//-.-
			filename=input.substring(0,dotPos);
			if(filename==="."){
				filename="";
				modeNameIsDate=true;
			}
			extension=input.substring(dotPos+1,input.length);
		}else{//-
			filename=input;
			extension="md";
		}
	}else if(input===""){//Enter
		filename="";
		extension="md";
		modeNameIsDate=true;
	}else{// Escape
		return;
	}
	if(modeNameIsDate){
		filename=dateString.formatDash();
	}
	if(extension===""){
		extension="md";
	}


	
	let content=new TextGenerator(filename,extension,dateString,modeNameIsDate).generate();
	createFilePath=basePath+'/'+filename+"."+extension;
	
	if(existsSync(createFilePath)){
		vscode.window.showInformationMessage("already exists");
		return;
	}

	vscode.window.showInformationMessage("create : "+createFilePath);
	writeFile(createFilePath,content,err=>{
		if(err){
			vscode.window.showErrorMessage(err.message);
		}
	});

	return createFilePath;
}

// this method is called when your extension is deactivated
export function deactivate() {}
