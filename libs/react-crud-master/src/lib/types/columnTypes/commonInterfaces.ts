import { CreateMode, ColModel } from '../colModel/colModel';

export interface IColumnType {
  name: string,
  show: boolean,
  render(colModel: ColModel, dataRow: any, index: any): JSX.Element;
}
