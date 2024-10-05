function timeCalculation(time) {
    const minute = Math.round(time / 60);
    
    const hours = Math.round(minute/60);
    const restMinute = minute % 60;
    const finalUploadTime = hours + 'hrs ' + restMinute + 'min ago';
    return finalUploadTime;
    }
    console.log(timeCalculation(70000));