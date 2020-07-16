import React from "react";
import { StaticRouter } from "react-router";

import App from "../../shared/components/App";

type Props = {
  context: {};
  url: string;
};

export default function Root(props: Props) {
  const { context, url } = props;

  return (
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>
  );
}
