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

const fontTimer = {
    fontFamily: "'Inconsolata', monospace",
    fontWeight: 900,
};

const transitionTimerFinish = {
    transition: "font-size 0.15s ease-in-out",
};

const transitionTimerChange = {
    transition: "font-size 1s ease-in-out",
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