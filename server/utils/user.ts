import { eq } from "drizzle-orm";
import * as schema from "../database/schema";
import { useDB } from "../database";

export const useUser = () => {
  const db = useDB();
  async function findUserByEmail(email: string) {
    const user = await db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });

    if (!user) return null;

    return user;
  }

  async function findUserById(id: string | number) {
    const user = await db.query.users.findFirst({
      where: eq(schema.users.id, Number(id)),
    });

    if (!user) return null;

    return user;
  }

  async function createUser(userData: typeof schema.users.$inferInsert) {
    const [user] = await db.insert(schema.users).values(userData).returning();

    return user;
  }

  async function updateUser(
    id: string | number,
    userData: typeof schema.users.$inferInsert
  ) {
    const [user] = await db
      .update(schema.users)
      .set(userData)
      .where(eq(schema.users.id, Number(id)))
      .returning();

    return user;
  }

  return {
    findUserByEmail,
    findUserById,
    createUser,
    updateUser,
  };
};
