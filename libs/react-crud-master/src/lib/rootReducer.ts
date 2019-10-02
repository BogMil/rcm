import { combineReducers } from 'redux'
import { reactCrudMasterReducer } from './components/reactCrudMaster/reactCrudMaster.reducer'
import { crudModalReducer } from './components/crudModal/crudModal.reducer'
import { ColMenuModalReducer } from './components/colMenuModal/colMenuModal.reducer';
import { ContextMenuModalReducer } from './components/contextMenuModal/contextMenuModal.reducer';
import { WarningModalReducer } from './components/common/modals/warningModal/warningModal.reducer';
import { YesnoModalReducer } from './components/common/modals/yesnoModal/yesnoModal.reducer';



export const rootReducer = combineReducers({
    reactCrudMaster: reactCrudMasterReducer,
    crudModal: crudModalReducer,
    colMenuModal: ColMenuModalReducer,
    contextMenuModal: ContextMenuModalReducer,
    warningModal: WarningModalReducer,
    yesnoModal: YesnoModalReducer
})
export type AppState = ReturnType<typeof rootReducer>