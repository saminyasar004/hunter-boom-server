export type status = "active" | "inactive";

export interface ResponseProps {
  status: number;
  message: string;
  data?: any;
}
