import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const listing = asyncHandler(async (req, res) => {
    const currentDate = new Date();
    const today = currentDate.toISOString().split('T')[0]; // "YYYY-MM-DD"
    const result = await prisma.$queryRaw`
    SELECT 
        a.ANo, a.ItemName, a.ItemDesc, a.BasePrice, date(a.FromDt) as FromDt, date(a.ToDt) as ToDt, (Select ai.ImgName from AuctionImages ai where ai.ANo = a.ANo limit 1) as ImgName
    FROM
        Auction a
    WHERE
        a.Stat = 5 and date(a.FromDt) >= ${today}`;

    const json = JSON.stringify(result, (key, value) => {
        return typeof value === 'bigint' ? Number(value) : value;
    });
    const data = JSON.parse(json);
    // const lists = data.length ? data[0].appVersion : null;

    if (data) {
        res.status(201).json(
            new ApiResponse(200, data, "Auction List")
        )
    } else {
        res.status(400).json(
            new ApiResponse(400, data, "Data Not Found!!")
        )
    }
})

export { listing }