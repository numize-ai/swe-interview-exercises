export type Row = Record<string, unknown>;

export interface User {
  id: string;
  email: string;
}

export interface Database {
  id: string;
  userId: string;
  execute(sql: string): Promise<Row[]>;
}

export interface QueryLog {
  userId: string;
  query: string;
  result: unknown;
  date: Date;
}

export interface Db {
  databases: { find(id: string): Promise<Database | undefined> };
  logs: { insert(log: QueryLog): Promise<void> };
}

function createDatabase(id: string, userId: string, tables: Record<string, Row[]>): Database {
  return {
    id,
    userId,
    async execute(sql) {
      const table = /\bfrom\s+"?(\w+)"?/i.exec(sql)?.[1];
      const rows = table === undefined ? undefined : tables[table];

      if (rows === undefined) {
        throw new Error(`relation does not exist: ${table ?? sql}`);
      }

      return rows;
    },
  };
}

export function createInMemoryDb(): Db & { insertedLogs: QueryLog[] } {
  const databases = [
    createDatabase("db_acme", "user_alice", {
      customers: [
        { id: 1, name: "Acme Corp", revenue: 120_000 },
        { id: 2, name: "Globex", revenue: 90_000 },
      ],
      orders: [{ id: 1, customer_id: 1, total: 4_200 }],
    }),
    createDatabase("db_initech", "user_bob", {
      customers: [{ id: 1, name: "Initech", revenue: 45_000 }],
    }),
  ];

  const insertedLogs: QueryLog[] = [];

  return {
    insertedLogs,
    databases: {
      async find(id) {
        return databases.find((database) => database.id === id);
      },
    },
    logs: {
      async insert(log) {
        insertedLogs.push(log);
      },
    },
  };
}

export const db: Db = createInMemoryDb();
