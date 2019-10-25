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

export function ReactCrudMaster(props: ReactCrudMasterProps) {
    let store = createStore(rootReducer, applyMiddleware(thunk));
    return (
        <Provider store={store} >
            <ReactCrudMasterComponent urlProp={props.url} dataProp={props.data} colModelsProp={props.colModels} />
        </Provider>
    )
}

export default ReactCrudMaster

export { ColModel } from './types/colModel'
export { InputControlTypes } from './types/inputControlTypesTest'