const dateSolving = (currentDate) =>{
    const monthWith31Days = [1,3,5,7,8,10,12]
    let previousDate = new Date(currentDate)
    if(currentDate.getMonth() === 0){
        previousDate.setMonth(11);
        previousDate.setFullYear(currentDate.getFullYear()-1)
    }
    else if(currentDate.getMonth() === 2 && currentDate.getDate() === 31){
        previousDate.setDate(28)
        previousDate.setMonth(1);
    }
    else if(currentDate.getDate() === 31 && !monthWith31Days.includes(currentDate.getMonth())){
        previousDate.setDate(30)
        previousDate.setMonth(currentDate.getMonth()-1);
    }
    else{
        previousDate.setMonth(currentDate.getMonth()-1)
    }
    return previousDate;
}
module.exports =dateSolving