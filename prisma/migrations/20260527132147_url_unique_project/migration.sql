/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "project_url_key" ON "project"("url");
