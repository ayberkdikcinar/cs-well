export const MAX_KEY_LENGTH = 200;

export const validationMessages = {
  keyRequiredBody: 'Key must be provided in the request body.',
  keyRequiredParam: 'Key must be provided as a query string paramater. (?key="<key-value>").',
  keyString: 'Key must be a string',
  keyTooLong: `Key is too long. Max:(${MAX_KEY_LENGTH})`,
};

