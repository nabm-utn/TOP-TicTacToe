const gameboard = (() => {
    let board = Array(9).fill(" ")
    
    const setOwnerId = (index, owner) => {
        board[index] = owner.getId();
        let boardSection = document.querySelector(`[data-index="${index}"]`);
        boardSection.style.color = owner.getColor();
        boardSection.textContent = owner.getSymbol();
    }

    const getOwnerId = (index) => {
        return board[index]
    }

    return {setOwnerId, getOwnerId}
})()

const Player = (id, name, symbol, color) => {
    const getId = () => id;
    const getName = () => name;
    const setName = (newName) => {name = newName};
    const getSymbol = () => symbol;
    const getColor = () => color;
    const setColor = (newColor) => {color = newColor};

    let score = 0
    const getScore = () => score;
    const increaseScore = () => {score += 1};
    
    return {getId, 
            getName, setName, 
            getSymbol, 
            getColor, setColor,
            getScore, increaseScore}
    }


const game = (() => {
    const player1 = Player("p1", "player 1", "X", "#f00");
    const player2 = Player("p2", "player 2", "O", "#0f0");

    let turn = 0;
    let gameFinished = false;

    const getTurn = () => turn;
    const playRound = (event) => {
        choice = event.target.dataset.index;
        if (turn % 2 === 0) {
            gameboard.setOwnerId(choice, player1);
        } else {
            gameboard.setOwnerId(choice, player2);
        }
        turn += 1;
    }

    const sections = document.querySelectorAll(".board-section");
    sections.forEach((section) => {
        addEventListener("click", playRound)
    })

    return {getTurn}
})()

// TestGround...



