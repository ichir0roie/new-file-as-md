import * as cmn from './common';

export class TextGenerator{
    text:string='';
    title:string='';
    extension:string='';
    dateString:cmn.DateString|undefined;
    modeNameIsDate:boolean;

    constructor(
        title:string,
        extension:string,
        dateString:cmn.DateString|undefined,
        modeNameIsDate:boolean){
        this.title=title;
        this.extension=extension;
        this.dateString=dateString;
        this.modeNameIsDate=modeNameIsDate;
    }

    generate(){
        
        switch(this.extension){
            case 'md':
                this.markdown();
        }

        return this.text;
    }
    
    markdown() {
        let text='';
        if(this.dateString!==undefined){
            text+=this.dateString.formatSlash()+"\n\n";
        }
        if (this.title!==""&&!this.modeNameIsDate){
            text+='# '+this.title+'\n\n';
        }

        text+=this.line20();

        this.text=text;
    }


    line20(){
        let text='';
        for(let i=0;i<20;i++){
            text+='\n';
        }
        return text;
    }

}
