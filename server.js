import fs from 'node:fs/promises';
import express from 'express';
import https from 'https';

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

// Cached production assets
const templateHtml = isProduction
	? await fs.readFile('./dist/client/index.html', 'utf-8')
	: '';

const ssrManifest = isProduction
	? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
	: undefined;

// Create http server
const app = express();

// Add Vite or respective production middlewares
let vite;

if (!isProduction) {
	const { createServer } = await import('vite');
	vite = await createServer({
		server: { middlewareMode: true },
		appType: 'custom',
		base,
	});
	const { authMiddleware } = await vite.ssrLoadModule(
		'/src/services/AuthenticationService.ts'
	);

	app.use(vite.middlewares);
	app.use(authMiddleware);
} else {
	const compression = (await import('compression')).default;
	const sirv = (await import('sirv')).default;
	const { authMiddleware } = await import('./dist/server/entry-server.js');

	app.use(compression());
	app.use(base, sirv('./dist/client', { extensions: [], gzip: true }));
	app.use(authMiddleware);
}

// Serve HTML
app.use('*', async (req, res) => {
	try {
		if (req.originalUrl === '/favicon.ico') {
			return res.sendFile(path.resolve('./public/DW.png'));
		}

		let template, render;

		if (!isProduction) {
			// Always read fresh template in development
			template = await fs.readFile('./index.html', 'utf-8');
			template = await vite.transformIndexHtml(req.originalUrl, template);
			render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
		} else {
			template = templateHtml;
			render = (await import('./dist/server/entry-server.js')).render;
		}

		const rendered = await render({ path: req.originalUrl }, ssrManifest);

		const html = template
			.replace(`<!--app-head-->`, rendered.head ?? '')
			.replace(`<!--app-html-->`, rendered.html ?? '');

		res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
	} catch (e) {
		vite?.ssrFixStacktrace(e);
		console.log(e.stack);
		res.status(500).end(e.stack);
	}
});

if (isProduction)
	https
		.createServer(
			{
				key: await fs.readFile('/certs/server.key'),
				cert: await fs.readFile('/certs/server.crt'),
			},
			app
		)
		.listen(port, () => {
			console.log(`Server started at https://localhost:${port}`);
		});
else
	app.listen(port, () => {
		console.log(`Server started at http://localhost:${port}`);
	});
