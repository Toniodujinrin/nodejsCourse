const fs = require("fs");
const path = require("path");
const util = require("util");
const helpers = require("./helpers");



const lib = {};
lib.baseDirectory = path.join(__dirname, "/../.data/");

lib.create = function (dir, file, data, callback) {
  //open the file for writing

  fs.open(`${lib.baseDirectory}${dir}/${file}.json`, "wx", (err, fd) => {
    if (!err && fd) {
      //convert data into string
      const stringData = JSON.stringify(data);
      //write to file
      fs.writeFile(fd, stringData, (err) => {
        if (!err) {
          fs.close(fd, (err) => {
            if (!err) {
              callback(false);
            } else callback("error in closing file");
          });
        } else {
          callback("error in writing file");
        }
      });
    } else {
      callback("could not create new file,it may already exist ");
    }
  });
};

//reading data from an existing
lib.read = function (dir, file, callback) {
  fs.readFile(
    `${lib.baseDirectory}${dir}/${file}.json`,
    "utf-8",
    
    (err, data) => {
      if(!err&&data){
        const parsedData = helpers.parseJsonToObject(data)
        callback(false,parsedData)
      }
      else{callback(err,undefined)}
    }
  );
};

lib.update = function (dir, file, data, callback) {
  //open file for writing
  fs.open(`${lib.baseDirectory}${dir}/${file}.json`, "r+", (err, fd) => {
    if (!err && fd) {
      const stringData = JSON.stringify(data);
      fs.ftruncate(fd, (err) => {
        if (!err) {
          fs.writeFile(fd, stringData, (err) => {
            if (!err) {
              fs.close(fd, (err) => {
                if (!err) {
                  callback(false);
                } else {
                  callback("could not close file");
                }
              });
            } else {
              callback("could not update file");
            }
          });
        } else {
          callback("error in truncating file");
        }
      });
    } else {
      callback("could not open file it may not exist");
    }
  });
};

lib.delete = function (dir, file, callback) {
  fs.unlink(`${lib.baseDirectory}${dir}/${file}.json`, (err) => {
    if (!err) {
      callback(false);
    } else {
      callback("error occured when deleting file");
    }
  });
};

//delete content in a file
// lib.deleteContent = function (dir, file, callback) {
//   fs.open(`${lib.baseDirectory}${dir}/${file}.json`, "r+", (err, fd) => {
//     if (!err && fd) {
//       fs.ftruncate(fd, 0, (err) => {
//         if (!err) {
//           fs.close(fd, (err) => {
//             if (!err) {
//               callback("false");
//             } else {
//               callback("problem occured when closing file ");
//             }
//           });
//         } else {
//           callback("error occured when deleting file");
//         }
//       });
//     } else {
//       callback("error occured trying to open file maybe it does not exist");
//     }
//   });
// };

module.exports = lib;
