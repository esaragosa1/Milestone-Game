//this allows my Script link to be in the header and the DOM event listener alerts it to load and read all 
//html before it reads the script 
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const width = 8
    const squares = []
    let score = 0

    const candyColors = [
       'red',
       'yellow',
       'orange',
       'purple',
       'green',
       'blue'
    ]

//create board with random color 
function createBoard() {
    for (let i=0; i < width*width; i++) {
        const square = document.createElement('div')
        square.setAttribute('draggable', true)
        square.setAttribute('id', i)
        let randomColor = Math.floor(Math.random() * candyColors.length)
        square.style.backgroundColor = candyColors[randomColor]
        grid.appendChild(square)
        squares.push(square)
    }
}
createBoard()

//Drag the candies
let colorBeingDragged
let colorBeingReplaced
let squareIdBeingDragged
let squareIdBeingReplaced

squares.forEach(square => square.addEventListener('dragstart', dragStart))
squares.forEach(square => square.addEventListener('dragend', dragEnd))
squares.forEach(square => square.addEventListener('dragover', dragOver))
squares.forEach(square => square.addEventListener('dragenter', dragEnter))
squares.forEach(square => square.addEventListener('dragleave', dragLeave))
squares.forEach(square => square.addEventListener('drop', dragDrop))

function dragStart() {
    colorBeingDragged = this.style.backgroundColor
    squareIdBeingDragged = parseInt(this.id)
    console.log(colorBeingDragged)
    console.log(this.id, 'dragstart')
}

function dragOver(event) {
    event.preventDefault()
   console.log(this.id, 'dragover')
}

function dragEnter(e) {
    e.preventDefault()
    console.log(this.id, 'dragenter')
}

function dragLeave() {
    console.log(this.id, 'dragleave')
}

function dragDrop() {
    console.log(this.id, 'dragdrop')
    colorBeingReplaced = this.style.backgroundColor
    squareIdBeingReplaced = parseInt(this.id)
    this.style.backgroundColor = colorBeingDragged
    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
}

function dragEnd() {
    console.log(this.id, 'dragend')
    //Defining a valid move as being allowed to switch out squares 1 above, below, left or right of square.
    let validMoves = [
        squareIdBeingDragged -1, 
        squareIdBeingDragged -width, 
        squareIdBeingDragged +1,
        squareIdBeingDragged +width
    ]
    let validMove = validMoves.includes(squareIdBeingReplaced)

    if (squareIdBeingReplaced && validMove) {
        squareIdBeingReplaced = null
    } else if (squareIdBeingReplaced && !validMove) {
        squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
    } else squareIdBeingDragged.style.backgroundColor = colorBeingDragged
}


// Checking for matches
//check for row of Four
function checkRowForFour(){
    for (i = 0; i < 61; i++) {
        let rowOfFour = [i, i+1, i+2]
        let decidedColor = squares[i].style.backgroundColor
        const isBlank = squares[i].style.backgroundColor === ''

        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
        if(notValid.includes(i)) continue //this skips any invalid 

        if (rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 3
            rowOfFour.forEach(index => {
                squares[index].style.backgroundColor = ''
            })
        }

    }
}
checkRowForFour()


//check for column of Three
function checkColumnForFour(){
    for (i = 0; i < 47; i++) {
        let columnOfFour = [i, i+width, i+width*2]
        let decidedColor = squares[i].style.backgroundColor
        const isBlank = squares[i].style.backgroundColor === ''

        if (columnOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 3
            columnOfFour.forEach(index => {
                squares[index].style.backgroundColor = ''
            })
        }

    }
}
checkColumnForFour()



//check for row of Three
function checkRowForThree(){
    for (i = 0; i < 61; i++) {
        let rowOfThree = [i, i+1, i+2]
        let decidedColor = squares[i].style.backgroundColor
        const isBlank = squares[i].style.backgroundColor === ''

        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
        if(notValid.includes(i)) continue //this skips any invalid 

        if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 3
            rowOfThree.forEach(index => {
                squares[index].style.backgroundColor = ''
            })
        }

    }
}
checkRowForThree()


//check for column of Three
function checkColumnForThree(){
    for (i = 0; i < 47; i++) {
        let columnOfThree = [i, i+width, i+width*2]
        let decidedColor = squares[i].style.backgroundColor
        const isBlank = squares[i].style.backgroundColor === ''

        if (columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 3
            columnOfThree.forEach(index => {
                squares[index].style.backgroundColor = ''
            })
        }

    }
}
checkColumnForThree()



window.setInterval(function(){
    checkRowForThree()
    checkColumnForThree()
}, 100)
//need to add a button to activate this set interval and a pause and start functions









})












