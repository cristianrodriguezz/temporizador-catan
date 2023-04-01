export const stylePlayerSelected = (player, playerId, renderPlayerInTimer) => {
  return player.id === playerId
    ? {
        background: player.color,
        borderRadius: "10px",
        border: "5px solid #f1f1f1",
        margin: "0px",
        display: "grid",
      }
    : renderPlayerInTimer === undefined
    ? {
        background: player.color,
        borderRadius: "10px",
        margin: "5px",
        display: "grid",
        gridTemplateColumns: "10% 70% 20%",
      }
    : {
        background: player.color,
        borderRadius: "10px",
        margin: "5px",
      };
};
