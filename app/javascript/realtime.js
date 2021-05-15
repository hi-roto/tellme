let set2digits = function digits (num) {
  let digit;
  if(num < 10) {digit = "0" + num;}
  else {digit = num;}
  return digit;
}

let timeNow = function realtime () {
  const nowTime = new Date();
  const nowHour = set2digits(nowTime.getHours());
  const nowMin = set2digits(nowTime.getMinutes());
  const nowSec = set2digits(nowTime.getSeconds());
  const realTime = "現在時刻:" + nowHour + ":" + nowMin + ":" + nowSec;
  document.getElementById("RealTimeArea1").innerHTML = realTime;
  };

setInterval(timeNow, 1000); 