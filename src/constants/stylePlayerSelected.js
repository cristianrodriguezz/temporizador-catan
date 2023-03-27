export const stylePlayerSelected = (player, playerId) => {
  return player.id === playerId
    ? {
        background: player.color,
        borderRadius: "10px",
        border: "5px solid #f1f1f1",
        margin: '0px'
      }
    : { background: player.color, borderRadius: "10px", margin: '5px' };
};
