export const useSecondsToString = (bankOfTime) => {
    let minute = Math.floor((bankOfTime / 60) % 60);
    let second = bankOfTime % 60;
    second = (second < 10)? '0' + second : second;
    let time = minute + ':' + second
    return time
}
export const useMinuteToSecond = (minutes, seconds) => {
    return minutes * 60 + seconds
}