/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,name]` on the table `skill` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "project_userId_title_key" ON "project"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "skill_userId_name_key" ON "skill"("userId", "name");
