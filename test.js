function getDate() {
  const date = new Date();
  const dateObject = {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    seconds: date.getSeconds(),
  };
  const { day, month, year, hour, minute, seconds } = dateObject;
  const Postdate = `${day}/${month}/${year}  ${hour}:${minute}:${seconds}`;
  return Postdate;
}

const RandomString = function (strLength) {
  strLength = typeof strLength == "number" ? strLength : false;
  if (strLength) {
    //define all possible characters that can go into the string
    const possibleChars = "abcdefghijklmnopqrstuvwxyz1234567890";
    //create string
    let str = "";
    for (let i = 0; i < strLength; i++) {
      const randomLetter = possibleChars.at(
        Math.floor(Math.random() * strLength)
      );
      str += randomLetter;
    }

    return str;
  } else {
    return "length not valid";
  }
};

console.log(Date.now());
