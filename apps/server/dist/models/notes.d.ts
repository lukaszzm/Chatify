import mongoose from "mongoose";
export declare const Notes: mongoose.Model<{
    title: string;
    text: string;
    fromId: string;
    createdAt: Date;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    collection: string;
}>, {
    title: string;
    text: string;
    fromId: string;
    createdAt: Date;
}>>;
//# sourceMappingURL=notes.d.ts.map