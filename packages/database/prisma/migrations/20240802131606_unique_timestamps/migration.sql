/*
  Warnings:

  - A unique constraint covering the columns `[createdAt]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[updatedAt]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[createdAt]` on the table `Message` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[updatedAt]` on the table `Message` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[createdAt]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[updatedAt]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Chat_createdAt_key" ON "Chat"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Chat_updatedAt_key" ON "Chat"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Message_createdAt_key" ON "Message"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Message_updatedAt_key" ON "Message"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "User_createdAt_key" ON "User"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "User_updatedAt_key" ON "User"("updatedAt");
