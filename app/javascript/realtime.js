let timeNow = function realtime () {
  const nowTime = new Date();
  const nowHour = nowTime.getHours();
  const nowMin = nowTime.getMinutes();
  const nowSec = nowTime.getSeconds();
  const realTime = nowHour + ":" + nowMin + ":" + nowSec;
  document.getElementById("RealTimeArea1").innerHTML = realTime;
  document.getElementById("RealTimeArea2").innerHTML = realTime;
  document.getElementById("RealTimeArea3").innerHTML = realTime;
};

setInterval(timeNow, 1000); 