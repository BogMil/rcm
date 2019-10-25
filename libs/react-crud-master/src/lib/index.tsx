import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux';
import { rootReducer, AppState } from './rootReducer';
import { connect, Provider } from 'react-redux';
import ReactCrudMasterComponent from './components/reactCrudMaster/reactCrudMaster.component';
import { ColModel } from './types/colModel'
import thunk from 'redux-thunk'

interface ReactCrudMasterProps {
    data?: any,
    url?: string,
    colModels: ColModel[],
}

export class ReactCrudMaster extends Component<ReactCrudMasterProps>{

    constructor(props: ReactCrudMasterProps) {
        super(props);
    }

    store = createStore(rootReducer, applyMiddleware(thunk));


    render() {
        return (
            <Provider store={this.store} >
                <ReactCrudMasterComponent urlProp={this.props.url} dataProp={this.props.data} colModelsProp={this.props.colModels} />
            </Provider>
        )
    }
}

export default ReactCrudMaster

export { ColModel } from './types/colModel'
export { InputControlTypes } from './types/inputControlTypesTest'