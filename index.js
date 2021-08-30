function reverseStr(str) {
  var listOfChars = str.split("");
  var reverseListOfChars = listOfChars.reverse();
  var reversedStr = reverseListOfChars.join("");
  return reversedStr;
}

function isPalindrome(str) {
  var reverse = reverseStr(str);
  return str === reverse;
}

function convertDateToStr(dates) {
  var dateStr = { day: "", month: "", year: "" };

  if (dates.day < 10) {
    dateStr.day = "0" + dates.day;
  } else {
    dateStr.day = dates.day.toString();
  }

  if (dates.month < 10) {
    dateStr.month = "0" + dates.month;
  } else {
    dateStr.month = dates.month.toString();
  }

  dateStr.year = dates.year.toString();
  return dateStr;
}

function getAllDateFormats(dates) {
  var dateStr = convertDateToStr(dates);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(dates) {
  var listOfPalindromes = getAllDateFormats(dates);

  var flag = false;

  for (var i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      flag = true;
      break;
    }
  }

  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function getNextDate(dates) {
  var day = dates.day + 1;
  var month = dates.month;
  var year = dates.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 - 11

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }

    if (month > 12) {
      month = 1;
      year++;
    }

    return {
      day: day,
      month: month,
      year: year,
    };
  }
}

function getNextPalindromeDate(dates) {
  var ctr = 0;
  var nextDate = getNextDate(dates);

  while (1) {
    ctr++;
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}

var dateInputRef = document.querySelector("#bday-input");
var checkBtn = document.querySelector("#check-btn");
var resultDiv = document.querySelector("#result");

function clickHandler() {
  var bdayStr = dateInputRef.value;

  if (bdayStr !== "") {
    var listOfDate = bdayStr.split("-");

    var dates = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };

    var isPalindrome = checkPalindromeForAllDateFormats(dates);

    if (isPalindrome) {
      resultDiv.innerText = "Yay! your birthday is a palindrome!";
    } else {
      var [ctr, nextDate] = getNextPalindromeDate(dates);

      resultDiv.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days!`;
    }
  }
}

checkBtn.addEventListener("click", clickHandler);
