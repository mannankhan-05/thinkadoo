import express from 'express'
import logger from './logger'
import db from './config/database'
const app = express()

const PORT = process.env.PORT || 5000

db.authenticate()
    .then(() => {
        logger.info("Database Connected (postgresql)")
    })
    .catch((err) => {
        logger.error(`Database Connection Failed. Error : ${err}`)
    })

db.sync()
    .then(() => {
        logger.info("Database Synced")
    })
    .catch((err) => {
        logger.error(`Database Sync Failed. Error : ${err}`)
    })

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`)
})