class Rocket{
    constructor(v0, alpha, h){
        this.v0 = v0;
        this.alpha = alpha;
        this.h = h;
    }

    calc(){ //returns [x, v, alpha] at the end of the flight
        
        let t0 = (this.v0*Math.sin(this.alpha)+Math.sqrt(this.v0**2*Math.sin(this.alpha)**2+2*this.h*g))/g;

        return [this.v0*Math.cos(this.alpha)*t0 , Math.sqrt(this.v0**2+2*this.h*g), 
                Math.atan2(Math.sqrt(this.v0**2*Math.sin(this.alpha)**2+2*this.h*g), this.v0*Math.cos(this.alpha))];
                //simple calculations
    }
}

const g = 9.8;

var rocket = new Rocket(2, Math.PI/3, 3);
console.log(rocket.calc());