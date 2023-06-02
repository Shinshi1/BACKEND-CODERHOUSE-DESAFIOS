const EErrors = require('../../services/errors/enums.js');

module.exports = (error, req, res, next) => {
  console.log(error.cause);
  switch (error.code) {
    case EErrors.INVALID_TYPES_ERROR:
      res.send({ status: 'error', error: error.name })
      break;
    case EErrors.ROUTING_ERROR:
      res.send({ status: 'error', error: 'Routing error' })
      break;
    case EErrors.DATABASE_ERROR:
      res.send({ status: 'error', error: 'Database error' })
      break;
    case EErrors.AUTHENTICATION_ERROR:
      res.send({ status: 'error', error: 'Authentication error' })
      break;
    case EErrors.VALIDATION_ERROR:
      res.send({ status: 'error', error: 'Validation error' })
      break;
    case EErrors.NOT_FOUND_ERROR:
      res.send({ status: 'error', error: 'Not found error' })
      break;
    case EErrors.INTERNAL_ERROR:
      res.send({ status: 'error', error: 'Internal error' })
      break;
    case EErrors.PASSWORDS_DO_NOT_MATCH:
      res.send({ status: 'error', error: 'Passwords do not match error' })
      break;
    case EErrors.USER_NOT_EXIST:
      res.send({ status: 'error', error: 'User not exist error' })
      break;
    default:
      res.send({ status: 'error', error: 'Unhandled error' })
  }
}

