const errors = {};
import { inherits } from "util";

/**
 * Used to create errors
 * @Param {Number} code - http response code
 * @Param {String} message - Error message
 * @Param {String} description - Error description
 */
function ApiError(code, message, description) {
  this.code = code;
  this.message = message;
  this.description = description;
  this.details = null;
}

// Inherit the Error class
inherits(ApiError, Error);

ApiError.prototype.withDetails = function (details) {
  this.details = details;
  return this;
};

//Usage
//let api_error = new ApiError(400, 'REQUIRED_KEY','Api key is required. Please provide a valid api key along with request.');
//debugger

//--------------------- GENERIC ERRORS -------------------------/
//create a new ApiError object and apply an ApiError function as constructor
//Objects of the same type are created by calling the constructor function with the new keyword
errors.internal_error = new ApiError(
  50001,
  "INTERNAL_ERROR",
  "Something went wrong on server. Please contact server admin."
);

errors.required_key = new ApiError(
  40101,
  "REQUIRED_KEY",
  "Api key is required. Please provide a valid api key along with request."
);
errors.invalid_key = new ApiError(
  40102,
  "INVALID_KEY",
  "Valid api key is required. Please provide a valid api key along with request."
);

errors.required_auth = new ApiError(
  40103,
  "REQUIRED_AUTH_TOKEN",
  "Auth Token is required. Please provide a valid auth token along with request."
);
errors.invalid_auth = new ApiError(
  40104,
  "INVALID_AUTH",
  "Valid auth token is required. Please provide a valid auth token along with request."
);
errors.token_expired = new ApiError(
  40105,
  "TOKEN_EXPIRED",
  "Token expired. Please request new token."
);
errors.access_key_invalid = new ApiError(
  40106,
  "ACCESS_KEY_INVALID",
  "Access key is invalid"
);

// 400
errors.invalid_input = new ApiError(
  40001,
  "INVALID_INPUT",
  "The request input is not as expected by API. Please provide valid input."
);
errors.input_too_large = new ApiError(
  40002,
  "INPUT_TOO_LARGE",
  "The request input size is larger than allowed."
);
errors.invalid_input_format = new ApiError(
  40003,
  "INVALID_INPUT_FORMAT",
  "The request input format is not allowed."
);
errors.invalid_password = new ApiError(
  40004,
  "INVALID_PASSWORD",
  "Given password is invalid."
);
errors.already_exists = new ApiError(
  40005,
  "ALREADY_EXISTS",
  "The resources to create already exists."
);
errors.business_code_already_exists = new ApiError(
  40006,
  "ALREADY_EXISTS",
  "The resources to create already exists."
);
errors.business_symbol_already_exists = new ApiError(
  40007,
  "ALREADY_EXISTS",
  "The resources to create already exists."
);
errors.name_already_exists = new ApiError(
  40008,
  "ALREADY_EXISTS",
  "The resources to create already exists."
);
errors.encSeed_already_exists = new ApiError(
  40009,
  "ALREADY_EXISTS",
  "The resources to create already exists."
);
errors.hashedSeed_already_exists = new ApiError(
  40010,
  "ALREADY_EXISTS",
  "The resources to create already exists."
);
errors.transaction_failed = new ApiError(
  40010,
  "TRANSACTION_FAILED",
  "The transaction failed."
);
errors.time_out_market = new ApiError(
  40011,
  "TIMEOUT_MARKET",
  "Time to transaction on market is not valid."
);
errors.inavalid_status_market = new ApiError(
  40012,
  "INVALID_STATUS_MARKET",
  "Status on market is not valid."
);
errors.inavalid_nfts_market = new ApiError(
  40012,
  "INVALID_NFTS_MARKET",
  "NFTs lingting info is not match each others."
);
errors.inavalid_amount_market = new ApiError(
  40013,
  "INVALID_AMOUNT_MARKET",
  "NFTs amount is not enough."
);

errors.invalid_permission = new ApiError(
  40301,
  "INVALID_PERMISSION",
  "Permission denied. Current user does not has required permissions for this resource."
);
errors.invalid_operation = new ApiError(
  40302,
  "INVALID_OPERATION",
  "Requested operation is not allowed due to applied rules. Please refer to error details."
);

errors.not_found = new ApiError(
  40401,
  "NOT_FOUND",
  "The resource referenced by request does not exist."
);
errors.not_registeration = new ApiError(
  40402,
  "NOT_REGISTERATION",
  "User not registered with this email/mobile/username."
);
errors.required_resources_not_found = new ApiError(
  40403,
  "REQUIRED_RESOURCES_NOT_FOUND",
  "The resources required for this operation do not exist."
);
errors.asset_not_found = new ApiError(
  40404,
  "NOT_FOUND",
  "The resource referenced by request does not exist."
);
errors.data_not_exist = new ApiError(
  40405,
  "NOT_FOUND",
  "The resource referenced by request does not exist."
);

errors.bad_request = new ApiError(40303, "INVALID_OPERATION", "Bad Request");

errors.time_out = new ApiError(40801, "TIME_OUT", "Request Timeout.");

errors.account_not_verify = new ApiError(
  40304,
  "ACCOUNT_NOT_VERIFY",
  "Account must be verify, please verify your account"
);

errors.verify_account_error = new ApiError(
  40305,
  "VERIFY_ACCOUNT_ERROR",
  "Verify account error"
);
errors.account_already_verify = new ApiError(
  40306,
  "ACCOUNT_ALREADY_VERIFY",
  "Account already verify, can not verify again"
);

//--------------- SOME OTHERS LOGIC ERRORS -------------------/

//--------------- SOME OTHERS YOUR LOGIC ERRORS -------------------/
//errors.YOUR_NEW_ERROR_NAME = new ApiError(YOUR_HTTP_CODE, 'YOUR_ERROR_MESSAGE','YOUR_ERROR_DESCRIPTION');

errors.ApiError = ApiError;

// Exporting error Object
export default errors;
