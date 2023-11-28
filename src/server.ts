import "dotenv/config";

import connectDB from "./config/db";
import createServer from "./utils/createServer";
import swaggerDocs from "./utils/swagger";
import logger from "./utils/logger";
import { errorHandler, notFoundHandler } from "./middlewares/errors";

const app = createServer();

const PORT = process.env.PORT || 8000;

swaggerDocs(app, PORT);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, async () => {
  logger.info(`App is running at http://localhost:${PORT}`);

  await connectDB();
});
