import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux';
import { rootReducer, AppState } from './rootReducer';
import { connect, Provider } from 'react-redux';
import ReactCrudMasterComponent from './components/reactCrudMaster/reactCrudMaster.component';
import { ColModel } from './types/colModel'
import thunk from 'redux-thunk'
import { UserConfig } from './types/userConfig';

export function ReactCrudMaster(config: UserConfig) {
    let store = createStore(rootReducer, applyMiddleware(thunk));
    return (
        <Provider store={store} >
            <ReactCrudMasterComponent {...config} />
        </Provider>
    )
}

export default ReactCrudMaster

export { ColModel } from './types/colModel'
export { InputControlTypes } from './types/inputControlTypesTest'