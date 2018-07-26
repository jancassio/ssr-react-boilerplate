import * as React from 'react';
import { StaticRouter } from 'react-router';
import App from '../../shared/components/App';

interface Props {
  context: {};
  url: string;
}

export default class Root extends React.Component<Props, {}> {
  public render() {
    const { context, url } = this.props;

    return (
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    );
  }
}
