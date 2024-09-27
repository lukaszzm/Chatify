import { cacheExchange } from "@urql/exchange-graphcache";

import type {
  CreateNoteMutation,
  DeleteNoteMutation,
  UpdateNoteMutation,
  ToggleLockMutation,
  MessageSentSubscription,
  SubscriptionMessageSentArgs,
  ChatUpdatedSubscription,
} from "@/gql/graphql";
import { TOGGLE_LOCK_FRAGMENT, UPDATE_NOTE_FRAGMENT } from "@/lib/gql/fragments";
import { NOTES_QUERY, MESSAGES_QUERY, RECENT_CHATS_QUERY } from "@/lib/gql/queries";

export const cache = cacheExchange({
  updates: {
    Mutation: {
      createNote(result: CreateNoteMutation, _args, cache) {
        cache.updateQuery({ query: NOTES_QUERY }, (data) => {
          if (!data) {
            return null;
          }

          const newEdge = {
            cursor: result.createNote.createdAt,
            node: result.createNote,
            __typename: "NoteEdge" as const,
          };

          return {
            ...data,
            notes: {
              ...data.notes,
              edges: [newEdge, ...data.notes.edges],
            },
          };
        });
      },
      deleteNote(result: DeleteNoteMutation, _args, cache) {
        cache.invalidate({ __typename: "Note", id: result.deleteNote.id });
      },
      updateNote(result: UpdateNoteMutation, _args, cache) {
        cache.writeFragment(UPDATE_NOTE_FRAGMENT, result.updateNote);
      },
      toggleLock(result: ToggleLockMutation, _args, cache) {
        cache.writeFragment(TOGGLE_LOCK_FRAGMENT, result.toggleLock);
      },
      sendMessage(_result, _args, _cache) {
        return;
      },
    },
    Subscription: {
      messageSent(
        result: MessageSentSubscription,
        args: SubscriptionMessageSentArgs,
        cache
      ) {
        cache.updateQuery(
          { query: MESSAGES_QUERY, variables: { chatId: args.chatId } },
          (data) => {
            if (!data) {
              return null;
            }

            const newEdge = {
              cursor: result.messageSent.createdAt,
              node: result.messageSent,
              __typename: "MessageEdge" as const,
            };

            return {
              ...data,
              messages: {
                ...data.messages,
                edges: [newEdge, ...data.messages.edges],
              },
            };
          }
        );
      },
      chatUpdated(result: ChatUpdatedSubscription, _args, cache) {
        let cursor;
        let query = cache.readQuery({
          query: RECENT_CHATS_QUERY,
          variables: { after: cursor },
        });

        while (query) {
          if (
            query.recentChats.edges.some((edge) => edge.node.id === result.chatUpdated.id)
          ) {
            cache.updateQuery(
              {
                query: RECENT_CHATS_QUERY,
                variables: { after: cursor },
              },
              (data) => {
                if (!data) {
                  return null;
                }

                const updatedEdges = data.recentChats.edges.filter(
                  (edge) => edge.node.id !== result.chatUpdated.id
                );
                const updatedCursor = updatedEdges.at(-1)?.cursor;

                return {
                  ...data,
                  recentChats: {
                    ...data.recentChats,
                    edges: updatedEdges,
                    pageInfo: {
                      ...data.recentChats.pageInfo,
                      endCursor: updatedCursor,
                    },
                  },
                };
              }
            );

            break;
          }

          if (cursor === query.recentChats.pageInfo.endCursor) {
            break;
          }

          cursor = query.recentChats.pageInfo.endCursor;
          query = cache.readQuery({
            query: RECENT_CHATS_QUERY,
            variables: { after: cursor },
          });
        }

        cache.updateQuery({ query: RECENT_CHATS_QUERY }, (data) => {
          if (!data) {
            return null;
          }

          const newEdge = {
            cursor: result.chatUpdated.latestMessage.createdAt,
            node: result.chatUpdated,
            __typename: "ChatPreviewEdge" as const,
          };

          return {
            ...data,
            recentChats: {
              ...data.recentChats,
              edges: [newEdge, ...data.recentChats.edges],
            },
          };
        });
      },
    },
  },
});
