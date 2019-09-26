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
import * as FontAwesomeClasses from './FontAwesomeClasses'
import './tableFooter.css'

class LgTableFooterComponent extends Component<TableFooterProps, TableFooterState>{
    constructor(props: TableFooterProps) {
        super(props);
        this.state = {};
    }


    render = () => {
        let buttonStyle = { borderRadius: 0, margin: 1 };
        return (
            <Row className="cm-table-footer cm-table-footer-lg">
                <Col xs={4} style={{ textAlign: "left" }}>
                    <Button className="cm-add-btn cm-footer-button" size="sm" onClick={() => this.props.openCrudModal()}>
                        <i className={FontAwesomeClasses.add} />
                    </Button>
                    < Button size="sm" className="cm-edit-btn cm-footer-button">
                        <i className={FontAwesomeClasses.edit} />
                    </Button>
                    < Button size="sm" className="cm-del-btn cm-footer-button">
                        <i className={FontAwesomeClasses.del} />
                    </Button>
                    < Button size="sm" className="cm-view-btn cm-footer-button">
                        <i className={FontAwesomeClasses.view} />
                    </Button>
                    < Button size="sm" className="cm-search-btn cm-footer-button">
                        <i className={FontAwesomeClasses.search} />
                    </Button>
                </Col>
                < Col xs={4} >
                    <InputGroup className="cm-pagination-holder" >
                        < Button size="sm" className="cm-footer-button">
                            <i className={FontAwesomeClasses.firstPage} />
                        </Button>
                        < Button size="sm" className="cm-footer-button">
                            <i className={FontAwesomeClasses.previousPage} />
                        </Button>
                        <div style={{ display: 'inline-block' }}>
                            <Form.Control className="border-radius-0" style={{ height: 31, margin: 1, padding: 2, width: 50 }} />
                        </div>
                        < Button size="sm" className="cm-footer-button">
                            <i className={FontAwesomeClasses.nextPage} />
                        </Button>
                        < Button size="sm" className="cm-footer-button">
                            <i className={FontAwesomeClasses.lastPage} />
                        </Button>
                    </InputGroup>
                </Col>
                < Col xs={4} style={{ textAlign: "right" }}>
                    <Button>{"<"} </Button>
                    < Button > {">"} </Button>
                </Col>
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

export default connect<TableFooterStateProps, TableFooterDispatchProps, TableFooterOwnProps, AppState>(mapStateToProps, mapDispatchToProps)(LgTableFooterComponent);

// export default Footer;
