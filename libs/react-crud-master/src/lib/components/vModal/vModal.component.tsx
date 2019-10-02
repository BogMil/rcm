import React, { Component } from "react";
import {
    Modal,
    Button,
    Form,
} from "react-bootstrap";
import '../contexMenu.css';

import { connect } from 'react-redux'
import * as Redux from 'redux'
import { AppState } from '../../rootReducer'
import * as VModalActions from '../vModal/vModal.actions'
import { VModalOwnProps, VModalDispatchProps, VModalStateProps, VModalState, VModalProps, initialState } from "./vModal.types";
import './vmodal.css'


class VModalComponent extends Component<VModalProps, VModalState>{
    constructor(props: VModalProps) {
        super(props);
        this.state = initialState();
    }

    componentDidMount = () => {

    }

    handleClose = () => {
        this.props.closeVModal();
    }

    render() {
        console.log(this.props.rowData)
        return (
            < Modal style={{ borderRadius: 0 }}
                show={this.props.show}
                onHide={this.handleClose}
                centered
                className="cm-v-modal"
            >
                <Modal.Header className="cm-v-modal-header" closeButton >
                    <Modal.Title>Modal heading </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.rowData &&
                        this.props.colModels.map((column) => {
                            return (
                                <div key={column.name} className="cm-v-modal-cell-holder">
                                    <Form.Group style={{ marginBottom: 5 }}>
                                        <Form.Label style={{ marginBottom: 0 }} >
                                            {column.name}
                                        </Form.Label>
                                        <div className="cm-v-modal-cell-value-holder">
                                            {this.props.rowData[column.name]}
                                        </div>
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
                </Modal.Footer>
            </Modal>
        );
    }


}



const mapDispatchToProps = (dispatch: Redux.Dispatch<Redux.AnyAction>): VModalDispatchProps => {
    return {
        closeVModal: () => dispatch(VModalActions.closeModal()),
    };
}

const mapStateToProps = (state: AppState): VModalStateProps => {
    return {
        show: state.vModal.show,
        colModels: state.reactCrudMaster.colModels,
        rowData: state.reactCrudMaster.selectedRow,
    } as VModalStateProps;
}

export default connect<VModalStateProps, VModalDispatchProps, VModalOwnProps, AppState>(mapStateToProps, mapDispatchToProps)(VModalComponent);
