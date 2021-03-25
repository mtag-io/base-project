import { HttpData, HttpSuccess } from "../@types/http.types";

export const dbSuccess = (result: any): boolean => result.affected !== 0;

export const httpSuccess = (message: string): HttpSuccess => ({
  success: true,
  message
});

export const httpData = (data: any, message: string = ""): HttpData => ({
  success: true,
  message,
  data
});