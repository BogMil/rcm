export class ColModel {

    private static created: boolean = false;

    public constructor(init?: Partial<ColModel>) {
        if (!ColModel.created) {
            let t = document.createElement('span');
            t.id = "label-width-tester";
            t.style.fontSize = '16px';
            t.style.fontWeight = '700';
            t.style.position = 'absolute';
            t.style.top = '-999999px';

            document.body.appendChild(t);
            ColModel.created = true;
        }

        if (init == undefined)
            return;


        Object.assign(this, init);

        if (init.minWidth == undefined)
            this.minWidth = this.calculateMinWithOfColumnByLabel(this.label)

        if (init.width == null){
            this.width = this.getWidthOfWord(this.label)
        }
            
    }

    private _minWidth: number = 0;
    get minWidth(): number {
        return this._minWidth;
    }
    set minWidth(value: number) {
        if (value < 0)
            value = this.calculateMinWithOfColumnByLabel(this.label)
        this._minWidth = value;
    }

    private _width: number = 0;
    get width(): number {
        return this._width;
    }
    set width(value: number) {
        if (value <= 0)
            value = this.getWidthOfWord(this.label)
        this._width = value;
    }

    public name: string = "";
    public label: string = "";
    public orderDirection: string = "";
    public showColMenuModal: boolean = false;

    public calculateMinWithOfColumnByLabel = (label: string): number => {
        let wordsInColLabel = label.split(" ");
        var longestWord = wordsInColLabel.reduce((a, b) => {
            let aLength = this.getWidthOfWord(a);
            let bLength = this.getWidthOfWord(b);
            return aLength > bLength ? a : b;
        });

        return this.getWidthOfWord(longestWord) + 40;
    }
    private getWidthOfWord = (word: string): number => {
        let tempWordHolder: HTMLElement = document.getElementById("label-width-tester")!;
        
        tempWordHolder.textContent = word;
        return tempWordHolder.offsetWidth;
    };
}
