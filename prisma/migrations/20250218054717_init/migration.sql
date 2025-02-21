/*
  Warnings:

  - You are about to drop the `users1` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `users1`;

-- CreateTable
CREATE TABLE `Users` (
    `UserId` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `Fullname` VARCHAR(191) NULL,
    `MobileNo` VARCHAR(191) NULL,
    `Password` VARCHAR(191) NULL,
    `PWDHash` VARCHAR(191) NULL,
    `offEmail` VARCHAR(191) NULL,
    `LangCd` INTEGER NOT NULL,
    `city_id` INTEGER NOT NULL,
    `country_code` INTEGER NOT NULL,
    `Gender` INTEGER NOT NULL,
    `DOB` DATE NULL,
    `ProfilePic` VARCHAR(191) NULL,
    `Stat` INTEGER NOT NULL,
    `Role` INTEGER NOT NULL,
    `CreatedDt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `Users_email_key`(`email`),
    UNIQUE INDEX `Users_MobileNo_key`(`MobileNo`),
    PRIMARY KEY (`UserId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
