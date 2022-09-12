/**
 * Copyright (c)  Appblocks and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import dotenv from "dotenv";
import path from "path";

const envPath = path.resolve() + "/.env";
dotenv.config({ path: envPath });
