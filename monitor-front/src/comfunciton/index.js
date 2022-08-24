export const getCurrentTime = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let time = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    return time;
}
//精确到小时的字符串
export const getCurrentHour=()=>{
    let date=new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let time = `${year}-${month}-${day} ${hour}:00:00`;
    return time;
}
//精确到分钟的字符串
export const getCurrentMinute=()=>{
    let date=new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let time = `${year}-${month}-${day} ${hour}:${minute}:00`;
    return time;
}
//返回精确到日的字符串
export const getCurrentDay=()=>{
    let date=new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let time = `${year}-${month}-${day}`;
    return time;
}
export const getCurrentShortTime = (ts) => {
    if (ts) {
        let date = new Date(ts);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let time = `${year}-${month}-${day} ${hour}:${minute}:00`;
        return time;
    } else {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let time = `${year}-${month}-${day} ${hour}:${minute}:00`;
        return time;
    }
}
//通过时间的方式
// export const getStartAndEnd=()=>{
//     let end=new Date();
//     let start=new Date(end.getTime()-3600000);
//     let year=end.getFullYear();
//     let month=end.getMonth()+1;
//     let day=end.getDate();
//     let hour=end.getHours();
//     let minute=end.getMinutes();  
//     let endValue=`${year}-${month}-${day} ${hour}:${minute}:00`;
//     let year1=start.getFullYear();
//     let month1=start.getMonth()+1;
//     let day1=start.getDate();
//     let hour1=start.getHours();
//     let minute1=start.getMinutes();  
//     let startValue=`${year1}-${month1}-${day1} ${hour1}:${minute1}:00`;
//     return {startValue:startValue,endValue:endValue};
// }
//判断是否是默认时间
export const judgeDefault = (from, to) => {
    let year = from.getFullYear();
    let month = from.getMonth() + 1;
    let day = from.getDate();
    let hour = from.getHours();
    let minute = from.getMinutes();
    let year1 = to.getFullYear();
    let month1 = to.getMonth() + 1;
    let day1 = to.getDate();
    let hour1 = to.getHours();
    let minute1 = to.getMinutes();
    if (year == year1 && month == month1 && day == day1 && hour == hour1 && minute == minute1) {
        return true;
    } else {
        return false;
    }
}
export const getStartAndEnd = (timeInterval, itemList, judgeDefault) => {
    if (!timeInterval)
        return
    let startValue = '', endValue = '';
    //时间粒度为分钟
    if (timeInterval == '60') {
        if (judgeDefault) {//默认日期也就是当前的情况
            endValue = itemList[itemList.length - 1].key;
            if (itemList.length < 60) {
                startValue = itemList[0].key;
            } else {
                startValue = itemList[itemList.length - 1 - 60].key;
            }
        } else {
            endValue = itemList[itemList.length - 1].key;
            startValue = itemList[0].key;
        }
    }
    else if (timeInterval == '3600') {
        endValue = itemList[itemList.length - 1].key;
        startValue = itemList[0].key;

    } else if (timeInterval == '86400') {
        if (judgeDefault) {
            endValue = itemList[0].key;
            startValue = itemList[0].key;
        } else {
            endValue = itemList[itemList.length - 1].key;
            startValue = itemList[0].key;
        }
    }
    return { startValue: startValue, endValue: endValue };
}
//传入两个date对象返回对应格式字符串。
export const getFromTo = (from, to) => {
    let fromStr = ''
    let toStr = ''
    //需要精确到日
    let year = from.getFullYear();
    let month = from.getMonth() + 1;
    let day = from.getDate();
    fromStr = `${year}-${month}-${day} 00:00:00`;
    let  end=new Date(to.getTime()+86400000);
    let year1 = end.getFullYear();
    let month1 = end.getMonth() + 1;
    let day1 = end.getDate();
    toStr = `${year1}-${month1}-${day1} 00:00:00`;
    return { from: fromStr, to: toStr };
}
//传入日期，返回下一天字符串 比如2022-8-21 返回2022-8-22
export const getNextDay=(timeStr)=>{
    let date=new Date(timeStr);
    let nextDay=new Date(date.getTime()+86400000)
    let year = nextDay.getFullYear();
    let month = nextDay.getMonth() + 1;
    let day = nextDay.getDate();
    let nextStr = `${year}-${month}-${day}`;
    return nextStr;
}
//传入日期，返回上一个小时
export const getLastHour=(timeStr)=>{
    let date=new Date(timeStr);
    let Last=new Date(date.getTime()-3600000)
    let year = Last.getFullYear();
    let month = Last.getMonth() + 1;
    let day = Last.getDate();
    let hour = Last.getHours();
    let minute = Last.getMinutes();
    let lastStr = `${year}-${month}-${day} ${hour}:${minute}:00`;
    return lastStr;
}