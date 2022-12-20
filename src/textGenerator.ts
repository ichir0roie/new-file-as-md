import * as cmn from './common';

import * as vcu from "./vscodeCustomUtil";

export class TextGenerator {
    text: string = '';
    title: string = '';
    extension: string = '';
    dateString: cmn.DateString | undefined;
    modeNameIsDate: boolean;

    constructor(
        title: string,
        extension: string,
        dateString: cmn.DateString | undefined,
        modeNameIsDate: boolean) {
        this.title = title;
        this.extension = extension;
        this.dateString = dateString;
        this.modeNameIsDate = modeNameIsDate;
    }

    generate() {

        switch (this.extension) {
            case 'md':
                this.markdown();
        }

        return this.text;
    }

    markdown() {
        const insertCreate: boolean = vcu.getConfiguration("newfileasmd.insertCreate");
        const insertAuthor: boolean = vcu.getConfiguration("newfileasmd.insertAuthor");
        const authorPrefix: string = vcu.getConfiguration("newfileasmd.authorPrefix");
        const createPrefix: string = vcu.getConfiguration("newfileasmd.createPrefix");
        const author = vcu.getConfiguration("newfileasmd.author");

        let text = '';

        if (this.dateString !== undefined && insertCreate) {
            text += createPrefix + this.dateString.formatSlash() + "\n";
        }
        if (author !== undefined && author.length > 0 && insertAuthor) {
            text += authorPrefix + author + "\n";
        }

        if (this.title !== "" && !this.modeNameIsDate) {
            text += '\n# ' + this.title + '\n\n';
        }

        text += this.line20();

        this.text = text;
    }


    line20() {
        let text = '';
        for (let i = 0; i < 20; i++) {
            text += '\n';
        }
        return text;
    }

}
