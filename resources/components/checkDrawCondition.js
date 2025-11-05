export default function(game){
    const maxSpaces = game.state.boardSize ** 2;
    const occupiedSpaces = game.state.occupiedSpaces;
    const drawCondition = occupiedSpaces >= maxSpaces;
    
    return drawCondition;
}