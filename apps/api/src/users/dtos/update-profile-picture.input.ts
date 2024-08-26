import { Field, InputType } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload-ts";

@InputType()
export class UpdateProfilePictureInput {
  @Field(() => GraphQLUpload, { nullable: true })
  file?: Promise<FileUpload>;
}
