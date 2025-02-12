class Physics{
    static hello(){
        console.log("This is PS.js ver 0.0.1");
    }
}

class Transform{
    constructor(x,y,z,w){
        this.X=x;
        this.Y=y;
        this.Z=z;
        this.W=w;
    }
    /**
    * Creates a brand new Transform class object
    * @param {float} x position x 
    * @param {float} y position y 
    * @param {float} z position z 
    * @param {float} w rotation w
    * @returns {Transform} new Transform
    */
    static FromValues(x,y,z,w){
        return new Transform(x,y,z,w);
    }    
    /**
    * Creates a brand new Transform class object with the z and w values as 0 from a Vector2;
    * @param {Vec2} vector2 A Vec2 object with the properties x and y, both floats;
    * @returns {Transform} new Transform
    */
    static FromVector2(vector2) {
        return new Transform(vector2.x,vector2.y,0,0);
    }
    /**
    * Creates a brand new Transform class object with the w value as 0 from a Vector2;
    * @param {Vec3} vector3 A Vec3 object with the properties x, y and z, all floats;
    * @returns {Transform} new Transform
    */
    static FromVector3(vector3){
        return new Transform(vector3.x,vector3.y,vector3.z,0);
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

