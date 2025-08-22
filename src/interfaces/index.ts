export type status = "active" | "inactive";
export type uom = "pc" | "kg" | "box";

export interface ResponseProps {
  status: number;
  message: string;
  token?: string;
  data?: any;
}
