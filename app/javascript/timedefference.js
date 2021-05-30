window.addEventListener('load', () => {
  const timeInput = document.getElementById("InputDateTime");
  const timeInputSecond = document.getElementById("InputSecondTime");  

  function getInputSecond (secondElement) {if (Number(secondElement.value) < 10){
    return secondElement.value.padStart(2, 0);
  }else{
    return secondElement.value
  }};

  function timeDeference(){
      const nowDate = new Date();
      const inputSecond = getInputSecond(timeInputSecond);
      const InputDate = new Date(timeInput.value + ":" + inputSecond);
      const sign = nowDate > InputDate ? 1 : 0;
      debugger;
      const diff = Math.abs(nowDate - InputDate);
      const times = new Date(diff).toUTCString().match(/(\d+):(\d+):(\d+)/);
      debugger;
      const days = Math.floor(diff / 86400000);
      return {
        timeDeference: `${String(days).padStart(2, '0')}日${times[1]}時間${times[2]}分${times[3]}秒${['早い', '遅れ'][sign]}`,
        setTime: diff
      };
    };
  
    let setTime;
    document.addEventListener('click', event =>{
      if (event.target.closest('.btn-time-deference')){
        let innerTime = timeDeference()
        document.getElementById("TimeDeference").innerHTML = innerTime.timeDeference;
        setTime = innerTime;
      }
    });
  
  const correctionTimeInput = document.getElementById("InputDateTimePass");
  const correctionTimeInputSecond = document.getElementById("InputSecondTimePass");
    
  function correctionTime(setTime){
      const setDate = setTime.setTime
      const inputSecondCorrection = getInputSecond(correctionTimeInputSecond);
      const InputCorrectionDate = new Date(correctionTimeInput.value + ":" + inputSecondCorrection).getTime();
      const checkStr = setTime.timeDeference
      
      function parseTime(resultTime){
        let set2digits = function digits (num) {
          let digit;
          if(num < 10) {digit = "0" + num;}
          else {digit = num;}
          return digit;
        }
        const correctionYear = resultTime.getFullYear();
        const correctionMonth = resultTime.getMonth() + 1;
        const correctionDay = resultTime.getDate();
        const correctionHour = set2digits(resultTime.getHours());
        const correctionMin = set2digits(resultTime.getMinutes());
        const correctionSec = set2digits(resultTime.getSeconds());
        return "修正:" + correctionYear + "年" + correctionMonth + "月" + correctionDay + "日"
                + correctionHour + ":" + correctionMin + ":" + correctionSec;
  
      };
      
      if (checkStr.indexOf("早い") !== -1){
        resultTime = new Date(InputCorrectionDate - setDate);
        return parseTime(resultTime);
      }else{
        resultTime = new Date(InputCorrectionDate + setDate);
        return parseTime(resultTime);
      };
    };
    
    document.addEventListener('click', event =>{
      if (event.target.closest('.btn-correction-time')){
        if (setTime.timeDeference !== null){
          debugger;
          document.getElementById("CorrectionTime").innerHTML = correctionTime(setTime);
      }}
    });
});