import { eq } from "drizzle-orm";
import * as schema from "../database/schema";
import { useDB } from "../database";

export const useCredential = () => {
  const db = useDB();

  async function saveCredential(
    credential: typeof schema.credentials.$inferInsert
  ) {
    await db.insert(schema.credentials).values({
      userId: Number(credential.userId),
      id: credential.id,
      publicKey: credential.publicKey,
      counter: credential.counter,
      backedUp: credential.backedUp,
      transports: credential.transports,
    });
  }

  async function findCredentialById(id: string) {
    const credential = await db.query.credentials.findFirst({
      where: eq(schema.credentials.id, id),
      with: {
        user: true,
      },
    });

    if (!credential) return null;

    return {
      ...credential,
      transports: credential.transports || [],
      user: credential.user,
    };
  }

  async function findCredentialsByUserId(userId: string | number) {
    const credentials = await db.query.credentials.findMany({
      where: eq(schema.credentials.userId, Number(userId)),
    });
    return credentials.map((credential) => ({
      ...credential,
      transports: credential.transports || [],
    }));
  }

  async function updateCredentialCounter(id: string, counter: number) {
    await db
      .update(schema.credentials)
      .set({ counter })
      .where(eq(schema.credentials.id, id));
  }

  return {
    saveCredential,
    findCredentialById,
    findCredentialsByUserId,
    updateCredentialCounter,
  };
};
