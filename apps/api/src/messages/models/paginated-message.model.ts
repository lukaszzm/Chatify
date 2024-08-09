import { ObjectType } from "@nestjs/graphql";

import { Paginated } from "@/common/models/paginated.model";
import { Message } from "@/messages/models/message.model";

@ObjectType("MessageConnection")
export class PaginatedMessage extends Paginated(Message) {}
