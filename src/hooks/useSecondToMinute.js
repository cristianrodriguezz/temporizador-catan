export const useSecondsToString = (bankOfTime) => {
    let hour = Math.floor((bankOfTime / 3600) % 24);
    let minute = Math.floor((bankOfTime / 60) % 60);
    let second = bankOfTime % 60;
    second = (second < 10) ? '0' + second : second;
    let time = (hour > 0) ? hour + ':' : '';
    time += (minute < 10 && hour > 0) ? '0' + minute + ':' : minute + ':';
    time += second;
    return time;
}
export const useMinuteToSecond = (minutes, seconds) => {
    return minutes * 60 + seconds
}
