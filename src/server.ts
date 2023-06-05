import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', error => {
  // console.log('Uncaught Exception detected')
  errorLogger.error(error)
  process.exit(1)
})

let server: Server
async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database connected successfully')

    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error(`Database connect failed`, err)
  }

  process.on('unhandledRejection', error => {
    // console.log('Unhandled Rejection detected, we are closing our server')
    errorLogger.error(error)
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()

process.on('SIGTERM', () => {
  logger.info('SIGTERM is recieved')
  if (server) {
    server.close()
  }
})
