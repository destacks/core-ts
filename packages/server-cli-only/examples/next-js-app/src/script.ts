import { getSomeServerCliOnlyData } from "./data";

(async () => {
  const data = await getSomeServerCliOnlyData();
  console.log(data + "\n");
})();
