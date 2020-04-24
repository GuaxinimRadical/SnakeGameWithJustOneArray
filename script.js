   
    //Leitura Keyboard
    document.addEventListener('keydown', (event) => {
        snake.switchMoviment(event.key)
    });

    

const display = document.getElementById('canvas')

const widthDisplay = 8
const heightDisplay = 7
const pixelsDisplay = widthDisplay * heightDisplay
var timerLoop

const speedGame = 200

const walls = false //Define se a cobra tentar atravessar a borda é considerado derrota

let guy = []

let indexFruit;

const snake = {
    indexHead: 0,
    length: 5,
    state: 'none',
    switchMoviment(key){
        if(key==='w' && this.state!=='down')
            this.state = 'up'

        if(key==='s' && this.state!=='up')
            this.state = 'down'

        if(key==='a' && this.state!=='right')
            this.state = 'left'

        if(key==='d' && this.state!=='left')
            this.state = 'right'
    }
}

function start(){

    estructure()
    renderDisplay()

    startGame()

    timerLoop = setInterval(loop,speedGame)

}

function startGame(){
    const indexPixelInicio = Math.floor(pixelsDisplay/2)

    snake.indexHead = indexPixelInicio
    guy[indexPixelInicio] = snake.length
    console.log(indexPixelInicio)

    renderDisplay()
    fruitSpawn()

}

function loop(){
    eatFruit()
    renderDisplay()
}



function eatFruit(){
    if(snake.state!=='none'){

        if(walls==true && borderCollapse()!==false)
            endGame()

        let nextIndex
        
        if(snake.state==='up'){
            nextIndex = nextIndex = borderCollapse()==='up' 
                ? (snake.indexHead+((heightDisplay-1)*widthDisplay)) : snake.indexHead - widthDisplay
        }
        if(snake.state==='down'){
            nextIndex = nextIndex = borderCollapse()==='down' 
                ? (snake.indexHead-((heightDisplay-1)*widthDisplay)) : snake.indexHead + widthDisplay
        }
        if(snake.state==='left'){
            nextIndex = borderCollapse()==='left' 
                ? (snake.indexHead+widthDisplay)-1 : snake.indexHead - 1
        }
        if(snake.state==='right'){
            nextIndex = borderCollapse()==='right' 
                ? (snake.indexHead-widthDisplay)+1 : snake.indexHead + 1
        }

        if(guy[nextIndex]<0){

            snake.length += 1
            guy[nextIndex] = snake.length
            fruitSpawn()

        } else if(guy[nextIndex]===0){

            guy = guy.map( bloco => {
                return bloco>0 ? bloco-=1 : bloco
            })
            guy[nextIndex] = snake.length

        } else{
            endGame()
        }

        snake.indexHead = nextIndex
        // console.log(guy[nextIndex])
    }
}

function borderCollapse(){
    let wallRight = []
    let wallLeft = []
    let rowUp = []
    let rowDown = []

    for(let i =1; i<=heightDisplay; i++){ // for() começa em 1 e termina com o valor de heightDisplay
        wallRight.push( (widthDisplay*i)-1 )
        wallLeft.push( widthDisplay*(i-1) )
    }
    for(let i =0; i<widthDisplay; i++){ 
        rowUp.push(i)
        rowDown.push( ( widthDisplay*(heightDisplay-1) ) +i )
    }

    
    const headSnakeIsInBorder = border => border.filter(c => c==snake.indexHead).length

    if(snake.state=='up' && headSnakeIsInBorder(rowUp)){
        return 'up'
    }
    if(snake.state=='down' && headSnakeIsInBorder(rowDown)){
        return 'down'
    }
    if(snake.state=='right' && headSnakeIsInBorder(wallRight)){
        return 'right'
    }
    if(snake.state=='left' && headSnakeIsInBorder(wallLeft)){
        return 'left'
    }

    return false //Se não tiver caido em nenhum 'if' de cima
}

function estructure(){
    for(let i=0; i < pixelsDisplay; i++){
        guy[i] = 0
    }
}

function fruitSpawn(){

    let randon = Math.floor(Math.random()*pixelsDisplay)

    if ( guy[randon] === 0){
        indexFruit = randon
        guy[indexFruit] = -1
    } else{
        fruitSpawn()
    }

}

function renderDisplay(){
    let html = '<table cellpadding=0 cellspacing=0>'

    for (let row = 0; row < heightDisplay; row++) {
        html += '<tr>'
    
        for (let column = 0; column < widthDisplay; column++) {
            const pixelIndex = column + ( widthDisplay *row )
            const pixel = guy[pixelIndex]
            const colors = [ '#72B5A4','#595757','#f15e5e']
            const stylePixel = () => {
                if(guy[pixelIndex]<0)
                    return colors[2]
                if(guy[pixelIndex]===0)
                    return colors[1]
                if(guy[pixelIndex]>0)
                    return colors[0]
            }

            //const stylePixel = guy[pixelIndex]<0 ? colors[2] : () => { if(guy[pixelIndex===0]){return colors[1]}else{return colors[0]}}

            html += "<td style= background-color:" + stylePixel() + ";>"
            html += "<div class='index'>"+pixelIndex+"</div>"
            html += "<div >"+pixel+"</div>"
            html += '</td>'

            /*html += '<td>'
            html += "<div class='index'>"+pixelIndex+"</div>"
            html += "<div style= background-color:" + stylePixel() + ";>"+pixel+"</div>"
            html += '</td>'*/
        }
    
        html += '</tr>'
      }
    
      html += '</table>'
    
      document.querySelector('#canvas').innerHTML = html 
}

function endGame(){
    //Função para quando o jogador perder
    //alert('Você perdeu!')
    clearInterval(timerLoop)
}

start()