let renderTime = 0
const gameBoard = document.getElementById('board')

// atualiza a animação na tela 
function gameLoop(currentTime) {
    window.requestAnimationFrame(gameLoop)
    const secSinceLastRender = (currentTime - renderTime) / 1000 //converte de miliseguntos para segundos
    if (secSinceLastRender < 1 / snakeSpeed) return //tempo entre cada movimento em segundos

    renderTime = currentTime

    updateSnake()
    drawSnake()
}

    window.requestAnimationFrame(gameLoop)


//SNAKE PART

const snakeSpeed = 5 
const snakeBody = [{ x: 11, y: 11 }] 
let newSegments = 0

//MOVIMENTA A SNAKE PARA POSIÇÃO CORRETA
function updateSnake () {
    addSegments()

    const direction = getDirection()  
    for(let i = snakeBody.length - 2; i >= 0; i--){
        snakeBody[i + 1] = { ...snakeBody[i] } // new object
    }

    snakeBody[0].x += direction.x
    snakeBody[0].y += direction.y

    updateFood()
}
//CONTROLA AS DIMENSÕES DA SNAKE
function createSnake (gameBoard) {
    snakeBody.forEach(piece => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = piece.y
        snakeElement.style.gridColumnStart = piece.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)       
    })
}

function drawSnake () {
    gameBoard.innerHTML = ''
    createSnake(gameBoard)
    createFood(gameBoard)
}

//INPUT PART
let direction = {x: 0, y: 0}
let lastInputDirection = { x: 0, y: 0 }

window.addEventListener('keydown' , e => {
    switch (e.key) {
        case 'ArrowUp':
            if (lastInputDirection.y !== 0) break
            direction = { x: 0, y: -1 }
            break
        case 'ArrowDown':
            if (lastInputDirection.y !== 0) break
            direction = { x: 0, y: 1 }
            break
        case 'ArrowLeft':
            if (lastInputDirection.x !== 0) break
            direction = { x: -1, y: 0 }
            break
        case 'ArrowRight':
            if (lastInputDirection.x !== 0) break
            direction = { x: 1, y: 0 }
            break
    }
})

function getDirection() {
    lastInputDirection = direction
    return direction
}

// FOOD PART
let food = getRandomFoodPosition()
const expansionRate = 1

function updateFood () {
    if (onSnake(food)) {
        expandSnake(expansionRate)
        food = getRandomFoodPosition()
    }
}
//CONTROLA AS DIMENSÕES DO FOOD
function createFood (gameBoard) {
        const foodElement = document.createElement('div')
        foodElement.style.gridRowStart = food.y
        foodElement.style.gridColumnStart = food.x
        foodElement.classList.add('food')
        gameBoard.appendChild(foodElement)       
    
}

function expandSnake(amount) {
    newSegments += amount
}

function onSnake(position) {
    return snakeBody.some(piece => {
        return equalPositions(piece, position)
    })
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length -1] }) //duplica o ultimo elemento do snake
    }

    newSegments = 0
}

function getRandomFoodPosition() {
    let newFoodPosition
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()   
    }
    return newFoodPosition
}