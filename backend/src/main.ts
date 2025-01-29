import { logger } from "./config/logging";
import { web } from "./config/web";

web.listen(3000, () => {
  logger.info("Server is running on port 3000");
});