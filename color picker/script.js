const columns = document.querySelectorAll('.column')

document.addEventListener('keydown', event => { // обработчик нажатия на пробел
    event.preventDefault()
    if (event.code.toLowerCase() == 'space') {
        setRandomColros()
    }
})

document.addEventListener('click', (event) => { // находим класс у иконки по его data-type значению и проверка на data-type h2 заголовка для копирования значения цвета
    const type = event.target.dataset.type 

    if (type == 'lock') { // проверка есть ли data-type="lock"
       const node = 
        event.target.tagName.toLowerCase() == 'i'
            ? event.target
            : event.target.children[0]
            
        node.classList.toggle('fa-unlock-alt') // меняем класс
        node.classList.toggle('fa-lock')
    }   else if (type == 'copy') {
        copyToClickBoard(event.target.textContent)
    }
})


function copyToClickBoard(text) { // функции коирования в буффер обмена
    return navigator.clipboard.writeText(text)
}


function generateRandomColor() {  // функция генерации цвета
    // RGB
    // #FF0000
    // #00FF00
    // #0000FF

    const  hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}

 
function setRandomColros(isInitial) { // функция замены значений фона и текста цвета при нажатии на пробел 
    const colors = isInitial ? getColorsFromHash() : []
    columns.forEach((column, index) => {
        const isLocked = column.querySelector('i').classList.contains('fa-lock')
        const text = column.querySelector('h2')
        const button = column.querySelector('button')
        
        if (isLocked) {
            colors.push(text.textContent)
            return
        }

        const color = isInitial 
        ? colors[index] 
            ? colors[index]
            : chroma.random()
        : chroma.random() // подключенная библиотека chroma, можно использовать generateRandomColor()

        if (!isInitial) {
            colors.push(color)
        }

        text.textContent = color // замена текста фона 
        column.style.background = color // замена цвета фона

        setTextColor(text, color)
        setTextColor(button, color)
    })

    updateColorsHash(colors)
}


function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5? 'black' : 'white'
}


function updateColorsHash(colors = []) {
    document.location.hash = colors
        .map((column) => {
            return column.toString().substring(1)
        })
        .join('-')
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash
        .substring(1)
        .split('-')
        .map(color => '#' + color)
    }
    return []
}

setRandomColros(true)