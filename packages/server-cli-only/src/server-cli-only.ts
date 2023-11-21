"use strict";

/**
 * `server-cli-only` restricts imports to Next.js server components or CLI scripts.
 *
 * Installation: `npm install server-cli-only`
 *
 * Usage: In module, at the start (`import "server-cli-only";`). For CLI, set `RUNNING_IN_CLI=true`.
 *
 * CAUTION: Use `RUNNING_IN_CLI=true` only in CLI contexts to prevent unintended behavior.
 *
 * License: MIT.
 *
 * More info: https://github.com/destacks/core-ts/packages/server-cli-only
 */

// Function to check if it's a Next.js server component
function isServerComponent() {
  try {
    require("server-only");
    return true;
  } catch (e) {
    return false;
  }
}

// Function to check if it's a CLI environment
function isCliEnvironment() {
  return process.env.RUNNING_IN_CLI === "true";
}

// Throw an error if it's not a Next.js server component or CLI environment
if (!isServerComponent() && !isCliEnvironment()) {
  throw new Error("This module is not allowed in Next.js client components");
}
