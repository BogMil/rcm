import React, { Component } from "react";
import {
    Modal,
    Button,
    Form,
} from "react-bootstrap";

import { connect } from 'react-redux'
import * as Redux from 'redux'
import { AppState } from '../../../../rootReducer'
import * as WarningModalActions from '../warningModal/warningModal.actions'
import { WarningModalOwnProps, WarningModalDispatchProps, WarningModalStateProps, WarningModalState, WarningModalProps, initialState } from "./warningModal.types";
import '../common.css'
import './warningModal.css'


class WarningModalComponent extends Component<WarningModalProps, WarningModalState>{
    constructor(props: WarningModalProps) {
        super(props);
        this.state = initialState();
    }

    componentDidMount = () => {

    }

    handleClose = () => {
        this.props.closeModal();
    }

    render() {
        return (

            < Modal
                show={this.props.show}
                onHide={this.handleClose}
                centered
                className="cm-warning-modal cm-common-modal"
                size="sm"
            >
                <Modal.Header className="cm-common-modal-header cm-warning-modal-header" closeButton>
                    <Modal.Title>Warning </Modal.Title>
                </Modal.Header>
                <Modal.Body className="cm-common-modal-body" >
                    {this.props.message}
                </Modal.Body>
            </Modal>
        );
    }


}



const mapDispatchToProps = (dispatch: Redux.Dispatch<Redux.AnyAction>): WarningModalDispatchProps => {
    return {
        closeModal: () => dispatch(WarningModalActions.closeModal()),
    };
}

const mapStateToProps = (state: AppState): WarningModalStateProps => {
    return {
        show: state.warningModal.show,
        message: state.warningModal.message
    } as WarningModalStateProps;
}

export default connect<WarningModalStateProps, WarningModalDispatchProps, WarningModalOwnProps, AppState>(mapStateToProps, mapDispatchToProps)(WarningModalComponent);
