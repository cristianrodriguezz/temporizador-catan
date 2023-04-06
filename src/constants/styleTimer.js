export const styleTimerTurn = (initialTime, timeGame, bankActualPlayer) => {
    if (initialTime > 0) {
        if (timeGame > 0) {
            return { ...fontTimer, fontSize: "7rem", transition: "font-size 0.15s ease-in-out", };
        }
        else {
            return { ...fontTimer, fontSize: "4rem", transition: "font-size 1s ease-in-out", };
        }
    }
    // else if (bankActualPlayer === 0) {
    //     return {...fontTimer, fontSize: "11rem", transition: "font-size 1s ease-in-out", };
    // }
    else {
        return { ...fontTimer, fontSize: "0rem", transition: "font-size 1s ease-in-out", };
    }
};

export const styleTimerBank = (initialTime, timeGame, bankActualPlayer) => {
    if (initialTime > 0) {
        if (timeGame > 0) {
            return { ...fontTimer, fontSize: "4rem", transition: "font-size 0.15s ease-in-out", };
        }
        else {
            return { ...fontTimer, fontSize: "7rem", transition: "font-size 1s ease-in-out", };
        }
    }
    // else if (bankActualPlayer === 0) {
    //     return {...fontTimer, fontSize: "0rem", transition: "font-size 1s ease-in-out", };
    // }
    else {
        return { ...fontTimer, fontSize: "8.5rem", transition: "font-size 1s ease-in-out", };
    }
};

export const styleTimerPlay = (initialTime, timeGame, bankActualPlayer) => {
    if (initialTime > 0) {
        if (timeGame > 0) {
            return { ...text2, color: "#f5f5f5", fontSize: "4.177rem" };
        }
        else {
            return {...text2, color: "#f5f5f5", fontSize: "7.3535rem" };
        }
    }
    else {
        return { ...text2, color: "#f5f5f5", fontSize: "7.3535rem" };
    }
};

const text1 = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "lightgray",
};

const text2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    transform: "translate(-50%, -50%)",
    zIndex: "1",
};

const fontTimer = {
    fontFamily: "'Inconsolata', monospace",
    fontWeight: 900,
};

// {
//     timeGame > 0
//         ? {
//             fontSize: "4rem",
//             fontFamily: "'Inconsolata', monospace",
//             fontWeight: 900,
//             transition: "font-size 0.15s ease-in-out",
//         }
//         : {
//             fontSize: "7rem",
//             fontFamily: "'Inconsolata', monospace",
//             fontWeight: 900,
//             transition: "font-size 1s ease-in-out",
//         }
// }