/**
 * Copyright (c)  Appblocks and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { shared, functions } from "../../index.js";

// Simple test request handler
const requestHandler = async (req, res) => {
  /**
   * This sdk function will read export data from shared-fns folder index inside function folder
   * (for testing, it also reads shared-fns folder in relative path)
   */
  // const customSharedDirectory = [
  //   "/sample_utils",
  // ];

  const sharedData = await shared.getShared();

  res.writeHead(200, "Content-Type", "application/json");
  res.write(JSON.stringify({ message: "sample request handler", sharedData }));
  return "sample request handler";
};

try {
  // Run the function handler
  functions.run(requestHandler);
} catch (error) {
  console.log(error.message);
}
