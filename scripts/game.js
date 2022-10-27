let renderTime = 0
const gameBoard = document.getElementById('board')

// atualiza a animação na tela 
function gameLoop(currentTime) {
    window.requestAnimationFrame(gameLoop)
    const secSinceLastRender = (currentTime - renderTime) / 1000
    if (secSinceLastRender < 1 / snakeSpeed) return

    renderTime = currentTime

    updateSnake()
    drawSnake()
}

    window.requestAnimationFrame(gameLoop)


//SNAKE PART

const snakeSpeed = 1 
const snakeBody = [{ x: 11, y: 11 }] 

function updateSnake () {
    const inputDiretion = getDirection()
    for(let i = snakeBody.length - 2; i >= 0; i--){
        snakeBody[i + 1] = { ...snakeBody[i] } // new object
    }

    snakeBody[0].x += direction.x
    snakeBody[0].y += direction.y
}

function createSnake (gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)       
    })
}

function drawSnake () {
    gameBoard.innerHTML = ''
    createSnake(gameBoard)
}

//INPUT PART

let direction = {x: 0, y: 0}

function getDirection() {
    return getDirection
}