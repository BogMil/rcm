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

    render() {
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
                                        <Form.Label style={{ marginBottom: 0 }} >
                                            {column.name}
                                        </Form.Label>
                                        < Form.Control
                                            onChange={(e: any) => this.onRowDataChange(column.name, e.target.value)}
                                            type="text"
                                            placeholder={column.name}
                                            className="cm-crud-modal-text-input"
                                            value={this.props.rowData[column.name]}
                                        />
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
        isInCreateMode: state.crudModal.isInCreateMode
    } as CrudModalStateProps;
}

export default connect<CrudModalStateProps, CrudModalDispatchProps, CrudModalOwnProps, AppState>(mapStateToProps, mapDispatchToProps)(CrudModalComponent);
