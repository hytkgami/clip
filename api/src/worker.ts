import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { schema } from './domain/article';
import { generateId } from './util/id';

type Bindings = {
  DB: D1Database;
};

const app = new Hono();
app.get('/ping', (c) => {
  return c.text('pong');
});

const v1 = new Hono<{ Bindings: Bindings }>();

v1.put(
  '/articles',
  validator('json', (value, c) => {
    const parsed = schema.safeParse(value);
    if (!parsed.success) {
      return c.json({ err: parsed.error }, 400);
    }
    return parsed.data;
  }),
  async (c) => {
    const body = c.req.valid('json');
    const id = generateId();
    try {
      await c.env.DB.prepare('INSERT OR REPLACE INTO articles (id, title, url) VALUES (?, ?, ?)').bind(id, body.title, body.url).run();
    } catch (error: any) {
      return c.json({ error }, 500);
    }
    return c.json({ id }, 200);
  }
);

app.route('/api/v1', v1);
export default app;
