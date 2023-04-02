import { m } from "framer-motion";

export const stylePlayerSelected = (player, playerId, renderPlayerInTimer) => {
  return player.id === playerId
    ? {
        height: "5.8rem",
        background: player.color,
        borderRadius: "10px",
        boxShadow: "0 0 0 3px #f1f1f1",
        border: "2px solid #f1f1f1",
        margin: "5px",
        display: "grid",
        overflow: "hidden",
      }
    : renderPlayerInTimer === undefined
    ? {
        height: "4.2rem",
        background: player.color,
        borderRadius: "10px",
        margin: "5px",
        display: "grid",
        gridTemplateColumns: "10% 70% 20%",
        overflow: "hidden",
      }
    : {
        height: "5.8rem",
        background: player.color,
        borderRadius: "10px",
        boxShadow: "0 0 0 3px #f1f1f100",
        border: "2px solid #f1f1f100",
        margin: "5px",
        display: "grid",
        overflow: "hidden",
      }
};
