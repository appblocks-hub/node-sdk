/**
 * Copyright (c)  Appblocks and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import "./dotenv.js";
import axios from "axios";

/**
 * Function to get port passed as --port argument flag
 * @returns port value
 */
export const getArgPortFlag = () => {
  return process.argv
    .find((arg) => arg.includes("--port="))
    ?.replace("--port=", "");
};

/**
 * Funciton to get port
 * @param {*} functionName
 * @returns
 */
export const getPort = async (functionName) => {
  try {
    const {
      AB_EMULATOR_URL,
      AB_EMULATOR_INITIALISED,
      FUNCTION_ENV,
      FUNCTION_PORT,
    } = process.env;

    // Return FUNCTION_PORT from env if production environment
    if (FUNCTION_ENV === "AB_PROD_FUNCTION") return FUNCTION_PORT;

    // Get port from argument flag
    const argPortFlag = getArgPortFlag();

    // Return port from flag if port is passed as --port=PortValue argument
    if (argPortFlag) return argPortFlag;

    // Check if emulator is initialized else exit app
    if (AB_EMULATOR_INITIALISED !== "INIT") {
      throw new Error(
        "Please start appblocks emulator before running the block. Or use --port=PortValue argument"
      );
    }

    // Get and return port from emulator
    console.log("=== Requesting to AB_EMULATOR_URL to get free port == ");
    const response = await axios.post(
      `${AB_EMULATOR_URL}/?functionName=${functionName}`
    );
    return response.data.port;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
