/*
  Warnings:

  - A unique constraint covering the columns `[userId,platform]` on the table `link` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "link_userId_platform_key" ON "link"("userId", "platform");
