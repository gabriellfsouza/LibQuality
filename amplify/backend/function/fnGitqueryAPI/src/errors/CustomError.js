/** @class */
class CustomError extends Error {
  /**
   * @param {{message:(String|Object),code:Number}} param0
   */
  constructor({ message, code }) {
    const msg = typeof message === 'string' ? message : message.message;
    super(msg);
    Object.assign(this, { message, code });
  }
}

global.CustomError = CustomError;
module.exports = CustomError;
