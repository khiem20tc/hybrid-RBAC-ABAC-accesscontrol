const errorCode = {

  //CODE 100 INFORMATION RESPONSES

  //CODE 200 SUCCESS RESPONSE

  SUCCESSFUL: {
    errorCode: 200,
    name: "SUCCESSFUL",
    message: "Success"
  },
  CREATED: {
    errorCode: 201,
    name: "CREATED",
    message: "Created"
  },

  //CODE 300 REDIRECTION MESSAGES

  //CODE 400 CLIENT ERROR RESPONSES
  MANY_REQUEST: {
    errorCode: 429,
    name: "MANY_REQUEST",
    message: "Too many accounts created from this IP, please try again 15 minutes"
  },

  //CODE 500 SERVER ERROR RESPONSES

  ERROR_SERVER: {
    errorCode: 500,
    name: "ERROR_SERVER",
    message: "Error server"
  }
};

export default errorCode;