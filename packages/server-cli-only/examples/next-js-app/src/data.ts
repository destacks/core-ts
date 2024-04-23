import "server-cli-only";

export const getSomeServerCliOnlyData = (): Promise<string> => {
  return Promise.resolve("some server cli only data");
};
