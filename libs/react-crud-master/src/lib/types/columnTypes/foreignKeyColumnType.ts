import { IColumnType } from './commonInterfaces'
import { ColumnTypeNames } from '../../constants/columnTypeNames'
import { CreateMode } from '../colModel/colModel';
import { InputControlTypes } from '../..';

export interface ForeignKeyOptions {
    show?: boolean;
    valueColumnName: string
    options?: [string | number, string][]
    optionsUrl?: string,
    valueWithDependenciesUrl?: string,
    dependencies?: ForeignKeyDependency[]
}
export class ForeignKey implements IColumnType, ForeignKeyProps {
    show: boolean = false;
    valueColumnName: string;
    options?: [string, string][]
    optionsUrl?: string
    dependencies?: ForeignKeyDependency[]
    valueWithDependenciesUrl?: string

    get name() { return ColumnTypeNames.FOREIGN_KEY }

    constructor(config: ForeignKeyOptions) {
        Object.assign(this, config);
    }
}

export interface ForeignKeyProps {
    show: boolean;
    valueColumnName: string
    options?: [string | number, string][]
    optionsUrl?: string
    dependencies?: ForeignKeyDependency[]
    valueWithDependenciesUrl?: string
}

////////////////////

export interface ForeignKeyDependencyProps {
    options: [string | number, string][]
    optionsUrl: string
    dependency: ForeignKeyDependency
}

export class ForeignKeyDependency implements ForeignKeyDependencyProps {
    dependency: ForeignKeyDependency;
    options: [string | number, string][];
    optionsUrl: string;

    constructor(config: Partial<ForeignKeyDependencyProps>) {

        Object.assign(this, config);
    }
}