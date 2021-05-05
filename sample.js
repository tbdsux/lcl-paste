const Joi = require('joi');

const t = new Date().getTime();

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

  repeat_password: Joi.ref('password'),

  access_token: [Joi.string(), Joi.number()],

  birth_year: Joi.number().integer().min(1900).max(2013),

  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});

// console.log(schema.validate({ username: 'abc', birth_year: 1994 }));
// // -> { value: { username: 'abc', birth_year: 1994 } }

// console.log(schema.validate({ username: '123' }));
// -> { value: {}, error: '"username" is required' }

// Also -

async function v() {
  try {
    const value = await schema.validateAsync({ birth_year: 1994 });
    const another = await schema.validateAsync({ username: '123' });

    console.log(value);
    console.log(another);
  } catch (err) {
    console.log(err);
  }
}
v();

console.log(new Date().getTime() - t);
