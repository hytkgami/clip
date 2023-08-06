CREATE TABLE IF NOT EXISTS articles (
	id TEXT NOT NULL PRIMARY KEY,
	title TEXT NOT NULL,
	url TEXT NOT NULL UNIQUE,
	created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
	updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
);
