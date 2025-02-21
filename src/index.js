import dotenv from "dotenv"
import con from "./db/index.js";
import { app, server } from './app.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

dotenv.config({
    path: './.env'
})

async function main() {
    // await prisma.users1.create({
    //     data: {
    //       Fullname: 'Alice',
    //       email: 'alice11@prisma.io',
    //       MobileNo: '7869068343',
    //       Password: '12345',
    //     },
    //   })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

app.get('/', function (req, res) {

    con.query("select * from users", (err, result) => {
        if (err) {
            res.send('error')
        } else {
            res.send(result);
        }
    })
})

// app.listen(process.env.PORT || 8000, () => {
//     console.log(`runing app port ${process.env.PORT}`)
// })
server.listen(process.env.PORT || 8000, () => {
    console.log(`runing app port ${process.env.PORT}`)
})