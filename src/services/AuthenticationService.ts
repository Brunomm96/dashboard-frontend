import { NextFunction, Request, Response } from 'express';
import IAuthenticationMiddlewareRequestQuery from '../interfaces/IAuthenticationMiddlewareRequestQuery';

const authMiddleware = async (
	req: Request<
		unknown,
		unknown,
		unknown,
		IAuthenticationMiddlewareRequestQuery
	>,
	res: Response,
	next: NextFunction
) => {
	if (req.path !== '/not-allowed') {
		const { token } = req.query;

		const isAuthenticated = await hasAuth(token);

		if (!isAuthenticated) {
			res.redirect('/not-allowed');
			return;
		}
	}

	next();
};

// eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
const hasAuth = async (_token?: string) => {
	return true;
};

export { authMiddleware };
