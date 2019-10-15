import { IRowData } from '../crudModal.types';
import { ColModel } from '../../../types/colModel';

export interface InputControlState {

}

export const initialState = () => {
    return {

    } as InputControlState
}

export interface InputControlOwnProps {
    // colModelsProp:ColModel[]
    isInCreateMode: boolean,
    rowData: IRowData,
    column: ColModel,
    onRowDataChange: (name: string, value: any) => void
}

// export interface IRowData {
//     [key: string]: any | null;
// }

export type InputControlProps = InputControlOwnProps

