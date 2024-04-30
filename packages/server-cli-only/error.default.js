throw new Error(
  "[server-cli-only:error.default.js]: Module import fails for your safety. " +
    "You are trying to run it in a runtime we don't know, so we hit the breaks. " +
    "Imports of this module are only allowed in known server and edge runtimes."
);
