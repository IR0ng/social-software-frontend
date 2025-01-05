import Joi from 'joi'

export const postSchema = Joi.object({
  title: Joi.string().min(1).max(20).required(),
  content: Joi.string().min(1).max(500).required(),
}).messages({
  'string.empty': '*',
  'string.min': '長度小於{#limit}',
  'string.max': '長度大於{#limit}',
})
