import { describe, expect, it } from "vitest";

import { executeQuery } from "./executeQuery";

describe("executeQuery", () => {
  it("returns the rows of a database the user owns", async () => {
    const rows = await executeQuery(
      { sql: "select * from customers", databaseId: "db_acme" },
      { id: "user_alice", email: "alice@acme.test" },
    );

    expect(rows).toHaveLength(2);
  });
});
