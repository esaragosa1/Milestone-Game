//this allows my Script link to be in the header and the DOM event listener alerts it to load and read all 
//html before it reads the script 
document.addEventListener('DOMContentLoaded', () = {
    const grid = document.querySelector('.grid')
    const width = 8
    const squares = []


//create board
function createBoard() {
    for (let i=0; i< width*width; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)
    }
}
createBoard()


})