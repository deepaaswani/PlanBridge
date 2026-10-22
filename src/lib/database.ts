import "server-only";
import mongoose, { type Connection } from "mongoose";
import { getConfig } from "@/lib/config";
import { getModels } from "@/modules/auth/models";

const globalDatabase = globalThis as typeof globalThis & {
  planbridgeDatabase?: Promise<Connection>;
};

export async function database() {
  if (!globalDatabase.planbridgeDatabase) {
    globalDatabase.planbridgeDatabase = (async () => {
      const connection = await mongoose
        .createConnection(getConfig().MONGODB_URI, {
          maxPoolSize: 10,
          serverSelectionTimeoutMS: 5000,
          autoIndex: false,
        })
        .asPromise();
      try {
        for (const model of Object.values(getModels(connection))) {
          await model.createCollection();
          await model.createIndexes();
        }
        return connection;
      } catch (error) {
        await connection.close();
        throw error;
      }
    })().catch((error: unknown) => {
      globalDatabase.planbridgeDatabase = undefined;
      throw error;
    });
  }
  return globalDatabase.planbridgeDatabase;
}

export async function closeDatabase() {
  const connection = await globalDatabase.planbridgeDatabase;
  globalDatabase.planbridgeDatabase = undefined;
  await connection?.close();
}

export async function repository() {
  return getModels(await database());
}
