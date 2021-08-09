const gameboard = (() => {
    let board = Array(9).fill(" ")
    
    const setOwner = (index, owner) => {
        board[index] = owner.name
        document.querySelector(`[data-index="${index}"]`).textContent = owner.symbol
    }

    const getOwnerName = (index) => {
        return board[index]
    }

    return {setOwner, getOwnerName}
})()

gameboard.setOwner(7, {name:"me"})
console.log(gameboard.getOwnerName(7))