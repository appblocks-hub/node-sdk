/**
 * Copyright (c)  Yahilo. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import dotenv from "dotenv";
import path from "path";

// Path to root directory env
const getEnvPath = (options) => {
  const { dir, envFileName, relative } = options;

  const root = `${relative}/`
    .split(dir)[1]
    .replace(/(?<=\/)(.*?)(?=\/)/g, "..");

  return `${relative}${root || ""}../${envFileName}`;
};

// Setup environment
const init = () => {
  let relative = path.resolve();
  let envPath = `${relative}/.env`;

  [
    {
      dir: "functions",
      envFileName: ".env.function",
    },
    {
      dir: "._ab_em",
      envFileName: ".env.function",
    },
    {
      dir: "view",
      envFileName: ".env.view",
    },
  ].some((pathData) => {
    if (!envPath.includes(`/${pathData.dir}`)) return false;

    envPath = getEnvPath({ ...pathData, relative });
    return true;
  });

  dotenv.config({ path: envPath });
};

export default { init };
