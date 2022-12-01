/**
 * Copyright (c)  Appblocks and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import shieldConfig from "../config/shield.js";
import { callShieldServer } from "./utils.js";

const { SHIELD_URL } = shieldConfig;
const shieldUrl = process.env.SHIELD_URL || SHIELD_URL

/**
 * Function that gets user details from shield.
 * @param {Request} req http request
 * @return {Object | Error} user details /Error
 */
const getUser = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userDetails = await callShieldServer(req, `${shieldUrl}/get-user`);
      resolve(userDetails);
    } catch (error) {
      reject(error.message || error);
    }
  });
};

/**
 * Function that gets user UID from shield.
 * @param {Request} req http request
 * @return {String | Error} user id / error
 */
const getUID = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userIdRes = await callShieldServer(req, `${shieldUrl}/get-uid`);
      resolve(userIdRes.user_id);
    } catch (error) {
      reject(error.message || error);
    }
  });
};

export default { getUID, getUser };
