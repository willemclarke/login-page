const fs = require("fs");
const path = require("path");
const _ = require("lodash");

class Database {
  storeUserData(username, password) {
    console.log(username, password);

    let previousDatabaseState = fs.readFileSync(
      path.join(__dirname, "../assets/userdata.json"),
      "utf8"
    );

    if (previousDatabaseState) {
      previousDatabaseState = JSON.parse(previousDatabaseState);
    }

    const userInfo = {
      ...previousDatabaseState,
      [username]: {
        password
      }
    };

    const data = JSON.stringify(userInfo, null, 2);
    fs.writeFileSync(path.join(__dirname, "../assets/userdata.json"), data);
  }

  checkUserData(username, password) {
    let userInfo = fs.readFileSync(
      path.join(__dirname, "../assets/userdata.json"),
      "utf8"
    );
    const decodedUserInfo = JSON.parse(userInfo);
    const foundPassword = _.get(decodedUserInfo, `${username}.password`);
    if (!foundPassword) {
      return false;
    } else {
      return foundPassword === password;
    }
  }

  storeSession(username, session) {
    let currentUserData = fs.readFileSync(
      path.join(__dirname, "../assets/userdata.json"),
      "utf8"
    );
    const decodedUserInfo = JSON.parse(currentUserData);
    const appendSession = {
      ...decodedUserInfo,
      [username]: {
        ...decodedUserInfo[username],
        session
      }
    };
    const data = JSON.stringify(appendSession, null, 2);
    fs.writeFileSync(path.join(__dirname, "../assets/userdata.json"), data);
  }

  checkSessionData(session) {
    let userInfo = fs.readFileSync(
      path.join(__dirname, "../assets/userdata.json"),
      "utf8"
    );
    const decodedUserInfo = JSON.parse(userInfo);
    const decodedSession = Buffer.from(session, "base64").toString();
    const username = decodedSession.split(":")[0];
    const foundSession = _.get(decodedUserInfo, `${username}.session`);
    if (!foundSession) {
      return false;
    } else {
      return foundSession === session;
    }
  }
}

module.exports = Database;
