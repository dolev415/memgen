'use strict'

var gElCanvas;
var gCtx;
var gCurrColor
var gFillColor
var gCurrImg

function onInit() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');

    renderGallery()
    focusWriting(0);
    resizeCanvas();


}

// rendering the imgs 
function renderGallery() {
    var imgs = getImgs()

    var strHtmls = imgs.map(img => {
        return `<img onclick="drawImg(this) "src="${img.url}" alt="${img.keywords}"  >`
    })
    console.log(strHtmls)
    document.querySelector('.gallery-imgs').innerHTML = strHtmls.join('')
}
//put the chupchik of the writing on the first line
function focusWriting(lineIdx) {
    let elCurrLine = document.getElementById(lineIdx);
    elCurrLine.focus()
}
// rendering the meme 
function renderMeme() {
    clearCanvas()
    drawImg(gCurrImg)
    var meme = getMeme();
    meme.lines.forEach(line => {
        drawTxt(line)
    });
}

// draw the chosen img on canvas
function drawImg(elImg) {
    gCurrImg = elImg
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
}
// draw the chosen text only on image, cant draw on cleared canvas
function drawTxt(line) {
    gCtx.lineWidth = '2';
    gCtx.font = `${line.size}px impact`;
    gCtx.strokeFill = 'white';
    gCtx.textAlign = line.align;
    gCtx.strokeStyle = line.color;
    gCtx.strokeText(line.txt, line.x, line.y);
    gCtx.fillStyle = 'white';
    gCtx.fillText(line.txt, line.x, line.y);
}

// make sure works
function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
}

//for adding more and more lines......

// function renderLines(nextLineIdx) {
//     var elLines = document.querySelector('.lines');
//     var strHtml =
//         `<label>Enter txt<input onclick="onUpdateSelectedLine(this)" onkeyup="onUpdateSelectedTxt(this)" id="${nextLineIdx}"
//         type="text" name="text"></input></label>`
//     var elLines = document.querySelector('.lines')
//     elLines.innerHTML += strHtml;
// }

// function onAddLine() {

//     var nextLineIdx = getNextLineIdx();
//     console.log('yes' + nextLineIdx)
//     renderLines(nextLineIdx);
// }

function onUpdateSelectedLine(elInput) {
    updateSelectedLine(elInput.id)

}

function onUpdateSelectedTxt(elTxt) {
    updateSelectedTxt(elTxt.value) //going to the sevice
    renderMeme() //rendering the text to the img
}

// clear the canvas 
function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}
//download the canvas to pc
function onDownloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my_img';
}
//increase/decrease font
function onChangeFontSize(diff) {
    changeFontSize(diff)
    renderMeme()
}
//move the line up and down
function onChangeLineHeight(diff) {
    changeLineHeight(diff)
    renderMeme()
}
//change the focus of the page (the chupchik)
function onSwitchLine() {
    switchLines()
    var meme = getMeme();
    focusWriting(meme.selectedLineIdx)
    renderMeme()
}
//show gallery and hide meme and about or the opposite
// function show(elList) {

//     var testClass = elList.className;
//     var elController = document.querySelector('.sectors');
//     var elGallery = document.querySelector('.gallery-container');
//     var elAbout = document.querySelector('.about-description');
//     switch (testClass) {
//         case "gallery":
//             elController.classList.add('hide')
//             elGallery.classList.remove('hide')
//             break;
//         case "about":
//             elAbout.classList.add('flex')
//             break;
//         case "meme":
//             elController.classList.add('flex')
//             elGallery.classList.add('hide')
//             break;
//     }
// }

function show(li) {
    console.log(li)
    var liClass = li.className;
    var elController = document.querySelector('.hideAndShow');
    var elGallery = document.querySelector('.gallery-container');
    console.log(elGallery)
    console.log(elController)
    switch (liClass) {
        case "gallery":
            elGallery.classList.remove('hide');
            elController.classList.add('hide');
            break;
        case "meme":
            elGallery.classList.add('hide');
            elController.classList.remove('hide');
            break;
    }

}