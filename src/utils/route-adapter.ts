import { Request, Response } from 'express';

export default (controller: any) => async (req: Request, res: Response) => {
  const httpRequest = {
    body: req.body,
  };

  const { status, data } = await controller(httpRequest);

  return res.status(status).send(data);
};
