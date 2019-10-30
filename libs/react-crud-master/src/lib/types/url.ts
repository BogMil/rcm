import { AppState } from '../rootReducer';

export interface UrlCreatorConfig {
    baseUrl: string;
    currentPageNumber: number;
    numOfRowsPerPage: number;
}
export class UrlCreator {
    private _baseUrl: string;
    private _currentPageNumber: number;
    private _numOfRowsPerPage: number;


    private _props: string[] = [];

    constructor(init: UrlCreatorConfig) {
        this._baseUrl = init.baseUrl;
        this._currentPageNumber = init.currentPageNumber;
        this._numOfRowsPerPage = init.numOfRowsPerPage;
    }


    attachProp = (name: string, value?: any) => {
        this._props.push(`${name}=${value} `);
    }
    private get pager() {
        return `CurrentPageNumber=${this._currentPageNumber}&numOfRowsPerPage=${this._numOfRowsPerPage}`;
    }

    get url() {

        var props = this._props.join("&");
        return `${this._baseUrl}?${this.pager}`;
    }
    get filter() {
        return this._baseUrl;
    }
    attachPager = (CurrentPageNumber: number, numOfRowsPerPage: number) => {
        this.attachProp('CurrentPageNumber', CurrentPageNumber)
        this.attachProp('numOfRowsPerPage', numOfRowsPerPage)
        return this;
    }

    nextPage = () => {
        return new UrlCreator({ baseUrl: this._baseUrl, currentPageNumber: this._currentPageNumber + 1, numOfRowsPerPage: this._numOfRowsPerPage })
    }

    previousPage = () => {
        return new UrlCreator({ baseUrl: this._baseUrl, currentPageNumber: this._currentPageNumber - 1, numOfRowsPerPage: this._numOfRowsPerPage })
    }

    nthPage = (page: number) => {
        return new UrlCreator({ baseUrl: this._baseUrl, currentPageNumber: page, numOfRowsPerPage: this._numOfRowsPerPage })
    }
}

export class Pager {
    CurrentPageNumber: number;
    numOfRowsPerPage: number;

    constructor(CurrentPageNumber: number, numOfRowsPerPage: number) {
        this.CurrentPageNumber = CurrentPageNumber;
        this.numOfRowsPerPage = numOfRowsPerPage;
    }
}

export class UrlCreatorFactory {
    static createFromStore(store: AppState) {
        let url = new UrlCreator({ baseUrl: store.reactCrudMaster.url, currentPageNumber: store.reactCrudMaster.data.currentPageNumber, numOfRowsPerPage: store.reactCrudMaster.data.numOfRowsPerPage });
        // url.attachPager(store.reactCrudMaster.data.currentPageNumber + 1, 2);
        return url;
    }
}