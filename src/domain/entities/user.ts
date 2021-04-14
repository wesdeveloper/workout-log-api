import Joi from 'joi';
import { HelperValidatiorResult, validateObject } from '../../utils/helper-validations';

export const createUserData = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().min(0).required(),
  nickName: Joi.string(),
  weight: Joi.number(),
  height: Joi.number(),
  gender: Joi.string().valid('M', 'F').required(),
});

export interface User {
  id: number
  name: string
  lastName: string
}

export class User implements User {
  static validateCreateUserData = (userData: object): HelperValidatiorResult => validateObject(userData, createUserData);
}
