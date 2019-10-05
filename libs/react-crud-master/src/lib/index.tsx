import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux';
import { rootReducer, AppState } from './rootReducer';
import { connect, Provider } from 'react-redux';
import ReactCrudMasterComponent from './components/reactCrudMaster/reactCrudMaster.component';
import { ReactCrudMasterOwnProps } from './components/reactCrudMaster/reactCrudMaster.types';
import { ColModel } from './types/ColModel'
import thunk from 'redux-thunk'

interface ReactCrudMasterProps {
    data: any, colModels: ColModel[]
}

export class ReactCrudMaster extends Component<ReactCrudMasterProps>{

    constructor(props: ReactCrudMasterProps) {
        super(props);
    }

    store = createStore(rootReducer, applyMiddleware(thunk));


    render() {
        return (
            <Provider store={this.store} >
                <ReactCrudMasterComponent dataProp={this.props.data} colModelsProp={this.props.colModels} />
            </Provider>
        )
    }
}

export default ReactCrudMaster

export { ColModel } from './types/ColModel'
export { InputControlTypes } from './types/InputControlTypes'