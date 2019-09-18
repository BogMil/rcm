import React, { Component, FormEvent, ChangeEvent } from "react";
import {
    Table,
    Modal,
    Button,
} from "react-bootstrap";
import '../contexMenu.css';
import '../reactCrudMaster/reactCrudMaster.css';

import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import * as Redux from 'redux'
import { ColModel } from "../../types/colModel";
import { rootReducer, AppState } from '../../rootReducer'
import { any } from "prop-types";
import { ColMenuModalProps, ColMenuModalState, initialState, ColMenuModalOwnProps, ColMenuModalDispatchProps, ColMenuModalStateProps } from "./colMenuModal.types";
import * as ColMenuModalActions from './colMenuModal.actions'
import { ThunkDispatch } from "redux-thunk";

class ColMenuModalComponent extends Component<ColMenuModalProps, ColMenuModalState>{
    constructor(props: ColMenuModalProps) {
        super(props);
        this.state = initialState();
    }

    componentDidMount = () => {

    };

    render() {
        return (

            <Modal
                size="sm"
                centered
                show={this.props.show}
                onHide={this.props.closeColMenuModel}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.colModel && this.props.colModel.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>width: {this.props.colModel && this.props.colModel.width}</div>
                    <div>freeze</div>
                    <div>group</div>
                    <div>advanced column filter</div>
                </Modal.Body>
            </Modal>
        );
    }
}



const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: ColMenuModalOwnProps): ColMenuModalDispatchProps => {
    return {
        closeColMenuModel: () => dispatch(ColMenuModalActions.closeModal())
    };
}

const mapStateToProps = (state: AppState, props: ColMenuModalOwnProps): ColMenuModalStateProps => {
    return {
        colModel: state.colMenuModal.colModel,
        show: state.colMenuModal.show
    } as ColMenuModalStateProps;
}

export default connect<ColMenuModalStateProps, ColMenuModalDispatchProps, ColMenuModalOwnProps, AppState>(mapStateToProps, mapDispatchToProps)(ColMenuModalComponent);
