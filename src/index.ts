import chalk from "chalk";
import sirv from "sirv";
import { AddressInfo } from "net";
import { error, info, ok } from "../scripts/lib/logger";
import react from "./server/middlewares/react";
import { app, start } from "./server/server";

const serve = sirv("dist/public");

app.get("*", react());
app.use(serve);

const run = async () => {
  try {
    info("ℹ Starting server...");
    const server = await start();
    const { address, port } = server.address() as AddressInfo;
    ok(
      "✔ Server is up and running @",
      chalk.underline(`http://${address}:${port}`)
    );
  } catch (err) {
    error(err);
  }
};

run();
