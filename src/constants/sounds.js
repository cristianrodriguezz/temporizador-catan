import soundFinishTime11Src from "../assets/soundFinishTime1.wav";
import soundFinishTime12Src from "../assets/soundFinishTime2.wav";
import soundFinishTimeGame1Src from "../assets/soundFinishTimeGame1.wav";
import soundFinishTimeGame2Src from "../assets/soundFinishTimeGame2.wav";
import soundPassTurn2Src from "../assets/soundPassTurn2.wav";
import soundGeneralClickSrc from "../assets/soundGeneralClick.wav";

const soundFinishTime11 = new Audio();
soundFinishTime11.src = soundFinishTime11Src;
soundFinishTime11.preload = "auto";

const soundFinishTime12 = new Audio();
soundFinishTime12.src = soundFinishTime12Src;
soundFinishTime12.preload = "auto";

const soundFinishTimeGame1 = new Audio();
soundFinishTimeGame1.src = soundFinishTimeGame1Src;
soundFinishTimeGame1.preload = "auto";

const soundFinishTimeGame2 = new Audio();
soundFinishTimeGame2.src = soundFinishTimeGame2Src;
soundFinishTimeGame2.preload = "auto";

const soundPassTurn2 = new Audio();
soundPassTurn2.src = soundPassTurn2Src;
soundPassTurn2.preload = "auto";

const soundGeneralClick = new Audio();
soundGeneralClick.src = soundGeneralClickSrc;
soundGeneralClick.preload = "auto";

export const play = (sound) => {
  if (sound === "soundFinishTime11") {
    soundFinishTime11.play();
  }
  if (sound === "soundFinishTime12") {
    soundFinishTime12.play();
  }
  if (sound === "soundFinishTimeGame1") {
    soundFinishTimeGame1.play();
  }
  if (sound === "soundFinishTimeGame2") {
    soundFinishTimeGame2.play();
  }
  if (sound === "soundPassTurn2") {
    soundPassTurn2.play();
  }
  if (sound === "soundGeneralClick") {
    soundGeneralClick.play();
  }
};
