import { IVisit } from "./visit";
import { IDate } from "../common/date";

export interface IVisitService {

  insertVisit(visit: IVisit): void;
  getVisitByCustomerID(customerID: number): Readonly<IVisit>;
  getVisitByDateRange(from: IDate, to: IDate): Readonly<IVisit>;


}