window.addEventListener('load', function (){
  const createTimeZone = (btnAreaCount) => { 
    let timeAreaCount = document.querySelectorAll(".container").length;  
    let timeArea = document.getElementById(`card-area-${timeAreaCount}`);
    
    let cloneElement = timeArea.cloneNode(true);
    cloneElement.id = `card-area-${timeAreaCount + 1}`;
    let btnElement = cloneElement.querySelector(`#add-btn-${btnAreaCount}`);
    btnElement.id = `add-btn-${btnAreaCount + 1}`;
    
    let InputDateTimeArea = cloneElement.querySelector(`#InputDateTime-${timeAreaCount}`);
    InputDateTimeArea.id = `InputDateTime-${timeAreaCount + 1 }`;
    let InputSecondTimeArea = cloneElement.querySelector(`#InputSecondTime-${timeAreaCount}`);
    InputSecondTimeArea.id = `InputSecondTime-${timeAreaCount + 1 }`;
    let CheckCurrentTimeArea = cloneElement.querySelector(`#check-current-time-${timeAreaCount}`);
    CheckCurrentTimeArea.id = `check-current-time-${timeAreaCount + 1 }`;
    let TimeDeferenceArea = cloneElement.querySelector(`#TimeDeference-${timeAreaCount}`);
    TimeDeferenceArea.id = `TimeDeference-${timeAreaCount +1 }`;
    
    let InputDateTimePassArea = cloneElement.querySelector(`#InputDateTimePass-${timeAreaCount}`);
    InputDateTimePassArea.id = `InputDateTimePass-${timeAreaCount + 1 }`;
    let InputSecondTimePassArea = cloneElement.querySelector(`#InputSecondTimePass-${timeAreaCount}`);
    InputSecondTimePassArea.id = `InputSecondTimePass-${timeAreaCount + 1 }`;
    let checkCorrectionTimeArea = cloneElement.querySelector(`#check-correction-time-${timeAreaCount}`);
    checkCorrectionTimeArea.id = `check-correction-time-${timeAreaCount + 1 }`;
    let CorrectionTimeArea = cloneElement.querySelector(`#CorrectionTime-${timeAreaCount}`);
    CorrectionTimeArea.id = `CorrectionTime-${timeAreaCount +1 }`;
        
    timeArea.after(cloneElement);
  };

  let btnAreaCount = document.querySelectorAll(".add-button").length;  

  document.addEventListener('click', event => {
    let containerCount = document.querySelectorAll(".container").length;
    if (event.target.closest('.add-button') && containerCount < 10)
        createTimeZone(btnAreaCount++);
    });
});

