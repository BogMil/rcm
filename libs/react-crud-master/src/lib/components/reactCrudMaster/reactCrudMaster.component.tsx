import React, { Component } from "react";
import {
    Card, Row, Col
} from "react-bootstrap";
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu'
// import '../contexMenu.css';
import './reactCrudMaster.css';

import TableFooter from "../tableFooter/tableFooter.component"
import { connect } from 'react-redux'
import { ReactCrudMasterProps, ReactCrudMasterState, initialState, ReactCrudMasterStateProps, ReactCrudMasterDispatchProps, ReactCrudMasterOwnProps } from "./reactCrudMaster.types";
import { ColModel, ColModelMethodsExtractor } from "../../types/colModel";
import { AppState } from '../../rootReducer'
import * as ReactCrudMasterActions from './reactCrudMaster.actions'
import TableHeader from '../tableHeader/tableHeader.component'
import TableBody from '../tableBody/tableBody.component'
import CrudModal from '../crudModal/crudModal.component'
import VModal from '../vModal/vModal.component'
import ColMenuModal from '../colMenuModal/colMenuModal.component'
import ContextMenuModal from '../contextMenuModal/contextMenuModal.component'
import * as TextSelection from '../../utils/textSelection'
import WarningModal from '../common/modals/warningModal/warningModal.component'
import YesnoModal from '../common/modals/yesnoModal/yesnoModal.component'
import axios from 'axios';

import { ThunkDispatch } from "redux-thunk";

class ReactCrudMasterComponent extends Component<ReactCrudMasterProps, ReactCrudMasterState>{
    constructor(props: ReactCrudMasterProps) {
        super(props);
        this.state = initialState();
    }

    componentDidMount = () => {

        this.props.setColModels(this.props.colModelsProp);
        if(this.props.urlProp){
            axios({
                method: 'get',
                url: this.props.urlProp
            }).then((res)=>{
                console.log(res);
                this.props.setData(res.data.records);
            });
        }else if(this.props.dataProp){
            this.props.setData(this.props.dataProp);
        }
        this.props.resetTableoffsetWidth();

        if (this.props.tableTitle != null)
            this.props.setTableTitle(this.props.tableTitle);
        else
            this.props.setTableTitle('Table title');


        this.onMouseUp();
        this.onMouseMove();

        window.addEventListener("resize", this.props.resetTableoffsetWidth);
    };

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.props.resetTableoffsetWidth);
    };

    onMouseMove = () => {
        document.getElementById(`CMID-${this.props.RCMID}`)!.addEventListener("mousemove", (e: MouseEvent) => {
            if (this.props.columnToResize != null) {
                document.body.style.cursor = 'col-resize'
                this.props.resizeColumn(e);
            }
        });
    }

    onMouseUp = () => {
        document.getElementById(`CMID-${this.props.RCMID}`)!.addEventListener("mouseup", () => {
            if (this.props.columnToResize == null)
                return;

            this.props.setColumnToResize();
            TextSelection.enableTextSelectionOnPage();
            document.body.style.cursor = ''
            this.forceUpdate()
        });
    }


    render() {
        let colModelsMethods = this.props.colModelsProp.map(colModel => {
            return ColModelMethodsExtractor.extractFromColModel(colModel);
        })
        return (
            <>
                <Card className='react-crud-master' id={`CMID-${this.props.RCMID}`}>
                    <Card.Header className='cm-table-header' as="h5" >{this.props.tableTitleProp}</Card.Header>
                    <Card.Body className='cm-table-body'>
                        <div id={`reactable-card-body-${this.props.RCMID}`} className="cm-table-header-and-table-body-holder">
                            <TableHeader />
                            <TableBody />
                        </div>

                        <div className='cm-table-footer-holder' >
                            <TableFooter tableWidth={this.props.width} />
                        </div>
                    </Card.Body>
                </Card>

                <CrudModal colModelsMethods={colModelsMethods} />
                <VModal />

                <ColMenuModal />
                <ContextMenuModal />

                <WarningModal />
                <YesnoModal />
            </>
        );}    
    }
        
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): ReactCrudMasterDispatchProps => {
    return {
        setColModels: (colModels: ColModel[]) => dispatch(ReactCrudMasterActions.setColModels(colModels)),
        setData: (data: any[]) => dispatch(ReactCrudMasterActions.setData(data)),
        resizeColumn: (e: MouseEvent) => dispatch(ReactCrudMasterActions.resizeColumn(e)),
        setColumnToResize: (column: (ColModel | null) = null, startOffset: (number | null) = null) => dispatch(ReactCrudMasterActions.setColumnToResize(column, startOffset)),
        resetTableoffsetWidth: () => dispatch(ReactCrudMasterActions.resetTableoffsetWidth()),
        setTableTitle: (tableTitle:string) => dispatch(ReactCrudMasterActions.setTableTitle(tableTitle)),
    };
}
        
const mapStateToProps = (state: AppState): ReactCrudMasterStateProps => {
    return {
        columnToResize: state.reactCrudMaster.columnToResize,
        RCMID: state.reactCrudMaster.RCMID,
        width: state.reactCrudMaster.width,
        tableTitleProp:state.reactCrudMaster.tableTitleProp
    } as ReactCrudMasterStateProps;
}
        
export default connect<
    ReactCrudMasterStateProps,
    ReactCrudMasterDispatchProps,
    ReactCrudMasterOwnProps,
    AppState>
    (mapStateToProps, mapDispatchToProps)(ReactCrudMasterComponent);
