/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { authMiddleware as serverAuthMiddleware } from './services/AuthenticationService';

import Router from './routes/Router';

interface IRenderProps {
	path: string;
}

const render = ({ path }: IRenderProps) => {
	const html = ReactDOMServer.renderToString(
		<React.StrictMode>
			<StaticRouter location={path}>
				<Router />
			</StaticRouter>
		</React.StrictMode>
	);

	return { html };
};

const authMiddleware = serverAuthMiddleware;

export { render, authMiddleware };
