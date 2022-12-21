import * as cmn from './common';

import * as vcu from "./vscodeCustomUtil";

export class TextGenerator {
    text: string = '';
    title: string = '';
    dateString: cmn.DateString | undefined;
    inputIsNull: boolean;

    constructor(
        title: string,
        dateString: cmn.DateString | undefined,
        inputIsNull: boolean) {
        this.title = title;
        this.dateString = dateString;
        this.inputIsNull = inputIsNull;
    }


    generate(): string {
        const author = vcu.getConfiguration("newfileasmd.author");
        const insertCreate: boolean = vcu.getConfiguration("newfileasmd.generate.create.active");
        const createPrefix: string = vcu.getConfiguration("newfileasmd.generate.create.format");
        const insertAuthor: boolean = vcu.getConfiguration("newfileasmd.generate.author.active");
        const authorPrefix: string = vcu.getConfiguration("newfileasmd.generate.author.format");
        const generateOnNoInput: boolean = vcu.getConfiguration("newfileasmd.generateInitializeText.noInput");
        const generateOnHaveInput: boolean = vcu.getConfiguration("newfileasmd.generateInitializeText.haveInput");

        let text = '';

        let generate = false;
        if (this.inputIsNull && generateOnNoInput) {
            generate = true;
        }
        if (!this.inputIsNull && generateOnHaveInput) {
            generate = true;
        }
        if (!generate) {
            return "";
        }

        if (this.dateString !== undefined && insertCreate) {
            text += createPrefix + this.dateString.formatSlash() + "\n";
        }
        if (author !== undefined && author.length > 0 && insertAuthor) {
            text += authorPrefix + author + "\n";
        }

        // if (this.title !== "" && !this.inputIsNull) {
        //     text += '\n# ' + this.title + '\n\n';
        // }

        text += this.line20();

        this.text = text;

        return text;
    }


    line20() {
        let text = '';
        for (let i = 0; i < 20; i++) {
            text += '\n';
        }
        return text;
    }

}
