/**
 * Copyright (c)  Appblocks and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { functions } from "../../index.js";

// Simple test request handler
const requestHandler = (req, res, next) => {
  res.writeHead(200, "Content-Type", "application/json");
  res.write(JSON.stringify({message: "sample request handler"}));
  return "sample request handler";
};

// Run the function handler
functions.run(requestHandler);
