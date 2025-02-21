/*
  Warnings:

  - You are about to drop the column `CreatedDt` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `CreatedDt`,
    ADD COLUMN `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- CreateTable
CREATE TABLE `Auction` (
    `ANo` INTEGER NOT NULL AUTO_INCREMENT,
    `ItemName` VARCHAR(191) NULL,
    `ItemDesc` VARCHAR(191) NULL,
    `Company` VARCHAR(191) NULL,
    `UOMCd` INTEGER NOT NULL,
    `Qty` INTEGER NOT NULL,
    `LotSize` SMALLINT NOT NULL,
    `LotQty` SMALLINT NOT NULL,
    `ItemSpecs` TINYINT NOT NULL,
    `Inspection` TINYINT NOT NULL,
    `InspFrmDt` DATE NULL,
    `InspToDt` DATE NULL,
    `InspFromTime` TIME NULL,
    `InspToTime` TIME NULL,
    `AucTyp` TINYINT NOT NULL,
    `ACatg` TINYINT NOT NULL,
    `BasePrice` INTEGER NOT NULL,
    `TargetPrice` INTEGER NOT NULL,
    `CurrId` SMALLINT NOT NULL,
    `city_id` SMALLINT NOT NULL,
    `Pincode` VARCHAR(255) NOT NULL,
    `country_code` SMALLINT NOT NULL,
    `Addr1` VARCHAR(255) NOT NULL,
    `Addr2` VARCHAR(255) NOT NULL,
    `DeliveryId` TINYINT NOT NULL,
    `DelCost` TINYINT NOT NULL,
    `FromDt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `ToDt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `TicketId` TINYINT NOT NULL,
    `TicketPdDt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `CreatedDt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `UserId` INTEGER NOT NULL,
    `Stat` TINYINT NOT NULL,

    PRIMARY KEY (`ANo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuctionImages` (
    `INo` INTEGER NOT NULL AUTO_INCREMENT,
    `ANo` INTEGER NOT NULL,
    `ImgName` VARCHAR(255) NOT NULL,
    `Def` TINYINT NOT NULL,
    `Stat` TINYINT NOT NULL,

    PRIMARY KEY (`INo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuctionItemSpecs` (
    `SNo` INTEGER NOT NULL AUTO_INCREMENT,
    `ANo` INTEGER NOT NULL,
    `Label` VARCHAR(255) NOT NULL,
    `Description` VARCHAR(255) NOT NULL,
    `Rank` TINYINT NOT NULL,
    `Stat` TINYINT NOT NULL,

    PRIMARY KEY (`SNo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BID` (
    `BidNo` INTEGER NOT NULL AUTO_INCREMENT,
    `ANo` INTEGER NOT NULL,
    `UserId` INTEGER NOT NULL,
    `BidPrice` INTEGER NOT NULL,
    `CurrId` TINYINT NOT NULL,
    `Stat` TINYINT NOT NULL,
    `RejRsonId` TINYINT NOT NULL,
    `BidTime` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`BidNo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UOM` (
    `UOMCd` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(255) NOT NULL,
    `Stat` INTEGER NOT NULL,

    PRIMARY KEY (`UOMCd`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Countries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phone_code` INTEGER NOT NULL,
    `country_code` VARCHAR(255) NOT NULL,
    `country_name` VARCHAR(255) NOT NULL,
    `Stat` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `City` (
    `city_id` INTEGER NOT NULL AUTO_INCREMENT,
    `phone_code` INTEGER NOT NULL,
    `city_name` VARCHAR(255) NOT NULL,
    `Stat` INTEGER NOT NULL,

    PRIMARY KEY (`city_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MstTyp` (
    `TagId` INTEGER NOT NULL AUTO_INCREMENT,
    `TDesc` VARCHAR(255) NOT NULL,
    `TagTyp` INTEGER NOT NULL,

    PRIMARY KEY (`TagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reasons` (
    `RId` INTEGER NOT NULL AUTO_INCREMENT,
    `ANo` INTEGER NOT NULL,
    `Reason` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`RId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Currency` (
    `CurrId` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(255) NOT NULL,
    `code` INTEGER NOT NULL,
    `symbol` VARCHAR(255) NOT NULL,
    `Stat` INTEGER NOT NULL,

    PRIMARY KEY (`CurrId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
