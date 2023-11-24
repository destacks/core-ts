async function importReactModules() {
  if (process.env.RUNNING_IN_CLI === "true") {
    const { createClient, createSql } = await import("../dist/react.js");
    console.log(
      "React Server Modules can be imported:",
      createClient.name,
      createSql.name
    );
  } else {
    throw new Error("Environment variable not set");
  }
}

describe("React Implementation Behavior", () => {
  it("should do nothing in a node environment with RUNNING_IN_CLI=true", async () => {
    process.env.RUNNING_IN_CLI = "true";
    await expect(importReactModules()).resolves.toBeUndefined();
    delete process.env.RUNNING_IN_CLI;
  });

  it("should throw an error if no environment variable is set", async () => {
    await expect(async () => {
      await importReactModules();
    }).rejects.toThrow("Environment variable not set");
  });
});
