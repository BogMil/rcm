import React, { } from "react";

import '../reactCrudMaster/reactCrudMaster.css'

import SmTableFooter from './smTableFooter'
import LgTableFooter from './lgTableFooter';

export default function TableFooterComponent(props: { tableWidth: number }) {

    if (props.tableWidth < 620)
        return <SmTableFooter tableWidth={props.tableWidth} />;

    return <LgTableFooter tableWidth={props.tableWidth} />
}