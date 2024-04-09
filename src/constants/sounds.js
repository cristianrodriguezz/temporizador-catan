import soundFinishTime11 from "../assets/soundFinishTime1.wav"
import soundFinishTime12 from "../assets/soundFinishTime2.wav"
import soundFinishTimeGame1 from "../assets/soundFinishTimeGame1.wav"
import soundFinishTimeGame2 from "../assets/soundFinishTimeGame2.wav"
import soundPassTurn2 from "../assets/soundPassTurn2.wav"
import soundGeneralClick from "../assets/soundGeneralClick.wav"

export const play = (sound) => {
  if (sound === "soundFinishTime11") {
    new Audio(soundFinishTime11).play();
  }
  if (sound === "soundFinishTime12") {
    new Audio(soundFinishTime12).play();
  }
  if (sound === "soundFinishTimeGame1") {
    new Audio(soundFinishTimeGame1).play();
  }
  if (sound === "soundFinishTimeGame2") {
    new Audio(soundFinishTimeGame2).play();
  }
  if (sound === "soundPassTurn2") {
    new Audio(soundPassTurn2).play();
  }
  if (sound === "soundGeneralClick") {
    new Audio(soundGeneralClick).play();
  }
};