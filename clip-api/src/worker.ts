import { Hono } from 'hono'

type Bindings = {
	DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get("/api/beverages", async (c) => {
	try {
		const { results } = await c.env.DB.prepare("SELECT * FROM Customers WHERE CompanyName = ?").bind("Bs Beverages").all()
		return c.json(results)
	} catch (e) {
		return c.json({ err: e }, 500)
	}
})
app.get("*", (c) => c.json("Call /api/beverages to see everyone who works at Bs Beverages"))

export default app
