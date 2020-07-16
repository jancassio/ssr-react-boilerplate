import { NextFunction, Request, Response } from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

import Html from "../components/Html";
import Root from "../components/Root";

export const react = (route?: JSX.Element) => (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const data = {};
  const context = {};

  const html = ReactDOMServer.renderToString(
    <Html {...data}>
      <Root url={req.url} context={context} />
    </Html>
  );

  res.status(200);
  res.send(`<!doctype html>${html}`);

  return next();
};
