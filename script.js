const gameboard = (() => {
    const buildBoard = (n) => {
        let board = [];
        for (let i = 0; i < n; i++) {
            let row = [];
            for (let j=0; j<n; j++) {row.push("")}
            board.push(row);            
        } return board;
    }

    // let board = [["", "", ""],
    //              ["", "", ""],
    //              ["", "", ""]];

    let board = buildBoard(3);
    
    const setOwnerId = (posY, posX, owner) => {
        console.table(board);
        if ((0 <= posY && posY <= 2) && (0 <= posX && posX <= 2)) {
            board[posY][posX] = owner.getId();
            let cell = document.querySelector(`[data-y="${posY}"][data-x="${posX}"]`);
            console.log(cell)
            cell.style.color = owner.getColor();
            cell.textContent = owner.getSymbol();
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
        return getOwnerId(0, x) === owner && getOwnerId(1, x) === owner && getOwnerId(2, x);
    }

    const checkFullRow = (y, x) => {
        const owner = getOwnerId(y, x);
        return getOwnerId(y, 0) === owner && getOwnerId(y, 1) === owner && getOwnerId(y, 2);
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
        return checkFullColumn(lastY, lastX) || checkFullRow(lastY, lastX) || checkFullDiags(lastY, lastX);
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
        cellY = event.target.dataset.y;
        cellX = event.target.dataset.x;
        if (turn % 2 === 0) {
            gameboard.setOwnerId(cellY, cellX, player1);
        } else {
            gameboard.setOwnerId(cellY, cellX, player2);
        }
        turn += 1;
        if (gameboard.checkWin(cellY, cellX)) {
            console.log("We have a winner!!!");
            gameFinished = true;
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
    return {getTurn}
})()




