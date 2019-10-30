import { combineReducers, createStore, applyMiddleware } from 'redux'
import { reactCrudMasterReducer } from './components/reactCrudMaster/reactCrudMaster.reducer'
import { crudModalReducer } from './components/crudModal/crudModal.reducer'
import { ColMenuModalReducer } from './components/colMenuModal/colMenuModal.reducer';
import { ContextMenuModalReducer } from './components/contextMenuModal/contextMenuModal.reducer';
import { WarningModalReducer } from './components/common/modals/warningModal/warningModal.reducer';
import { YesnoModalReducer } from './components/common/modals/yesnoModal/yesnoModal.reducer';
import { vModalReducer } from './components/vModal/vModal.reducer';
import thunk from 'redux-thunk'

export const rootReducer = combineReducers({
    reactCrudMaster: reactCrudMasterReducer,
    crudModal: crudModalReducer,
    colMenuModal: ColMenuModalReducer,
    contextMenuModal: ContextMenuModalReducer,
    warningModal: WarningModalReducer,
    yesnoModal: YesnoModalReducer,
    vModal: vModalReducer
})

export type AppState = ReturnType<typeof rootReducer>