import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import con from '../db/index.js';
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto';
import { tokenGenerate } from '../utils/tokenGenerate.js';

const prisma = new PrismaClient()

function md5Hash(number) {
    return crypto.createHash('md5').update(number.toString()).digest('hex');
}

const registerUser = asyncHandler(async (req, res) => {

    const { Fullname, MobileNo, email, Password } = req.body;

    if (
        [Fullname, MobileNo, email, Password].some((field) => field?.trim() == "")
    ) {
        res.status(204).json(
            new ApiResponse(204, req.body, "All fields are required")
        )
    } else {
        const user = await prisma.users.create({
            data: {
                Fullname: Fullname,
                MobileNo: MobileNo,
                email: email,
                Password: Password,
                PWDHash: md5Hash(Password)
            },
        });

        if (user) {
            const sendDta = await prisma.users.findFirst({
                where: {
                    AND: [
                        { MobileNo: MobileNo }
                    ]
                },
                select: {
                    UserId: true,
                    Fullname: true,
                    MobileNo: true,
                    email: true,
                    Role: true,
                }
            })

            const token = tokenGenerate(sendDta)
            sendDta.authToken = token;

            res.status(201).json(
                new ApiResponse(200, sendDta, "Data Inserted")
            )
        } else {
            res.status(400).json(
                new ApiResponse(400, user, "Data Not Inserted")
            )
        }
    }

})

const listing = asyncHandler(async (req, res) => {

    const user = await prisma.users.findMany();

    if (user) {
        res.status(201).json(
            new ApiResponse(200, user, "Data Found")
        )
    } else {
        res.status(400).json(
            new ApiResponse(400, user, "Data Not Found!!")
        )
    }
})

const login = asyncHandler(async (req, res) => {

    const { MobileNo, Password } = req.body;

    if (
        [MobileNo, Password].some((field) => field?.trim() == "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    let PasswordHash = md5Hash(Password)
    const user = await prisma.users.findFirst({
        where: {
            AND: [
                { MobileNo: MobileNo },
                { PWDHash: PasswordHash }
            ]
        },
        select: {
            UserId: true,
            Fullname: true,
            MobileNo: true,
            email: true,
            Role: true,
        }
    })

    if (user) {

        const token = tokenGenerate(user)
        if (token) {
            user.authToken = token;
            res.status(201).json(
                new ApiResponse(200, user, "User Login Successfully.")
            )
        } else {
            res.status(400).json(
                new ApiResponse(400, user, "Token not created")
            )
        }

    } else {
        res.status(400).json(
            new ApiResponse(400, user, "User Not Login!!")
        )
    }
})

export { registerUser, listing, login }