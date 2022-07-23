const express = require('express');
const app = express();
const cors = require('cors');

class Rocket{
    constructor(v0, alpha, h){
        this.v0 = v0;
        this.alpha = alpha;
        this.h = h;
    }

    calc(){ //returns [x, v, alpha] at the end of the flight
        
        let t0 = (this.v0*Math.sin(this.alpha)+Math.sqrt(this.v0**2*Math.sin(this.alpha)**2+2*this.h*g))/g;

        let xarr=[];
        let yarr = [];

        for(let i=1; i<7; i++){ //7 is arbitrary, could also make a variable for this
            xarr.push(i*t0/7 * this.v0 * Math.cos(this.alpha));
            yarr.push(-g/2*(i*t0/7)**2+this.v0*Math.sin(this.alpha)*(i*t0/7)+this.h);
        }

        return [this.v0*Math.cos(this.alpha)*t0 , Math.sqrt(this.v0**2+2*this.h*g), 
                Math.atan2(Math.sqrt(this.v0**2*Math.sin(this.alpha)**2+2*this.h*g), this.v0*Math.cos(this.alpha)), xarr, yarr]; //added point array for bonus
                //simple calculations
    }
}

const g = 9.8;

app.use(cors());

app.get('/calculation', (req, res)=>{
    let a = new Rocket(parseFloat(req.query.v0), parseFloat(req.query.alpha), parseFloat(req.query.h));
    res.json(a.calc());
})

app.listen(3000);

