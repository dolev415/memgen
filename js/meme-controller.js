'use strict'

var gElCanvas;
var gCtx;
var gCurrColor
var gFillColor
var gCurrImg
var gCanDrag;

function onInit() {

    gElCanvas = document.getElementById('my-canvas');

    gCtx = gElCanvas.getContext('2d');

    renderGallery()

}

// rendering the imgs 
function renderGallery() {
    var imgs = getImgs()

    var strHtmls = imgs.map(img => {
        return `<img onclick="drawImg(this)"src="${img.url}" alt="${img.keywords}"  >`
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
    // clearCanvas()
    drawImg(gCurrImg)
    var meme = getMeme();
    meme.lines.forEach(line => {
        drawTxt(line)
    });
}

// draw the chosen img on canvas
function drawImg(elImg) {


    document.querySelector('.controller').classList.remove('hide');
    document.querySelector('.controller').classList.add('flex');
    document.querySelector('.canvas-container').classList.remove('hide');
    document.querySelector('.gallery-container').classList.add('hide');
    resizeCanvas()
    gCurrImg = elImg
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
    var meme = getMeme();
    meme.lines.forEach(line => {
        drawTxt(line)
    });

}
// draw the chosen text only on image, cant draw on cleared canvas
function drawTxt(line) {
    gCtx.lineWidth = '2';
    gCtx.font = `${line.size}px impact`;
    gCtx.strokeFill = 'white';
    gCtx.textAlign = line.align;
    gCtx.strokeStyle = line.borderColor;
    gCtx.strokeText(line.txt, line.x, line.y);
    gCtx.fillStyle = line.textColor
    gCtx.fillText(line.txt, line.x, line.y);
}

// make sure works
function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
}

function onWheelFontSize(ev) {
    ev.preventDefault();
    if (ev.wheelDelta < 0) changeFontSize(-2);
    else changeFontSize(1);
    renderMeme();
    if (getMeme().lines[getMeme().selectedLineIdx].size < 0) return;
    document.querySelector('.font-size').innerText = getMeme().lines[getMeme().selectedLineIdx].size
    document.querySelector('[name="fontSize"]').value = getMeme().lines[getMeme().selectedLineIdx].size;
}


function onSwitchLine(ev) {
    switchLines()
    var meme = getMeme();
    focusWriting(meme.selectedLineIdx)
    renderMeme()
    if (ev.type === 'click') {
        renderMeme();
    } else {
        var offsetY = ev.offsetY;
        console.log(offsetY);
        getMeme().lines.forEach((line, idx) => {
            console.log('line.y - line.size:' + (line.y - line.size))
            console.log('line.size' + (line.size))
            console.log('line.y:' + (line.y))
            console.log('offsetY:' + (offsetY))
            if (idx === getMeme().selectedLineIdx) gCanDrag = true;
            else if (offsetY >= (line.y + line.size) && offsetY <= line.y) {
                getMeme().selectedLineIdx = idx;
                renderMeme();
                gCanDrag = true;
            }
        })
    }

}


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
var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
//uploadImage
function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function(event) {
        var img = new Image();
        img.onload = function() {

            gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        }
        img.src = event.target.result;
        // var imgObj = createImg(g, img.src, 'blabla');
        // console.log(imgObj)
        // gImgs.push(imgObj);
        // var elImg = `<img src="${imgObj.url}" alt="${imgObj.keywords}"  >`
        // console.log(elImg)
        // drawImg(elImg);
    }
    reader.readAsDataURL(e.target.files[0]);
    drawImg(this)
    resizeCanvas();
}
// on submit call to this function
function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gElCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }

    doUploadImg(elForm, onSuccess);

}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('https://ca-upload.com/here/upload.php', {
            method: 'POST',
            body: formData
        })
        .then(function(res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function(err) {
            console.error(err)
        })
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
//move the line right and left
function onChangeLineRightLeft(diff) {
    changeLinerightLeft(diff)
    renderMeme()
}
//change the focus of the page (the chupchik)
// function onSwitchLine() {
//     switchLines()
//     var meme = getMeme();
//     focusWriting(meme.selectedLineIdx)
//     renderMeme()
// }

function onChangeBorderColor(color) {
    changeBorderColor(color)
    renderMeme()
}

function onChangeTextColor(color) {
    changeTextColor(color)
    renderMeme()
}

function toggleDrag() {
    gCanDrag = !gCanDrag;
}

function stopDrag() {
    gCanDrag = false;
}

function dragLines(ev) {
    if (!gCanDrag) return;

    ev.preventDefault();
    const line = getMeme().lines[getMeme().selectedLineIdx];
    line.x = ev.offsetX;
    line.y = ev.offsetY;
    renderMeme()
}

function move(keyboardEvent) {

    switch (keyboardEvent.code) {
        case 'ArrowUp':
            onChangeLineHeight(-5)
            break;
        case 'ArrowDown':
            onChangeLineHeight(5)
            break;
        case 'ArrowLeft':
            onChangeLineRightLeft(-5)
            break;
        case 'ArrowRight':
            onChangeLineRightLeft(5)
            break;
        default:
            return null;
    }
}

function show(li) {
    var liClass = li.className;
    switch (liClass) {
        case "gallery":
            document.querySelector('.controller').classList.remove('flex');
            document.querySelector('.controller').classList.add('hide');
            document.querySelector('.canvas-container').classList.add('hide');
            document.querySelector('.gallery-container').classList.remove('hide');
            break;

        case "meme":

            document.querySelector('.controller').classList.remove('hide');
            document.querySelector('.controller').classList.add('flex');
            document.querySelector('.canvas-container').classList.remove('hide');
            document.querySelector('.gallery-container').classList.add('hide');
            break;
    }

}