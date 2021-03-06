import { CreateMode, ColModel } from '../colModel/colModel';
import { InputControlType } from '../inputControlTypes/commonInterfaces';

export interface IColumnType {
  name: string,
  show: boolean,
  render(colModel: ColModel, dataRow: any, index: any): JSX.Element;
  defaultInputControl(): InputControlType;
}
