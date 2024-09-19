import express,{Request,Response} from 'express';
import { json } from 'body-parser';
import { InputRouter } from './routes/input';
import { QueryRouter } from './routes/query';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { logger } from './services/logger';
import expressWinston from 'express-winston';

const app = express();

app.use(expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  msg: "{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
  colorize: true,
}));


app.use(json());
app.use(QueryRouter);
app.use(InputRouter);

app.all('*', (req: Request, res: Response) => {
  logger.warn(`Route not found: ${req.originalUrl}`);
  throw new NotFoundError('Route not found.');
});

app.use(errorHandler);

export { app };
