import React, { Component } from "react";
import * as Redux from 'redux'
import {
    Form,
    Button,
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
                        < Button size="sm" className="cm-footer-button cm-first-page-btn">
                            <i className={FontAwesomeClasses.firstPage} />
                        </Button>
                        < Button size="sm" className="cm-footer-button cm-previous-page-btn">
                            <i className={FontAwesomeClasses.previousPage} />
                        </Button>
                        <div className="cm-page-number-input-holder">
                            <Form.Control className="cm-page-number-input" defaultValue="" />
                        </div>
                        < Button size="sm" className="cm-footer-button cm-next-page-btn">
                            <i className={FontAwesomeClasses.nextPage} />
                        </Button>
                        < Button size="sm" className="cm-footer-button cm-last-page-btn">
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

const mapDispatchToProps = (dispatch: Redux.Dispatch<Redux.AnyAction>): TableFooterDispatchProps => {
    return {
        openCrudModal: () => dispatch(CurdModalActions.openModal()),
    };
}

const mapStateToProps = (): TableFooterStateProps => {
    return {
    } as TableFooterStateProps;
}

export default connect<TableFooterStateProps, TableFooterDispatchProps, TableFooterOwnProps, AppState>(mapStateToProps, mapDispatchToProps)(LgTableFooterComponent);

// export default Footer;
