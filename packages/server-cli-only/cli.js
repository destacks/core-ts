if (
  typeof process === "undefined" ||
  typeof process.env === "undefined" ||
  process.env.RUNNING_ON_CLI !== "true"
) {
  throw new Error(
    "This module is not allowed in React Client Components." +
      "If you want to use it on the CLI, set RUNNING_ON_CLI=true on script run."
  );
}
