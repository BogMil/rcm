import React, { Component, FormEvent, ChangeEvent } from "react";
import * as Redux from 'redux'
import {
    Table,
    Card,
    Modal,
    Navbar,
    NavDropdown,
    Nav,
    Form,
    FormControl,
    Button,
    Dropdown,
    Col,
    Row,
    InputGroup
} from "react-bootstrap";

import '../reactCrudMaster/reactCrudMaster.css'

import update from 'immutability-helper'
import { TableFooterOwnProps, TableFooterStateProps, TableFooterDispatchProps, TableFooterProps, TableFooterState } from "./tableFooter.types";
import { AppState } from "../../rootReducer";
import { connect } from "react-redux";
import * as CurdModalActions from '../crudModal/crudModal.actions'

class SmTableFooterComponent extends Component<TableFooterProps, TableFooterState>{
    constructor(props: TableFooterProps) {
        super(props);
        this.state = {};
    }


    render = () => {
        let buttonStyle = { borderRadius: 0, margin: 1 };

        if (this.props.tableWidth < 620)
            return (

                <Row className="cm-table-footer cm-table-footer-xs">
                    <Col xs={2} >
                        <Dropdown style={{ textAlign: "left" }}>
                            <Dropdown.Toggle className="cm-crud-menu-button" size="sm" style={{ ...buttonStyle }} variant="primary" id="dropdown-basic">
                                <i className="fas fa-bars"></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item className="cm-add-btn" onClick={() => this.props.openCrudModal()}>
                                    <i className="fas fa-plus" /><span style={{ paddingLeft: 10 }}>Add</span>
                                </Dropdown.Item>
                                < Dropdown.Item href="#/action-2" >
                                    <i className="fas fa-edit" /><span style={{ paddingLeft: 10 }}>Edit</span>
                                </Dropdown.Item>
                                < Dropdown.Item href="#/action-2" >
                                    <i className="fas fa-trash-alt" /><span style={{ paddingLeft: 10 }}>Delete</span>
                                </Dropdown.Item>
                                < Dropdown.Item href="#/action-2" >
                                    <i className="fas fa-eye" /> <span style={{ paddingLeft: 10 }}>View</span>
                                </Dropdown.Item>
                                < Dropdown.Item href="#/action-2" >
                                    <i className="fas fa-search" /> <span style={{ paddingLeft: 10 }}>Search</span>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    < Col xs={6} >
                        <InputGroup className="" style={{ textAlign: "center", alignItems: 'center', justifyContent: 'center' }}>
                            < Button size="sm" style={{ ...buttonStyle }}>
                                <i className="fas fa-angle-left"></i>
                            </Button>
                            <div style={{ display: 'inline-block' }}>
                                <Form.Control className="border-radius-0" style={{ height: 31, margin: 1, padding: 2, width: 50 }}
                                    defaultValue="asd" />
                            </div>
                            < Button size="sm" style={{ ...buttonStyle }}>
                                <i className="fas fa-angle-right"></i>
                            </Button>
                        </InputGroup>
                    </Col>
                    <Col xs={4} > 102 - 103 / 123 </Col>
                </Row>
            );
    };


}

const mapDispatchToProps = (dispatch: Redux.Dispatch<Redux.AnyAction>, ownProps: TableFooterOwnProps): TableFooterDispatchProps => {
    return {
        openCrudModal: () => dispatch(CurdModalActions.openModal()),
    };
}

const mapStateToProps = (state: AppState, props: TableFooterOwnProps): TableFooterStateProps => {
    return {
    } as TableFooterStateProps;
}

export default connect<TableFooterStateProps, TableFooterDispatchProps, TableFooterOwnProps, AppState>(mapStateToProps, mapDispatchToProps)(SmTableFooterComponent);

// export default Footer;
