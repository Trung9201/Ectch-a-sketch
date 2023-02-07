var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)

const selectColor = $('.select-color')
const btnColorMore = $('#color-more')
const btnRainbow = $('#rainbow-more')
const btnEraser = $('#eraser')
const btnClear = $('#clear')
const allBtn = $$('.btn')
const inputRange = $('.input-range')
const inputValue = $('.input-value')
const content  = $('.content')

let color = 'black'
let preInputValue = 16
let contentBlocks
const rainbow = ['red','orange','yellow','green','cyan','blue','violet']


createGrid(16)
changeBackground()
features()


function features(){
    allBtn.forEach(btn => {
    btn.onclick = () => {
        $('.btn.active').classList.remove('active')
        btn.classList.add('active')
         checkActive()
    }
});
}

selectColor.onchange = ()=>{
    color = selectColor.value
}

function setColor(){
    return color = selectColor.value
}

function createGrid(gridBlocks) {
    for(let i = 0; i < gridBlocks; i++) {
        for(let j = 0; j < gridBlocks; j++) {
            const div = document.createElement('div')
            content.appendChild(div)
            div.classList.add('content-block')
            contentBlocks = $$('.content-block')
        }
    }
    content.setAttribute('style',`grid-template-columns:repeat(${gridBlocks},1fr);grid-template-rows:repeat(${gridBlocks},1fr)`)
}

function removeGrid(preGridBlocks){
    for(let i = 0; i < preGridBlocks; i++){
        for(let j = 0; j < preGridBlocks; j++){
            content.removeChild($('.content-block'))
        }
    }
}

function setRainbowColor(){
    let randomColor = Math.floor(Math.random()*7)
    return color = rainbow[randomColor]
}

function changeBackground(){
    contentBlocks.forEach(block=>block.onmouseover = () =>{
        block.setAttribute('style',`background-color:${color}`)
    })
}

function checkActive(){
    switch($('.active').id){
        case 'color-more':
            setColor() 
            changeBackground();
            break;
        case 'rainbow': 
            contentBlocks.forEach(block=>block.onmouseover = () =>{
                setRainbowColor();
                block.setAttribute('style',`background-color:${color}`)
            });
            break;
        case 'eraser': 
            contentBlocks.forEach(block=>block.onmouseover = () =>{
                block.removeAttribute('style')
            })
            break;
        default:
            contentBlocks.forEach(block=>{
                block.removeAttribute('style')
            });
            color = 'white';
            break;
    }
}

inputRange.onchange = () => {

    removeGrid(preInputValue)
    inputValue.textContent = `${inputRange.value} X ${inputRange.value}`
    createGrid(inputRange.value)
    preInputValue = inputRange.value
    features()
    checkActive()
}