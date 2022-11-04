let renderTime = 0
let gameOver = false
const gameBoard = document.getElementById('board')

// atualiza a animação na tela 
function gameLoop(currentTime) {
    if(gameOver) {
       if (confirm('Que pena não foi dessa vez, aperte ok para tentar novamente.')) {
        window.location.reload()
       }
       return
    }

    if(audioActive) {
        bgAudio.play() 
    }

    window.requestAnimationFrame(gameLoop)
    const secSinceLastRender = (currentTime - renderTime) / 1000 //converte de miliseguntos para segundos
    if (secSinceLastRender < 1 / snakeSpeed) return //tempo entre cada movimento em segundos

    renderTime = currentTime

    updateSnake()
    drawSnake()
    checkDeath()
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

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection () 
    if(gameOver) looseAudio.play()
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
let food = { x: 10, y: 10 }
const expansionRate = 5

function updateFood () {
    if (onSnake(food)) {
        expandSnake(expansionRate)
        food = randomFoodPosition()
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
    upLevelAudio.play()
}

function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((piece, index) => {
        if (ignoreHead && index === 0) return false
        return equalPositions(piece, position)
    })
}

function getSnakeHead() {
   return snakeBody[0] 
}

function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true })
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

const gridSize = 21

function randomGridPosition () {
    return {
        x: Math.floor(Math.random() * gridSize) + 1,
        y: Math.floor(Math.random() * gridSize) + 1
    }
}

function randomFoodPosition() {
    let newFoodPosition
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()   
    }
    return newFoodPosition
}

function outsideGrid (position) {
    return (
        position.x < 1 || position.x > gridSize ||
        position.y < 1 || position.y > gridSize
    )
    
}

//AUDIO

const bgAudio = document.getElementById('game-bg-audio')
const upLevelAudio = document.getElementById('up-level')
const looseAudio = document.getElementById('loose')

const btnAudio = document.getElementById('audio')


let audioActive = true

bgAudio.volume = .15


function changeAudio() {
    if(audioActive) {
        bgAudio.pause()
        audioActive = false
        btnAudio.innerHTML = 'Music OFF'
    } else {
        bgAudio.play()
        audioActive = true
        btnAudio.innerHTML = 'Music ON'
    }
}

btnAudio.onclick = changeAudio







