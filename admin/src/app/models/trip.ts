export interface Trip {
  _id?: string;          // optional, in case the API returns it
  code: string;
  name: string;
  length: number;
  start: Date | string;
  resort: string;
  perPerson: number;
  image: string;
  description: string;
}

