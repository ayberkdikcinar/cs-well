import { app } from './app';
import { logger } from './config/logger';
const start = () => {
    app.listen(9000, () => {
      logger.info(`Listening on port 9000`);
    });
};

start();
