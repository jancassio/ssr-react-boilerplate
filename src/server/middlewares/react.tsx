import { RequestHandler } from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

import Html from "../components/Html";
import Root from "../components/Root";

export default function ReactMiddleware(route?: JSX.Element): RequestHandler {
  return (req, res, next) => {
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
}
