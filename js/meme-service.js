'use strict'

var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['trump, blond, president,angry, popular, men'] },
    { id: 2, url: 'img/2.jpg', keywords: ['love', 'puppy', 'dog', 'animal', 'cute'] },
    { id: 3, url: 'img/3.jpg', keywords: ['baby', 'sleep', 'cute'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cat', 'animal', 'sleep'] },
    { id: 5, url: 'img/5.jpg', keywords: ['success', 'baby', 'cute'] },
    { id: 5, url: 'img/6.jpg', keywords: ['wonder', 'men'] },
    { id: 6, url: 'img/7.jpg', keywords: ['baby', 'surprised'] },
    { id: 7, url: 'img/8.jpg', keywords: ['wonder', 'smile', 'men'] },
    { id: 8, url: 'img/9.jpg', keywords: ['laugh', 'popular', 'baby', 'cute'] },
    { id: 9, url: 'img/10.jpg', keywords: ['laugh', 'obama'] },
    { id: 10, url: 'img/11.jpg', keywords: ['kiss', 'men'] },
    { id: 11, url: 'img/12.jpg', keywords: ['point', 'men'] },
    { id: 12, url: 'img/13.jpg', keywords: ['cheers', 'smile', 'dicaprio'] },
    { id: 13, url: 'img/14.jpg', keywords: ['amazed', 'popular', 'matrix'] },
    { id: 14, url: 'img/15.jpg', keywords: ['popular', 'men'] },
    { id: 15, url: 'img/16.jpg', keywords: ['awkward', 'lol', 'bald', 'men'] },
    { id: 16, url: 'img/17.jpg', keywords: ['point', 'men', 'russia'] },
    { id: 17, url: 'img/18.jpg', keywords: ['toy story', 'point', 'popular'] }
];


var gMeme = {
    selectedImgId: 3,
    selectedLineIdx: 1,
    lines: [{
            borderColor: 'black',
            textColor: 'white',
            txt: '',
            size: 50,
            align: 'left',
            x: 80,
            y: 50
        },
        {
            borderColor: 'black',
            textColor: 'white',
            txt: '',
            size: 30,
            align: 'left',
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

function changeLinerightLeft(diff) {
    gMeme.lines[gMeme.selectedLineIdx].x += diff
}

function changeBorderColor(color) {
    gMeme.lines.forEach(line => line.borderColor = color);

}

function changeTextColor(color) {
    gMeme.lines.forEach(line => line.textColor = color);

}