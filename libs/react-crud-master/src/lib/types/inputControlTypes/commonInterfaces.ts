import { IRowData } from '../../components/crudModal/crudModal.types';
import { ColModel } from '../colModel/colModel';

export interface InputControlType extends CommonInputTypeConfigProps {
    inputType: string,
    render(rowData: IRowData,
        column: ColModel,
        onRowDataChange: (name: string, value: any) => void): JSX.Element
}

export interface CommonInputTypeConfigProps {
    controlLabel?: string
}