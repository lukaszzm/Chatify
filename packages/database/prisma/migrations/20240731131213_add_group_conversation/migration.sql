-- CreateEnum
CREATE TYPE "ConversationType" AS ENUM ('ONE_TO_ONE', 'GROUP');

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "type" "ConversationType" NOT NULL DEFAULT 'ONE_TO_ONE';

-- CreateTable
CREATE TABLE "GroupChat" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,

    CONSTRAINT "GroupChat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GroupChat_chatId_key" ON "GroupChat"("chatId");

-- AddForeignKey
ALTER TABLE "GroupChat" ADD CONSTRAINT "GroupChat_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
