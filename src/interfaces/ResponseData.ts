import ShowOnDb from './ShowOnDb';

export default interface ResponseData {
  message: string,
  status: number,
  data?: ShowOnDb,
};

