import React, { Component } from "react";
import {
    Modal,
    Button,
    Form,
} from "react-bootstrap";

import { connect } from 'react-redux'
import * as Redux from 'redux'
import { AppState } from '../../../../rootReducer'
import * as areYouSureModalActions from '../yesnoModal/yesnoModal.actions'
import { YesnoModalOwnProps, YesnoModalDispatchProps, YesnoModalStateProps, YesnoModalState, YesnoModalProps, initialState } from "./yesnoModal.types";
import * as GlobalVariableNames from '../../../../globalVariableNames'
import './yesnoModal.css'
import '../common.css'

class areYouSureModalComponent extends Component<YesnoModalProps, YesnoModalState>{
    constructor(props: YesnoModalProps) {
        super(props);
        this.state = initialState();
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
                className="cm-yesno-modal cm-common-modal"
                size="sm"
            >
                <Modal.Header className="cm-common-modal-header cm-yesno-modal-header" closeButton>
                    <Modal.Title>{this.props.title} </Modal.Title>
                </Modal.Header>
                <Modal.Body className="cm-common-modal-body" >
                    {this.props.question}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.onConfirm()}>yes</Button>
                    <Button onClick={() => this.onDeny()}>no</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    onConfirm = () => {
        this.executeGlobalyStoredFunctionNamedAs(GlobalVariableNames.ON_YESNO_MODAL_CONFIRM);
    }

    onDeny = () => {
        this.executeGlobalyStoredFunctionNamedAs(GlobalVariableNames.ON_YESNO_MODAL_DENY);
    }

    executeGlobalyStoredFunctionNamedAs = (name: string) => {
        let func = window[name];
        if (typeof func !== 'function') {
            this.props.closeModal();
            return;
        }

        this.props.closeModal();
        delete window[name];

        func();
    }
}



const mapDispatchToProps = (dispatch: Redux.Dispatch<Redux.AnyAction>): YesnoModalDispatchProps => {
    return {
        closeModal: () => dispatch(areYouSureModalActions.closeModal()),
    };
}

const mapStateToProps = (state: AppState): YesnoModalStateProps => {
    return {
        show: state.yesnoModal.show,
        question: state.yesnoModal.question,
        title: state.yesnoModal.title
    } as YesnoModalStateProps;
}

export default connect<YesnoModalStateProps, YesnoModalDispatchProps, YesnoModalOwnProps, AppState>(mapStateToProps, mapDispatchToProps)(areYouSureModalComponent);
