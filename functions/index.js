/**
 * Copyright (c)  Appblocks and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import http from "http";
import { getPort } from "./utils.js";
import { isValidFunction } from "../utils.js";
/**
 * Run function that will run server for user handler funciton
 * @param {*} handler user request handler
 */
const run = async (handler) => {
  if (!isValidFunction(handler)) {
    throw new Error("invalid handler passed");
  }

  /**
   * Set port
   */
  const handlerFuncitonName = handler.name;
  const port = await getPort(handlerFuncitonName);

  /**
   * Simple http server that passes request to handler
   */
  const server = http.createServer(async (req, res, next) => {
    try {
      console.log(" === Got a server request  === ");

      // for health check
      if (!req.params) req.params = {};
      req.params["health"] = req.url?.includes("health") ? "health" : "";

      // pass request data to handler
      await handler(req, res, next);
    } catch (error) {
      // Handle unhandled error from invoked custom handler
      res.writeHead(500, "Content-Type", "application/json");
      const errResponse = {
        message: "Something went wrong",
        errorMessage: error.message,
        error,
      };
      res.write(JSON.stringify(errResponse));
    } finally {
      // End response
      res.end();
    }
  });

  /**
   * Listen to Sever
   */
  server.listen(parseInt(port, 10), () => {
    console.log(
      `**** INVOKED FUNCTION ${handlerFuncitonName} **** RUNNING AT ${port}`
    );
  });
};

export default { run };
