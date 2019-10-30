import { AppState } from '../rootReducer';

export interface UrlCreatorConfig {
    url: string;
    currentPageNumber: number;
}
export class UrlCreator {
    private _baseUrl: string;
    private _currentPageNumber: number;
    private _totalNumberOfPages: number;
    private _totalNumberOfRecords: number;

    private _props: string[] = [];
    constructor(init: UrlCreatorConfig) {
        this._baseUrl = init.url
        delete init.url;
        Object.assign(this, init);
    }


    attachProp = (name: string, value?: any) => {
        this._props.push(`${name}=${value} `);
    }

    get url() {
        var props = this._props.join("&");
        return `${this._baseUrl}?${props}`;
    }
    get filter() {
        return this._baseUrl;
    }
    attachPager = (CurrentPageNumber: number, NumberOfRowsToDisplay: number) => {
        this.attachProp('CurrentPageNumber', CurrentPageNumber)
        this.attachProp('NumberOfRowsToDisplay', NumberOfRowsToDisplay)
        return this;
    }
    pager(CurrentPageNumber: number, NumberOfRowsToDisplay: number) {
        return new Pager(CurrentPageNumber, NumberOfRowsToDisplay)
    }
}

export class Pager {
    CurrentPageNumber: number;
    NumberOfRowsToDisplay: number;

    constructor(CurrentPageNumber: number, NumberOfRowsToDisplay: number) {
        this.CurrentPageNumber = CurrentPageNumber;
        this.NumberOfRowsToDisplay = NumberOfRowsToDisplay;
    }
}

export class UrlCreatorFactory {
    static createFromStore(store: AppState) {
        let url = new UrlCreator({ url: store.reactCrudMaster.url, currentPageNumber: store.reactCrudMaster.data.currentPageNumber, });
        url.attachPager(store.reactCrudMaster.data.currentPageNumber + 1, 2);
        return url;
    }
}