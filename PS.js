class physics{
    static hello(){
        console.log("This is PS.js ver 0.0.1");
    }
}
class Mat2{
    constructor(xx, xy, yx ,yy){
        this.xx = xx;
        this.xy = xy;
        this.yx = yx;
        this.yy = yy;
    }
    transpose(){
        return new Mat2(this.xx, this.yx, this.xy, this.yy);
    }
    inverse(){
        console.error("I forbor");
    }
}
class Vec2{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    add(v){return new Vec2(this.x + v.x, this.y + v.y);}
    sub(v){return new Vec2(this.x - v.x, this.y - v.y);}
    scale(c){return new Vec2(this.x*c, this.y*c);}
    mul(M){return new Vec2(this.x*M.xx + this.y*M.xy, this.y*M.yy + this.x*M.yx);}

}

