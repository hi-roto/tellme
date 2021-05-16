window.addEventListener('load', () => {
  const checkBtn = document.getElementById("check-current-time");
  const timeInput = document.getElementById("InputDateTime");
  const timeInputSecond = document.getElementById("check-current-time");
  checkBtn.addEventListener("click", () => {
    const NowTime = new Date();
    const ChangeTime = new Date(timeInput.value + timeInputSecond.value);
    let defference;
    let TimeDefference;
    function leftFillNum(num, targetLength) {
      return num.toString().padStart(targetLength, 0);
    } 
    function timeJudge(days, hour, minute, second) {
      return (leftFillNum(days, 2) + '日'
            + leftFillNum(hour, 2) + '時間' 
            + leftFillNum(minute, 2) + '分' 
            + leftFillNum(second, 2) + '秒');
    }
    if (NowTime.getTime() > ChangeTime.getTime()){
      defference = NowTime.getTime() - ChangeTime.getTime()
      let diffDays = Math.floor(defference/1000/60/60/24);
      let diffHour = Math.floor(defference/1000/60/60)%24;
      let diffMinute = Math.floor(defference/1000/60)%60;
      let diffSecond = Math.floor(defference/1000)%60;
      TimeDefference = timeJudge(diffDays, diffHour, diffMinute, diffSecond) + "遅れ";
    } else if (NowTime.getTime() < ChangeTime.getTime()){
      defference = ChangeTime.getTime() - NowTime.getTime()
      diffDays = Math.floor(defference/1000/60/60/24);
      diffHour = Math.floor(defference/1000/60/60)%24;
      diffMinute = Math.floor(defference/1000/60)%60;
      diffSecond = Math.floor(defference/1000)%60;
      TimeDefference = timeJudge(diffDays, diffHour, diffMinute, diffSecond) + "早い";
    }

    const addTime = document.getElementById("TimeDefference");
    addTime.innerHTML = TimeDefference;
    
    
    if(timeInput.value !== null){
      const checkBtnPass = document.getElementById("check-correction-time");
      const timeInputPass = document.getElementById("InputDateTimePass");
      const timeInputSecondPass = document.getElementById("check-current-time");
      checkBtnPass.addEventListener("click", () => {
        const checkTime = new Date(timeInputPass.value + timeInputSecondPass.value).getTime();
        let CorrectionTime;
        if (NowTime.getTime() > ChangeTime.getTime()){
          defference = NowTime.getTime() - ChangeTime.getTime()
          CorrectionTime = new Date(checkTime + defference);
          let years = CorrectionTime.getFullYear();
          let month = CorrectionTime.getMonth() + 1;
          let days = CorrectionTime.getDate();
          let hour = CorrectionTime.getHours();
          let minute = CorrectionTime.getMinutes();
          let second = CorrectionTime.getSeconds();
          CorrectionTime = (years + '年' + month + '月' + days + '日' 
                          + hour + '時' + minute + '分' + second + '秒')
        }else if (NowTime.getTime() < ChangeTime.getTime()){
          defference = ChangeTime.getTime() - NowTime.getTime()
          CorrectionTime = new Date(checkTime - defference);
          let years = CorrectionTime.getFullYear();
          let month = CorrectionTime.getMonth() + 1;
          let days = CorrectionTime.getDate();
          let hour = CorrectionTime.getHours();
          let minute = CorrectionTime.getMinutes();
          let second = CorrectionTime.getSeconds();
          CorrectionTime = (years + '年' + month + '月' + days + '日' 
                          + hour + '時' + minute + '分' + second + '秒')
        }
        const changeTime = document.getElementById("CorrectionTime");
        changeTime.innerHTML = CorrectionTime;
      })
    }

  })
  
})