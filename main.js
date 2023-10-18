import './style.css'

document.querySelector('#app').innerHTML = `
    <section class="container">
        <div class="sidebar">
            <div class="container-title">
                <p class="title">Drawing App</p>
                <p class="subtitle">By Gunter</p>
            </div>
            <div class="container-options container-colors">
                <div class="option-color" style="background: red;"></div>
                <div class="option-color" style="background: blue;"></div>
                <div class="option-color" style="background: yellow;"></div>
                <div class="option-color" style="background: orange;"></div>
                <div class="option-color" style="background: green;"></div>
                <div class="option-color" style="background: blueviolet;"></div>
            </div>
            <div class="container-options container-width-lines">
                <div class="option-width w-1" data-width="1"></div>
                <div class="option-width w-4" data-width="4"></div>
                <div class="option-width w-8" data-width="8"></div>
                <div class="option-width w-12" data-width="12"></div>
            </div>
            <div class="options">
                <button class="button" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
                        <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/>
                    </svg>
                </button>
                <button class="button" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-reply-fill" viewBox="0 0 16 16">
                        <path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z"/>
                    </svg>
                </button>
            </div>
            <input type="color">
            <input type="range" min=1 max=20 style="width: 70px;">
        </div>
        <canvas id="canvas"></canvas>
    </section>
`;

const canvas = document.querySelector('#canvas');
const sidebar = document.querySelector('.sidebar');
const container = document.querySelector('.container');


canvas.width = window.innerWidth-100;
canvas.height = window.innerHeight;

const context = canvas.getContext('2d', {willReadFrequently: true});

context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

let isDrawing = false;
// let currentColor = 'black';


const start = (event) => {
    isDrawing =- true;
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    event.preventDefault();
}
const draw = (event) => {
    if(isDrawing) {
        context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        console.log(event.clientX - canvas.offsetLeft);
        console.log(event.clientY - canvas.offsetTop);
        context.strokeStyle = 'black';
        context.lineWidth = 3;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.stroke();
    }
}
const stop = (event) => {
    if(isDrawing) {
        context.stroke();
        context.closePath();
        isDrawing = false;
    }
    event.preventDefault();
}

canvas.addEventListener('touchstart', start, false);
canvas.addEventListener('touchmove', draw, false);
canvas.addEventListener('mousedown', start, false);
canvas.addEventListener('mousemove', draw, false);

canvas.addEventListener('mouseup', stop, false);
canvas.addEventListener('mouseout', stop, false);
canvas.addEventListener('touchend', stop, false);

canvas.style.background = '#fff';

