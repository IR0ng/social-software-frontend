import Joi from 'joi'

export const signUpSchema = Joi.object({
  userName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string().min(8).max(30).required(),
  avatar: Joi.string(),
  gender: Joi.string().valid('0', '1', '2').required(),
  introduction: Joi.string().min(1).max(1000).required(),
}).messages({
  'any.only': '*',
  'string.empty': '*',
  'string.email': '信箱格式錯誤',
  'string.min': '長度小於{#limit}',
  'string.max': '長度大於{#limit}',
})
