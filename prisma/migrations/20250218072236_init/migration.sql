/*
  Warnings:

  - Made the column `PWDHash` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `PWDHash` VARCHAR(255) NOT NULL,
    MODIFY `offEmail` VARCHAR(255) NULL;
