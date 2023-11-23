function importReactModules() {
  if (process.env.RUNNING_IN_CLI === "true") {
    return import("./react").then(({ createClient, createSql }) => {
      console.log("Can be imported:", createClient.name, createSql.name);
    });
  } else {
    throw new Error("Environment variable not set");
  }
}

describe("React Implementation Behavior", () => {
  it("should do nothing in a node environment with RUNNING_IN_CLI=true", async () => {
    process.env.RUNNING_IN_CLI = "true";
    await importReactModules();
    delete process.env.RUNNING_IN_CLI;
  });

  it("should throw an error if no environment variable is set", () => {
    expect(() => {
      importReactModules();
    }).toThrow("Environment variable not set");
  });
});
