import { ulidFactory } from "ulid-workers";
const ulid = ulidFactory();

export const generateId = () => ulid();
