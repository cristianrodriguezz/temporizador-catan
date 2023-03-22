import React from "react" 

const PlayersList = ({ players }) =>{


    return(
      <ul className="timerListPlayer">
        {
          players?.map( player =>(
            <li key={player.id} className="players">
              <div style={{background: player.color}}>
                <p>{player.name}</p>
                <p>{player.timerBank}</p>
              </div>
            </li>
          ))
        }
      </ul>
    )
}

const NotPlayers = () => {
    return(
        <p>No hay jugadores</p>
    )
}

export const Players = ({ players }) => {
    const hasPlayers = players?.length > 0

    return(
        hasPlayers 
        ?
        <PlayersList players={players}/>
        :
        <NotPlayers/>
    )
}