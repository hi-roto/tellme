window.addEventListener('load', () => {  
  
    let set2digits = function digits (num) {
    let digit;
      if(num < 10) {digit = "0" + num;}
      else {digit = num;}
      return digit;
    }

  let timeNow = function realtime () {
    const nowTime = new Date();
    const nowYear = nowTime.getFullYear();
    const nowMonth = nowTime.getMonth() + 1;
    const nowDay = nowTime.getDate();
    const nowHour = set2digits(nowTime.getHours());
    const nowMin = set2digits(nowTime.getMinutes());
    const nowSec = set2digits(nowTime.getSeconds());
    const dayOfWeek = nowTime.getDay();	
    const dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeek] ;	
    const realTime = "現在:" + nowYear + "年" + nowMonth + "月" + nowDay + "日"+ "(" + dayOfWeekStr + ")"
                  + nowHour + ":" + nowMin + ":" + nowSec;
    document.getElementById("RealTimeArea1").innerHTML = realTime;
    };

  setInterval(timeNow, 1000); 

});