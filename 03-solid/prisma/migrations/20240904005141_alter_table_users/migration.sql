/*
  Warnings:

  - You are about to drop the column `password` on the `tb_users` table. All the data in the column will be lost.
  - Added the required column `password_hash` to the `tb_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_users" DROP COLUMN "password",
ADD COLUMN     "password_hash" TEXT NOT NULL;
