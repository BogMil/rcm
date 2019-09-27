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

import { TableFooterOwnProps, TableFooterStateProps, TableFooterDispatchProps, TableFooterProps, TableFooterState } from "./tableFooter.types";
import { AppState } from "../../rootReducer";
import { connect } from "react-redux";
import * as CurdModalActions from '../crudModal/crudModal.actions'
import * as FontAwesomeClasses from '../../FontAwesomeClasses'


class SmTableFooterComponent extends Component<TableFooterProps, TableFooterState>{
    constructor(props: TableFooterProps) {
        super(props);
        this.state = {};
    }


    render = () => {
        if (this.props.tableWidth < 620)
            return (

                <Row className="cm-table-footer cm-table-footer-xs">
                    <Col xs={2} >
                        <Dropdown style={{ textAlign: "left" }}>
                            <Dropdown.Toggle className="cm-crud-menu-button cm-footer-button" size="sm" variant="primary" id="dropdown-basic">
                                <i className="fas fa-bars"></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item className="cm-add-btn" onClick={() => this.props.openCrudModal()}>
                                    <i className={FontAwesomeClasses.add} /><span className="cm-padding-left-10">Add</span>
                                </Dropdown.Item>
                                < Dropdown.Item  >
                                    <i className={FontAwesomeClasses.edit} /><span className="cm-padding-left-10">Edit</span>
                                </Dropdown.Item>
                                < Dropdown.Item >
                                    <i className={FontAwesomeClasses.del} /><span className="cm-padding-left-10">Delete</span>
                                </Dropdown.Item>
                                < Dropdown.Item >
                                    <i className={FontAwesomeClasses.view} /> <span className="cm-padding-left-10">View</span>
                                </Dropdown.Item>
                                < Dropdown.Item >
                                    <i className={FontAwesomeClasses.search} /> <span className="cm-padding-left-10">Search</span>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    < Col xs={6} >
                        <InputGroup className="cm-pagination-holder">
                            < Button size="sm" className="cm-footer-button cm-previous-page-btn">
                                <i className={FontAwesomeClasses.previousPage}></i>
                            </Button>
                            <div className="cm-page-number-input-holder">
                                <Form.Control className="cm-page-number-input" defaultValue="" />
                            </div>
                            < Button size="sm" className="cm-footer-button cm-next-page-btn">
                                <i className={FontAwesomeClasses.nextPage}></i>
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
