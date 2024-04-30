throw new Error(
  "[server-cli-only:error.browser.js]: Module import fails for your safety. " +
    'You are trying to run it in a "browser" runtime (probably a React client component). ' +
    "However, the import of this module is only allowed in server and edge runtimes."
);
