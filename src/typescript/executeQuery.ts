import { db } from "./database";

export type Query = {
  sql: string;
  databaseId: string;
};

export async function executeQuery(query: any, user: any) {
  if (!query.sql) throw new Error("invalid");

  const database = await db.databases.find(query.databaseId);

  if (!database) {
    throw new Error("not found");
  }

  if (database.userId !== user.id) {
    throw new Error("unauthorized");
  }

  try {
    const result = await database.execute(query.sql);

    await db.logs.insert({
      userId: user.id,
      query: query.sql,
      result,
      date: new Date(),
    });

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
