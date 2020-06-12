'use strict'

var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['trump, blond, president'] },
    { id: 2, url: 'img/2.jpg', keywords: ['puppy, dogs, dog'] },
    { id: 3, url: 'img/3.jpg', keywords: ['puppy, dogs, dog'] },
    { id: 4, url: 'img/4.jpg', keywords: ['puppy, dogs, dog'] },
    { id: 5, url: 'img/5.jpg', keywords: ['puppy, dogs, dog'] },
    { id: 6, url: 'img/7.jpg', keywords: ['puppy, dogs, dog'] },
    { id: 7, url: 'img/8.jpg', keywords: ['puppy, dogs, dog'] },
    { id: 8, url: 'img/9.jpg', keywords: ['puppy, dogs, dog'] },
    { id: 9, url: 'img/10.jpg', keywords: ['puppy, dogs, dog'] },
    { id: 10, url: 'img/11.jpg', keywords: ['puppy, dogs, dog'] },
    { id: 11, url: 'img/12.jpg', keywords: ['puppy, dogs, dog'] },
    { id: 12, url: 'img/13.jpg', keywords: ['puppy, dogs, dog'] },
    { id: 13, url: 'img/14.jpg', keywords: ['puppy, dogs, dog'] },
    { id: 14, url: 'img/15.jpg', keywords: ['puppy, dogs, dog'] },
    { id: 15, url: 'img/16.jpg', keywords: ['puppy, dogs, dog'] },
    { id: 16, url: 'img/17.jpg', keywords: ['puppy, dogs, dog'] },
    { id: 16, url: 'img/18.jpg', keywords: ['puppy, dogs, dog'] },

];

var gMeme = {
    selectedImgId: 3,
    selectedLineIdx: 1,
    lines: [{
            txt: '',
            size: 50,
            align: 'left',
            color: 'red',
            x: 80,
            y: 50
        },
        {
            txt: '',
            size: 30,
            align: 'left',
            color: 'blue',
            x: 80,
            y: 100
        },

    ]
}

function updateSelectedLine(inputId) {
    gMeme.selectedLineIdx = inputId;

}


function updateSelectedTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function getImgs() {
    return gImgs
}

function getMeme() {
    return gMeme;
}

function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff;
}

function changeLineHeight(diff) {
    gMeme.lines[gMeme.selectedLineIdx].y += diff
}

function switchLines() {
    gMeme.selectedLineIdx++
        console.log(gMeme.selectedLineIdx);

    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0
}