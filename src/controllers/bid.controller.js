import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const listing = asyncHandler(async (req, res) => {
    const currentDate = new Date();
    const today = currentDate.toISOString().split('T')[0]; // "YYYY-MM-DD"
    let UserId = req.body.UserId;
    let type = req.body.type;
    UserId = parseInt(UserId)
    let whr = ``;
    if (UserId > 0 && type != '') {
        switch (type) {
            case "live":
                whr = ` AND date('${today}') between date(a.FromDt) and date(a.ToDt) `;
                // whr = ` AND date('${today}') between date(a.FromDt) and date(a.ToDt) `;
                break;
            case "future":
                whr = `AND date(a.FromDt) > ${today} `;
                break;
            case "past":
                whr = ` AND date(a.ToDt) < ${today} `;
                break;
        }

        const query = `
        SELECT a.ANo, a.ItemName, a.BasePrice, a.Company , mt.TDesc as auctionType, 
        IFNULL((SELECT b.BidPrice FROM BID b Where b.ANo = a.ANo ORDER BY BidNo DESC limit 1),a.BasePrice) as curBids,
        IFNULL((SELECT b.BidPrice FROM BID b Where b.ANo = a.ANo and b.UserId = ${UserId} ORDER BY BidNo DESC limit 1), 0) as myBids 
        FROM BID b INNER JOIN Auction a ON a.ANo = b.ANo INNER JOIN MstTyp mt ON mt.TagId = a.AucTyp 
        WHERE b.Stat = 0 AND mt.TagTyp = 1 AND b.UserId = ${UserId} ${whr}  GROUP BY a.ANo ORDER BY a.ANo ASC, b.BidNo DESC`;
        const result = await prisma.$queryRawUnsafe(query);

        const json = JSON.stringify(result, (key, value) => {
            return typeof value === 'bigint' ? Number(value) : value;
        });
        const data = JSON.parse(json);
        // const lists = data.length ? data[0].appVersion : null;

        if (data) {
            res.status(201).json(
                new ApiResponse(200, data, "My Bidding List")
            )
        } else {
            res.status(400).json(
                new ApiResponse(400, data, "Bidding Not Found!!")
            )
        }
    }

})

const createBid = asyncHandler(async (req, res) => {

    const userId = parseInt(req.body.userId)
    const ANo = parseInt(req.body.ANo)

    let BidPrice = 0;
    if (userId > 0) {
        const bidDT = await prisma.BID.findFirst({
            where: {
                ANo: ANo
            },
            select: {
                BidPrice: true
            },
            orderBy: { BidNo: 'desc' }
        })
        if (bidDT) {
            BidPrice = bidDT.BidPrice
        } else {
            const auctionDT = await prisma.Auction.findFirst({
                where: {
                    ANo: ANo
                },
                select: {
                    BasePrice: true,
                },
            })

            BidPrice = auctionDT.BasePrice
        }

        const bids = await prisma.BID.create({
            data: {
                ANo: ANo,
                UserId: userId,
                BidPrice: BidPrice,
                CurrId: 1,
                Stat: 0,
                RejRsonId: 0
            },
        });

        if (bids) {
            res.status(200).json(
                new ApiResponse(200, bids, "Bidding Successfully")
            )
        } else {
            res.status(400).json(
                new ApiResponse(400, bids, "Bidding Not Inserted")
            )
        }
    } else {
        res.status(400).json(
            new ApiResponse(400, bids, "User is not active")
        )
    }

})

const insertBid = asyncHandler(async (req, res) => {

    const UserId = parseInt(req.body.UserId)
    const ANo = parseInt(req.body.auctionNo)
    const BidPrice = parseInt(req.body.amount)


    if (UserId > 0) {

        const bids = await prisma.BID.create({
            data: {
                ANo: ANo,
                UserId: UserId,
                BidPrice: BidPrice,
                CurrId: 1,
                Stat: 0,
                RejRsonId: 0
            },
        });

        if (bids) {
            res.status(200).json(
                new ApiResponse(200, bids, "Bidding Successfully")
            )
        } else {
            res.status(400).json(
                new ApiResponse(400, bids, "Bidding Not Inserted")
            )
        }
    } else {
        res.status(400).json(
            new ApiResponse(400, bids, "User is not active")
        )
    }
})

export { listing, createBid, insertBid }