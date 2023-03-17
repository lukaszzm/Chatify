import mongoose from "mongoose";
export declare const Messages: mongoose.Model<{
    text: string;
    fromId: string;
    createdAt: Date;
    toId: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    collection: string;
}>, {
    text: string;
    fromId: string;
    createdAt: Date;
    toId: string;
}>>;
//# sourceMappingURL=messages.d.ts.map