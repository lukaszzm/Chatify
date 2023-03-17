import mongoose from "mongoose";
export declare const Users: mongoose.Model<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profileImage?: string | undefined;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    collection: string;
}>, {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profileImage?: string | undefined;
}>>;
//# sourceMappingURL=users.d.ts.map