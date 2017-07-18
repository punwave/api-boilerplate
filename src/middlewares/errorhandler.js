import expressWinston from 'express-winston'
import httpErrors from 'http-errors-express'
import { errors } from 'compose-middleware'
import logger, { errorLogger as winstonInstance } from '../config/winston'
import config from '../config'

const errorLogger = (config.env === 'production')
  ? () => expressWinston.errorLogger({ winstonInstance })
  : () => (err, req, res, next) => logger.error(err) || next(err)

const handlers = [
  errorLogger(),
  httpErrors({
    /* eslint handle-callback-err: 0 */
    before: (err, req, isExposed, cb) => cb()
  })
]

export default () => errors(handlers)
