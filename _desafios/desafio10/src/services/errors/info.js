const generateRoutingErrorInfo = (route) => {
  return `The requested route ${route} could not be found. Please verify that the URL is correct and try again.`
}

const generateUserErrorInfo = (user) => {
  return `One of more properties were incomplete or not valid.
  List of required properties:
  * first_name : needs to be a String, received ${user.first_name}
  * last_name  : needs to be a String, received ${user.last_name}
  * email      : needs to be a String, received ${user.email}`
}

const generateDatabaseErrorInfo = (errorMessage) => {
  return `An error occurred while trying to access the database. Details: ${errorMessage}`
}

const generateAuthenticationErrorInfo = (username) => {
  return `The provided username ${username} is not valid. Please verify your credentials and try again.`
}

const generateValidationErrorInfo = (invalidFields) => {
  const invalidFieldsList = invalidFields.join(", ");
  return `The following fields were not valid: ${invalidFieldsList}. Please verify that the information is correct and try again.`
}

module.exports = {
  generateRoutingErrorInfo,
  generateUserErrorInfo,
  generateDatabaseErrorInfo,
  generateAuthenticationErrorInfo,
  generateValidationErrorInfo
}