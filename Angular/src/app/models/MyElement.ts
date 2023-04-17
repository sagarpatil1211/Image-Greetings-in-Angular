export class MyElement {
    id:string;
    text:string;
    fontfamily: string;
    fontsize: string;
    color:string;

    constructor(id:string, text:string) {
        this.id = id;
        this.text = text;
        this.fontfamily = "Times New Roman";
        this.fontsize = "10px";
        this.color = "white";
    }
}