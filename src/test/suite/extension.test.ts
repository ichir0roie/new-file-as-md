import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';


import * as mExt from '../../extension';


suite('Extension Test Suite', () => {

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
});

suite('createText', () => {
	const basePath="./test";
	test('sample test', () => {
		mExt.createFileAdjusted(basePath,"");
		mExt.createFileAdjusted(basePath,"test");
		mExt.createFileAdjusted(basePath,".");
		mExt.createFileAdjusted(basePath,"test.");
		mExt.createFileAdjusted(basePath,"..");
		mExt.createFileAdjusted(basePath,"..md");
		mExt.createFileAdjusted(basePath,".txt");
		mExt.createFileAdjusted(basePath,"test.txt");
		mExt.createFileAdjusted(basePath,"..txt");
	});
});
