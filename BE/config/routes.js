const express = require("express");
const controllers = require("../app/controllers");

const apiRouter = express.Router();

/**
 * TODO: Implement your own API
 *       implementations
 */
  apiRouter.get("/api/v1/cars", controllers.api.v1.cars.list);
  apiRouter.post("/api/v1/cars", controllers.api.v1.cars.create);
  apiRouter.put("/api/v1/cars/:id", controllers.api.v1.cars.update);
  apiRouter.get("/api/v1/cars/:id", controllers.api.v1.cars.show);
  apiRouter.delete(
    "/api/v1/cars/:id",
    controllers.api.v1.cars.destroy
  );
  apiRouter.post("/api/v1/register", controllers.api.v1.auth.register);
  apiRouter.post("/api/v1/login", controllers.api.v1.auth.login);

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});




module.exports = apiRouter;
