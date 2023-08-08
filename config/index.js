/**
 * Copyright (c)  Appblocks and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const BLOCK_TYPES = {
  PACKAGE: "package",
  UI_CONTAINER: "ui-container",
  UI_ELEMENTS: "ui-elements",
  FUNCTION: "function",
  SHARED_FUNCTION: "shared-fn",
};

export default {
  BLOCK_CONFIG_FILE_NAME: "block.config.json",
  EMULATOR_FOLDER_NAME: "._bb_/functions_emulator",
  FUNCTION_ENV_FILE_NAME: ".env.function",
  VIEW_ENV_FILE_NAME: ".env.view",
  VIEW_BLOCK_TYPES: ["ui-container", "ui-elements"],
  BLOCK_TYPES,
};
