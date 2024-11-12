//postgresql://Eco_owner:************@ep-green-sky-a5zmgwu8.us-east-2.aws.neon.tech/Ecoto?sslmode=require
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });