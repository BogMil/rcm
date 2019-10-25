import React, { Component } from "react";
import {
    Modal,
    Button,
    Form,
} from "react-bootstrap";
import '../contexMenu.css';
import './crudModal.css';

import { connect } from 'react-redux'
import * as Redux from 'redux'
import { AppState } from '../../rootReducer'
import * as CrudModalActions from '../crudModal/crudModal.actions'
import { CrudModalOwnProps, CrudModalDispatchProps, CrudModalStateProps, CrudModalState, CrudModalProps, initialState } from "./crudModal.types";
import { InputControlTypes } from '../../types/inputControlTypesTest'
import { ColModel } from '../../types/colModel';
import { Bool } from '../../types/inputControlTypes/Bool';
import { InputControlTypeNames } from '../../constants/InputControlTypeNames';
import InputControl from './inputControl/inputControl.component'
import { colModels } from '../../testData';

class CrudModalComponent extends Component<CrudModalProps, CrudModalState>{
    constructor(props: CrudModalProps) {
        super(props);
        this.state = initialState();

    }

    componentDidMount = () => {

    }

    handleClose = () => {
        this.props.closeCrudModal();
    }

    onRowDataChange = (name: string, value: any) => {
        let colModelMethods = this.props.colModelsMethods.filter(x => x.name == name)[0];

        colModelMethods.createMode.beforeChange();

        if (colModelMethods.createModeInputControl.inputType == 'BOOL')
            value = !this.props.rowData[name];

        this.props.onRowDataChange(name, value);

        colModelMethods.createMode.afterChange();
    };

    render = () => {
        return (
            < Modal style={{ borderRadius: 0 }}
                show={this.props.show}
                onHide={this.handleClose}
                centered
                className="cm-crud-modal"
            >
                <Modal.Header className="cm-crud-modal-header" closeButton >
                    <Modal.Title>Modal heading </Modal.Title>
                </Modal.Header>
                <Modal.Body className="cm-crud-modal-body">
                    {
                        this.props.colModels.map((column, i) => {
                            return (
                                <InputControl
                                    key={i}
                                    column={column}
                                    isInCreateMode={this.props.isInCreateMode}
                                    rowData={this.props.rowData}
                                    onRowDataChange={this.onRowDataChange}
                                />
                            )
                        })
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose} >
                        Close
                        </Button>
                    < Button variant="primary" onClick={this.handleClose} >
                        Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}



const mapDispatchToProps = (dispatch: Redux.Dispatch<Redux.AnyAction>): CrudModalDispatchProps => {
    return {
        closeCrudModal: () => dispatch(CrudModalActions.closeModal()),
        onRowDataChange: (name: string, value: any) => dispatch(CrudModalActions.onRowDataChange(name, value))
    };
}

const mapStateToProps = (state: AppState): CrudModalStateProps => {
    return {
        show: state.crudModal.show,
        colModels: state.reactCrudMaster.colModels,
        rowData: state.crudModal.rowData,
        isInCreateMode: state.crudModal.isInCreateMode,
        RCMID: state.reactCrudMaster.RCMID
    } as CrudModalStateProps;
}

export default connect<CrudModalStateProps, CrudModalDispatchProps, CrudModalOwnProps, AppState>(mapStateToProps, mapDispatchToProps)(CrudModalComponent);
