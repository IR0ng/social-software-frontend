import Joi from 'joi'

export const accountSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string().min(8).max(30).required(),
}).messages({
  'string.empty': '*',
  'string.email': '信箱格式錯誤',
  'string.min': '密碼長度小於{#limit}',
  'string.max': '密碼長度大於{#limit}',
})
