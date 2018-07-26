import * as React from 'react';

interface Props {
  children: JSX.Element | string | undefined;
}

const Html = ({ children }: Props) => (
  <html>
    <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
    <title>SSR :: React Boilerplate</title>
    </head>
    <body>
    <div role="main" id="root">
      { children }
    </div>
    <script type="text/javascript" src="./client.js" />
    </body>
  </html>
);

export default Html;
