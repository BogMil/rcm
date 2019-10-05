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
import { InputControlTypes } from '../../types/InputControlTypes'
import { ColModel } from '../../types/colModel';
import { Bool } from '../../types/inputControlTypes/Bool';
import { InputControlTypeNames } from '../../constants/InputControlTypeNames';


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
        this.props.onRowDataChange(name, value);
    };

    decideInputType = (colType: string): string => {
        switch (colType) {
            case InputControlTypeNames.STRING:
                return 'text';

            case InputControlTypeNames.INTEGER: case InputControlTypeNames.DECIMAL:
                return 'number';
        }
    }

    renderInputControl = (column: ColModel) => {
        if (this.props.isInCreateMode) {
            let type = typeof column.createMode.InputControl.inputType
            console.log(type);

            switch (type) {
                case InputControlTypeNames.STRING: case InputControlTypeNames.INTEGER: case InputControlTypeNames.DECIMAL:
                    return (
                        <>
                            < Form.Control
                                onChange={(e: any) => this.onRowDataChange(column.name, e.target.value)}
                                type={this.decideInputType(column.createMode.InputControl.inputType)}
                                placeholder={column.name}
                                className="cm-crud-modal-text-input"
                                value={this.props.rowData[column.name]}
                            />
                        </>
                    );
                case InputControlTypeNames.BOOL:
                    let Bool = column.createMode.InputControl as Bool;
                    if (Bool.presentationType == InputControlTypes.BoolPresentationTypes.SWITCH)
                        return (
                            <Form.Check
                                custom
                                disabled={Bool.disabled}
                                type={'switch'}
                                id={`custom-1`}
                                label={Bool.label}
                                className="cm-crud-modal-text-input"
                            />
                        );
                    else
                        return (
                            <Form.Check
                                custom
                                disabled={Bool.disabled}
                                type={'checkbox'}
                                id={`custom-1`}
                                label={Bool.label}
                                className="cm-crud-modal-text-input"
                            />
                        );


                default:
                    return (
                        <>

                            < Form.Control
                                onChange={(e: any) => this.onRowDataChange(column.name, e.target.value)}
                                placeholder={column.name}
                                className="cm-crud-modal-text-input"
                                value={this.props.rowData[column.name]}
                            />
                        </>
                    );
            }
        }
        return (
            <>

                < Form.Control
                    onChange={(e: any) => this.onRowDataChange(column.name, e.target.value)}
                    placeholder={column.name}
                    className="cm-crud-modal-text-input"
                    value={this.props.rowData[column.name]}
                />
            </>
        );
    }

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
                        this.props.colModels.map((column) => {
                            return (
                                <div key={column.name} className="cm-crud-modal-input-holder">
                                    <Form.Group style={{ marginBottom: 5 }}>
                                        <Form.Label htmlFor={column.name} style={{ marginBottom: 0 }} >
                                            {column.name}
                                        </Form.Label>
                                        {this.renderInputControl(column)}
                                    </Form.Group>
                                </div>
                            );
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
