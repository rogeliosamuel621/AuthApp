import { rest } from 'msw';

export const handlers = [
  rest.post('/register', (req, res, ctx) => {
    return res(ctx.status(400));
  }),
];
