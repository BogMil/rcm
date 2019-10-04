import React, { Component } from "react";
import {
    Modal,
    Button,
    Form,
} from "react-bootstrap";
import '../contexMenu.css';
import '../reactCrudMaster/reactCrudMaster.css';

import { connect } from 'react-redux'
import * as Redux from 'redux'
import { AppState } from '../../rootReducer'
import * as CrudModalActions from '../crudModal/crudModal.actions'
import { CrudModalOwnProps, CrudModalDispatchProps, CrudModalStateProps, CrudModalState, CrudModalProps, initialState } from "./crudModal.types";
import { ColTypes, Bool } from '../../columnTypes'
import { ColModel } from '../../types/colModel';


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
            case ColTypes.STRING:
                return 'text';

            case ColTypes.INTEGER: case ColTypes.DECIMAL:
                return 'number';
        }
    }

    renderInputControl = (column: ColModel) => {
        switch (column.colType.inputType) {
            case ColTypes.STRING: case ColTypes.INTEGER: case ColTypes.DECIMAL:
                return (
                    <>
                        < Form.Control
                            onChange={(e: any) => this.onRowDataChange(column.name, e.target.value)}
                            type={this.decideInputType(column.colType.inputType)}
                            placeholder={column.name}
                            className="cm-crud-modal-text-input"
                            value={this.props.rowData[column.name]}
                        />
                    </>
                );
            case ColTypes.BOOL:
                let colType = column.colType as Bool;
                if (colType.presentationType == ColTypes.BoolPresentationTypes.SWITCH)
                    return (
                        <Form.Check
                            custom
                            type={'switch'}
                            id={`custom-1`}
                            label={`Check this custom`}
                        />
                    );
                else
                    return (
                        <Form.Check
                            custom
                            type={'checkbox'}
                            id={`custom-1`}
                            label={`Check this custom`}
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
                <Modal.Body>
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
