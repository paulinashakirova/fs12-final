const { v4: uuidv4 } = require('uuid'); // library to generate locationToken

function liveLocationShouldBeEnabled(req, res, next) {
  const { locationToken } = req.body;

  // try {
  //   const x = await uuidv4(); //generates token
  // }
  //   if (!locationToken) {

  //   } else {
  //     //send message "locationToken already exists"
  //   }
}

module.exports = liveLocationShouldBeEnabled;

//When the user creates her account, should allow location
//if user gives permission, then generate locationToken
//if user DOES NOT  gives permisson, send message asking for her permisson
