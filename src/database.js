const fs = require("fs");
const path = require("path");

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

  checkUserData() {}
}

module.exports = Database;
