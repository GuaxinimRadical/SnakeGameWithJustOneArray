   
    //Leitura Keyboard
    document.addEventListener('keydown', (event) => {
        snake.modeMoviment(event.key)
    });

    

const display = document.getElementById('canvas')

const widthDisplay = 7
const heightDisplay = 7
const pixelsDisplay = widthDisplay * heightDisplay

const speedGame = 200

let guy = []

let indexFruit;

let snake = {
    indexHead: 0,
    length: 5,
    state: 'none',
    modeMoviment(key){
        if(key==='w')
            this.state = 'up'

        if(key==='s')
            this.state = 'down'

        if(key==='a')
            this.state = 'left'

        if(key==='d')
            this.state = 'right'

    }
}

function start(){

    estructure()
    renderDisplay()

    startGame()

    setInterval(loop,speedGame)

}

function startGame(){
    const indexPixelInicio = Math.floor(pixelsDisplay/2)

    snake.indexHead = indexPixelInicio
    guy[indexPixelInicio] = 5
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
        
        let nextIndex

        if(snake.state==='up'){
            nextIndex = snake.indexHead - heightDisplay
        }
        if(snake.state==='down'){
            nextIndex = snake.indexHead + heightDisplay
        }
        if(snake.state==='left'){
            nextIndex = snake.indexHead - 1
        }
        if(snake.state==='right'){
            nextIndex = snake.indexHead + 1
        }

        if(guy[nextIndex]<0){

            snake.length += 1
            guy[nextIndex] = snake.length
            fruitSpawn()

        }else if(guy[nextIndex]===0){

            for(let i=0; i < pixelsDisplay; i++){
                if( guy[i]>0){
                    guy[i] -= 1
                }
            }
            guy[nextIndex] = snake.length
        }else if(guy[nextIndex]>0){
            alert('YOU DIED!')

        } else{
            console.log('SAIUUU!!')
            //clearInterval()
            restart()
        }

        snake.indexHead = nextIndex
        console.log(guy[nextIndex])
    }
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

function restart(){

    for(let i=0; i < pixelsDisplay; i++){
        guy[i] = 0
    }
    start()
}

start()