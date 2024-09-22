import { Request, Response, Router } from 'express';
import { getKeyCount } from '../storage/key-map';
import { query } from 'express-validator';
import { requestValidation } from '../middlewares/request-validation';
import { MAX_KEY_LENGTH, validationMessages } from '../constants/validation-messages';
import { formatKey } from '../utils/format-key';

const router = Router();
 
router.get(
  '/query',
  query('key')
    .notEmpty()
    .withMessage(validationMessages.keyRequiredParam)
    .isString()
    .withMessage(validationMessages.keyString)
    .isLength({ max: MAX_KEY_LENGTH })
    .withMessage(validationMessages.keyTooLong),
  requestValidation,
  (req: Request, res: Response) => {
    const { key } = req.query;
    const count = getKeyCount(formatKey(key as string));
    return res.status(200).json({ count: count });
  }
);

export { router as QueryRouter };
