const gameboard = (() => {
    let board = Array(9).fill(" ")
    
    const setOwnerName = (index, owner) => {
        board[index] = owner.name
        document.querySelector(`[data-index="${index}"]`).textContent = owner.symbol
    }

    const getOwnerName = (index) => {
        return board[index]
    }

    return {setOwnerName, getOwnerName}
})()

const Player = (id, name, symbol) => {
    const getId = () => id;
    const getName = () => name;
    const setName = (newName) => {name = newName};
    const getSymbol = () => symbol;

    let score = 0
    const getScore = () => score;
    const increaseScore = () => {score += 1};
    
    return {getId, getName, setName, getSymbol, getScore, increaseScore}
    }

const player1 = Player("p1", "player 1", "X");
const player2 = Player("p2", "player 2", "O");

