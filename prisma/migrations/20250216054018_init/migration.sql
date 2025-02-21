-- CreateTable
CREATE TABLE `users1` (
    `UserId` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `Fullname` VARCHAR(191) NULL,
    `MobileNo` VARCHAR(191) NULL,
    `Password` VARCHAR(191) NULL,

    UNIQUE INDEX `users1_email_key`(`email`),
    PRIMARY KEY (`UserId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
