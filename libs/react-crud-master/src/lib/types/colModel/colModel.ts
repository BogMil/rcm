import { InputControlTypes } from '../inputControlTypes/inputControlTypesTest'
import { InputControlType } from '../inputControlTypes/commonInterfaces'
import { IColumnType } from '../columnTypes/commonInterfaces';
import { StringColumnType } from '../columnTypes/stringColumnType';
export class ColModel implements ColModelFieldProps {

    private static created: boolean = false;

    public constructor(init?: Partial<ColModel>) {
        if (!ColModel.created)
            this.createTextWidthMeasurementSpan()

        if (init == undefined) return;

        if (init.createMode != null)
            this.createMode = Object.assign({}, this.createMode, init.createMode);

        if (init.columnType != undefined)
            this.columnType = init.columnType

        Object.keys(init).forEach(key => {
            if (!(init[key] instanceof Object)) {
                this[key] = init[key];
            }
        });

        if (init.label == undefined)
            this.label = this.name

        if (init.minWidth == undefined)
            this.minWidth = this.calculateMinWithOfColumnByLabel(this.label)

        if (init.width == undefined) {
            this.width = this.getWidthOfWord(this.label)
        }

    }

    private _minWidth: number = 0;
    get minWidth(): number { return this._minWidth; }
    set minWidth(value: number) {
        if (value < 0)
            value = this.calculateMinWithOfColumnByLabel(this.label)
        this._minWidth = value;
    }

    private _width: number = 0;
    get width(): number { return this._width; }
    set width(value: number) {
        if (value <= 0)
            value = this.getWidthOfWord(this.label)
        this._width = value;
    }

    public name: string = "";
    public label: string = "";
    public orderDirection: string = "";
    public showColMenuModal: boolean = false;
    public columnPosition: number = null;
    public columnType: IColumnType = new StringColumnType();

    public createMode: CreateMode
    // = {
    //     InputControl: InputControlTypes.string(),
    //     beforeChange: () => { },
    //     afterChange: () => { }
    // };

    public calculateMinWithOfColumnByLabel = (label: string): number => {
        if (label.indexOf(" ") < 0) {
            return this.getWidthOfWord(label) + 40;
        }
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

    private createTextWidthMeasurementSpan() {
        let t = document.createElement('span');
        t.id = "label-width-tester";
        t.style.fontSize = '16px';
        t.style.fontWeight = '700';
        t.style.position = 'absolute';
        t.style.top = '-999999px';

        document.body.appendChild(t);
        ColModel.created = true;
    }
}

export interface ColModelFieldProps {
    name: string;
    label: string;
    orderDirection: string;
    showColMenuModal: boolean;
    columnPosition: number;
    minWidth: number;
    width: number;
    createMode: CreateMode;
}

export interface CreateMode extends CreateModeMethods, CreateModeProps { }
export interface CreateModeMethods {
    beforeChange?: () => void,
    afterChange?: () => void,
}
export interface CreateModeProps {
    InputControl: InputControlType
}



export interface ColModelMethodsCreateMode {
    createMode: CreateModeMethods
}

export class ColModelMethods implements ColModelMethodsCreateMode {

    constructor(colModel: ColModel) {
        this.name = colModel.name;
        this.createModeInputControl = colModel.createMode != null ? colModel.createMode.InputControl : null;
        this.createMode = colModel.createMode != null ? {
            beforeChange: colModel.createMode.beforeChange,
            afterChange: colModel.createMode.afterChange
        } :
            null
    }
    name: string;
    createModeInputControl: InputControlType;
    createMode: CreateModeMethods;
}

export class ColModelMethodsExtractor {
    public static extractFromColModel = (colModel: ColModel): ColModelMethods => new ColModelMethods(colModel);
}