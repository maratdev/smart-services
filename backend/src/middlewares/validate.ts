import { ZodType } from 'zod';
import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';

export function validate({
     body,
     query,
     params
   }: {
  body?: ZodType;
  query?: ZodType;
  params?: ZodType;
}) {
	return (req: Request, res: Response, next: NextFunction) => {
		if (body) {
			const result = body.safeParse(req.body);
			if (!result.success) {
				return res.status(StatusCodes.BAD_REQUEST).json({error: result.error.issues});
			}
		}
		if (query) {
			const result = query.safeParse(req.query);
			if (!result.success) {
				return res.status(StatusCodes.BAD_REQUEST).json({error: result.error.issues});
			}
		}
		if (params) {
			const result = params.safeParse(req.params);
			if (!result.success) {
				return res.status(StatusCodes.BAD_REQUEST).json({error: result.error.issues});
			}
		}
		next();
	};
}
