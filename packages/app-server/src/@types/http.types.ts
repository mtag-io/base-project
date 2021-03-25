import {Request} from "express";

export interface HttpSuccess {
  success: boolean;
  message: string;
}

export interface HttpData {
  success: boolean;
  message?: string;
  data: any
}

export interface File {
  originalname: string,
  filename: string
}

export interface ExtendedRequest extends Request{
  clientToken: string;
  uploadPath: string;
}