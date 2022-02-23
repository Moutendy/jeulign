const canvas = document.getElementById('canvas');
//le type d'image ici nous avons choisi la 2d
const ctx = canvas.getContext('2d');

const img = new Image();

const img1 = new Image();
img.src='image1.png';

img1.src='image2.0.png';
//configuration general

let gamePlaying = false;
const gravity = .5;
const speed = 10.2;
const size = [195, 126];
const sizes = [1000, 106];
const jump = -11.5;
const cTenth = (canvas.width / 10);

//les variable qui varient
//il va gerer les effect optique de mouvement
let index = 0,
bestScore = 0,
currentScore = 0,
pipes=[],
flight,//le vole 
flyHeight ;//la hauteur de vole
//pipe setting
const pipeWidth = 78;
const pipeGap = 270;

const pipeLoc = () => (Math.random() * ((canvas.height - (pipeGap + pipeWidth)) -pipeWidth)) + pipeWidth;
const setup = () =>
{
    currentScore =0;
    flight = jump;
    flyHeight = (canvas.height/2) - (size[1]/2);
    pipes = Array(3).fill().map((a,i) => [canvas.width + (i*(pipeGap + pipeWidth)),pipeLoc()]);
    console.log(pipes);
}


//les gestiionnaire d'animation
const render = () =>
{
    index =index +0.2;

ctx.drawImage(img,250,400,canvas.width,canvas.height,-((index * (speed*3))%canvas.width)+canvas.width,200,canvas.width,canvas.height);
ctx.drawImage(img,250,400,canvas.width,canvas.height,-((index * (speed*3))%canvas.width),200,canvas.width,canvas.height);
ctx.drawImage(img,250,450, ...sizes,-((index * (3*speed))%canvas.width),0, ...sizes);
ctx.drawImage(img,250,450, ...sizes,-((index * (3*speed))%canvas.width)+canvas.width,0, ...sizes);
if(gamePlaying)
{
    ctx.drawImage(img,14,Math.floor((index % 9) / 3)* size[1],...size,cTenth,flyHeight, ...size);
    flyHeight = Math.min(flyHeight + flight,canvas.height - size[1]);
    flight += gravity;
} 
else
{

flyHeight =(canvas.height / 10) - (size[1]/7);


ctx.fillText('Click pour commencer Meilleur score :'+bestScore,10,345);



ctx.font = "bold 20px courier";
}
//pipe dispaly





    window.requestAnimationFrame(render);
}
setup();
img.onload = render;
document.addEventListener('click',() => gamePlaying=true);
window.onclick = () => flight = jump;