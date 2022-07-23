var v0 = document.getElementById("vInput");
var alpha = document.getElementById("alphaInput");
var h = document.getElementById("hInput");

var xout = document.getElementById("outputx");
var vout = document.getElementById("outputv");
var alphaout = document.getElementById("outputalpha");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

ctx.translate(0, canvas.height);
ctx.scale(1,-1);

async function request(){ //this is the function the button will use - it will request a simulation from the server with the inputted initial conditions, await a response, log it
    let vs = v0.value; //variables are recorded in case they get changed while the server is still responding
    let alphas = alpha.value;
    let hs = h.value;
    var data = await fetch(`http://localhost:3000/calculation?v0=${vs}&alpha=${alphas}&h=${hs}`)
        .then(data => data.json())
        .then(data => {
            xout.innerHTML="Horizontal Position: " + data[0]; 
            vout.innerHTML="Velocity: " + data[1]; 
            alphaout.innerHTML="Angle: " + data[2];

            ctx.clearRect(0,0,canvas.width, canvas.height); //reset screen
            
            ctx.fillStyle = 'black';
            for(let i=0; i<data[3].length; i++){ //draw path
                ctx.beginPath();
                ctx.arc(data[3][i]*canvas.width/20, data[4][i]*canvas.height/20, 3, 0, 2*Math.PI);
                ctx.fill();    
                ctx.closePath();
            }

            ctx.beginPath(); //draw start
            ctx.fillStyle = 'black';
            ctx.arc(0, hs/20*canvas.height, 10, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();

            ctx.beginPath(); //draw end
            ctx.fillStyle = 'red';
            ctx.arc(data[0]/20*canvas.width, 0, 10, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();
        });
}