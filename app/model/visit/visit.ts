import { IDate } from "../common/date";

export interface IVisit {

  readonly id: number;

  readonly customerID: number;
  /*@observable*/ readonly date: IDate;

}