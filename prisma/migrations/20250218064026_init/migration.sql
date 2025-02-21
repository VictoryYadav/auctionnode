/*
  Warnings:

  - You are about to alter the column `LangCd` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `city_id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Int` to `SmallInt`.
  - You are about to alter the column `country_code` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Int` to `SmallInt`.
  - You are about to alter the column `Gender` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `Stat` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `Role` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - Made the column `Fullname` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `MobileNo` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Password` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `PWDHash` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `offEmail` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ProfilePic` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Users_MobileNo_key` ON `users`;

-- AlterTable
ALTER TABLE `users` MODIFY `Fullname` VARCHAR(255) NOT NULL,
    MODIFY `MobileNo` VARCHAR(255) NOT NULL,
    MODIFY `Password` VARCHAR(255) NOT NULL,
    MODIFY `PWDHash` VARCHAR(255) NOT NULL,
    MODIFY `offEmail` VARCHAR(255) NOT NULL,
    MODIFY `LangCd` TINYINT NOT NULL,
    MODIFY `city_id` SMALLINT NOT NULL,
    MODIFY `country_code` SMALLINT NOT NULL,
    MODIFY `Gender` TINYINT NOT NULL,
    MODIFY `ProfilePic` VARCHAR(255) NOT NULL,
    MODIFY `Stat` TINYINT NOT NULL,
    MODIFY `Role` TINYINT NOT NULL;
