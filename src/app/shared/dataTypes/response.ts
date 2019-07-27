export interface IResponse {
  statusCode: number;
  Message: string;
  dateTime: Date | number;
  data: object | number | any;
}
