import { Request, Response, Router } from 'express';
import { formatKey } from '../utils/format-key';
import { body } from 'express-validator';
import { incrementKeyCount } from '../storage/key-map';
import { requestValidation } from '../middlewares/request-validation';
import { MAX_KEY_LENGTH, validationMessages } from '../constants/validation-messages';

const router = Router();

router.post(
  '/input',
  [
    body('key')
      .notEmpty()
      .withMessage(validationMessages.keyRequiredBody)
      .isString()
      .withMessage(validationMessages.keyString)
      .isLength({ max: MAX_KEY_LENGTH })
      .withMessage(validationMessages.keyTooLong),
  ],
  requestValidation,
  (req: Request, res: Response) => {
    const { key } = req.body;

    const formatted = formatKey(key);
    incrementKeyCount(formatted);
    return res.status(200).json({ message: 'Success' });
  }
);

export { router as InputRouter };
