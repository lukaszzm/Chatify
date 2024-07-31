import { registerEnumType } from "@nestjs/graphql";

export enum ChatType {
  OneToOne = "ONE_TO_ONE",
  Group = "GROUP",
}

registerEnumType(ChatType, {
  name: "ChatType",
});
