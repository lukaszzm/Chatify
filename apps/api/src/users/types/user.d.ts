import type { InferInsertModel } from "drizzle-orm";

import type { users } from "@/drizzle/schema";

export type CreateUserData = Omit<InferInsertModel<typeof users>, "fullName">;
