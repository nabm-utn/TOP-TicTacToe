const gameboard = (() => {
    let board = Array(3).fill(Array(3).fill(""));
    
    const setOwnerId = (posY, posX, owner) => {
        board[posY][posX] = owner.getId();
        let cell = document.querySelector(`[data-y="${posY}"][data-x="${posX}"]`);
        console.log(cell)
        cell.style.color = owner.getColor();
        cell.textContent = owner.getSymbol();
    }

    const getOwnerId = (posY, posX) => {
        return board[posY][posX]
    }

    const checkWin = (lastCell) => {
        const firstY = lastCell.dataset.y;
        const firstX = lastCell.dataset.x;
        const firstNeighbours = findNeighbourgs(firstY, firstX);
        const SecondNeighbours = []
        firstNeighbours.forEach( (cellY, cellX) => {
             secondNeighbours.push(...findNeighbourgs(cellY, cellX))
            })
    }

    return {setOwnerId, getOwnerId, checkWin}
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
        console.log(event)
        cellY = event.target.dataset.y;
        cellX = event.target.dataset.x;
        if (turn % 2 === 0) {
            gameboard.setOwnerId(cellY, cellX, player1);
        } else {
            gameboard.setOwnerId(cellY, cellX, player2);
        }
        turn += 1;
    }

    const checkEndGame = () => {
        
    }

    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        addEventListener("click", playRound)
    })
    return {getTurn}
})()




