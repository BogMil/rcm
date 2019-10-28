import React, { } from "react";

import '../reactCrudMaster/reactCrudMaster.css'

import SmTableFooter from './smTableFooter'
import LgTableFooter from './lgTableFooter';
import { TableFooterOwnProps } from './tableFooter.types';

export default function TableFooterComponent(props: TableFooterOwnProps) {

    if (props.tableWidth < 620)
        return <SmTableFooter />;

    return <LgTableFooter />
}