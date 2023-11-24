if (
  typeof process === "undefined" ||
  typeof process.env === "undefined" ||
  process.env.RUNNING_IN_CLI !== "true"
) {
  throw new Error(
    "This module is not allowed in React Client Components. " +
      "If you want to use it on the CLI, set RUNNING_IN_CLI=true on script run."
  );
}
