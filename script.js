const gameboard = (() => {
    let board = [["", "", ""],
                 ["", "", ""],
                 ["", "", ""]];
    
    const setOwnerId = (posY, posX, owner) => {
        if ((0 <= posY && posY <= 2) && (0 <= posX && posX <= 2)) {
            if (board[posY][posX] === "") {
                board[posY][posX] = owner.getId();
                let cell = document.querySelector(`[data-y="${posY}"][data-x="${posX}"]`);
                cell.style.color = owner.getColor();
                cell.textContent = owner.getSymbol();
                return true;
            } else {return false}
        }
    }

    const getOwnerId = (posY, posX) => {
        if ((0 <= posY && posY <= 2) && (0 <= posX && posX <= 2)) {
            return board[posY][posX]
        } else {
            return "none"
        }
    }

    const checkFullColumn = (y, x) => {
        const owner = getOwnerId(y, x);
        return getOwnerId(0, x) === owner && getOwnerId(1, x) === owner && getOwnerId(2, x) === owner;
    }

    const checkFullRow = (y, x) => {
        const owner = getOwnerId(y, x);
        return getOwnerId(y, 0) === owner && getOwnerId(y, 1) === owner && getOwnerId(y, 2) === owner;
    }

    const checkFullDiags = (y, x) => {
        const owner = getOwnerId(y, x);
        if (getOwnerId(0, 0) === owner) {
            return getOwnerId(1, 1) === owner && getOwnerId(2, 2) === owner;
        } else if (getOwnerId(0, 2) === owner) {
            return getOwnerId(1, 1) === owner && getOwnerId(2, 0) === owner;
        }
    }

    const checkWin = (lastY, lastX) => {
        return result = checkFullColumn(lastY, lastX) || checkFullRow(lastY, lastX) || checkFullDiags(lastY, lastX);
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

    const getTurn = () => turn;

    const checkEndGame = (cellY, cellX) => gameboard.checkWin(cellY, cellX) || turn >= 9;
    const playRound = (event) => {
        cellY = event.target.dataset.y;
        cellX = event.target.dataset.x;
        let validMove = false;
        if (turn % 2 === 0) {
            validMove = gameboard.setOwnerId(cellY, cellX, player1);
        } else {
            validMove = gameboard.setOwnerId(cellY, cellX, player2);
        }
        if (validMove) {turn += 1;}
        if (checkEndGame(cellY, cellX)) {
            console.log("We have a winner!!!");
            endGame();}
    }

    const endGame = () => {
        cells.forEach((cell) => {
            removeEventListener("click", playRound);
        })
    }

    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        addEventListener("click", playRound)
    })
    return {getTurn, checkEndGame}
})()




