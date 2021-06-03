window.addEventListener('load', () => {
  function timeInputElement(){
    const timeAreaCount = document.querySelectorAll(".container").length;
    const timeInput = document.getElementById(`InputDateTime-${timeAreaCount}`);
    const timeInputSecond = document.getElementById(`InputSecondTime-${timeAreaCount}`);
    return{
      timeAreaCount: timeAreaCount,
      timeInput: timeInput,
      timeInputSecond: timeInputSecond
    };
  };

  function getInputSecond (secondElement) {if (Number(secondElement.value) < 10){
    return secondElement.value.padStart(2, 0);
  }else{
    return secondElement.value
  }};

  function timeDeference(timeDeferenceElement){
      const nowDate = new Date();
      const inputSecond = getInputSecond(timeDeferenceElement.timeInputSecond);
      const InputDate = new Date(timeDeferenceElement.timeInput.value + ":" + inputSecond);
      const sign = nowDate > InputDate ? 1 : 0;
      const diff = Math.abs(nowDate - InputDate);
      const times = new Date(diff).toUTCString().match(/(\d+):(\d+):(\d+)/);
      const days = Math.floor(diff / 86400000);
      return {
        timeDeference: `${String(days).padStart(2, '0')}日${times[1]}時間${times[2]}分${times[3]}秒${['早い', '遅れ'][sign]}`,
        setTime: diff
      };
    };
  
    let setTime;
    document.addEventListener('click', event =>{
      let setCount = document.querySelectorAll(".container").length
      if (event.target.closest(`#check-current-time-${setCount}`)){
        let timeDeferenceElement = timeInputElement();
        let innerTime = timeDeference(timeDeferenceElement)
        setTime = innerTime;
        document.getElementById(`TimeDeference-${timeDeferenceElement.timeAreaCount}`).innerHTML = innerTime.timeDeference;
      }
    });
  
  function timeInputPassElement(){
    const timeAreaCount = document.querySelectorAll(".container").length;
    const correctionTimeInput = document.getElementById(`InputDateTimePass-${timeAreaCount}`);
    const correctionTimeInputSecond = document.getElementById(`InputSecondTimePass-${timeAreaCount}`);
    return{
      timeAreaCount: timeAreaCount,
      correctionTimeInput: correctionTimeInput,
      correctionTimeInputSecond: correctionTimeInputSecond
    };
  };

  function correctionTime(setTime, correctionTimeElement){
      const setDate = setTime.setTime
      const inputSecondCorrection = getInputSecond(correctionTimeElement.correctionTimeInputSecond);
      const InputCorrectionDate = new Date(correctionTimeElement.correctionTimeInput.value + ":" + inputSecondCorrection).getTime();
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
      let setCount = document.querySelectorAll(".container").length
      if (event.target.closest(`#check-correction-time-${setCount}`)){
        if (setTime.timeDeference !== null){
          let correctionTimeElement = timeInputPassElement();
          document.getElementById(`CorrectionTime-${setCount}`).innerHTML = correctionTime(setTime, correctionTimeElement);
      }}
    });
});