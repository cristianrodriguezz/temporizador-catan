import soundFinishTime11Src from "../assets/soundFinishTime1.wav";
import soundFinishTime12Src from "../assets/soundFinishTime2.wav";
import soundFinishTimeGame1Src from "../assets/soundFinishTimeGame1.wav";
import soundFinishTimeGame2Src from "../assets/soundFinishTimeGame2.wav";
import soundPassTurn2Src from "../assets/soundPassTurn2.wav";
import soundGeneralClickSrc from "../assets/soundGeneralClick.wav";

const soundFinishTime11 = new Audio(soundFinishTime11Src);
const soundFinishTime12 = new Audio(soundFinishTime12Src);
const soundFinishTimeGame1 = new Audio(soundFinishTimeGame1Src);
const soundFinishTimeGame2 = new Audio(soundFinishTimeGame2Src);
const soundPassTurn2 = new Audio(soundPassTurn2Src);
const soundGeneralClick = new Audio(soundGeneralClickSrc);

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
