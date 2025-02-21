import jwt from 'jsonwebtoken';
import constants from "../constants.js"
import { ApiResponse } from './ApiResponse.js';

const tokenGenerate = (data) => {
  const token = jwt.sign({
    UserId: data.UserId,
    MobileNo: data.MobileNo,
    email: data.email
  },
    constants.JWT_SECRET_KEY
    // {
    //     expiresIn:'2h'
    // }
  );

  return token;
}

export { tokenGenerate }