const fs = require("fs");

const getQuestions = (jsonPath) => {
    fs.readFile(jsonPath, (err, data) => {
      if (err) {
        console.error(err);
        return -1;
      }
      return JSON.parse(data);
    });
};

module.exports = {getQuestions}