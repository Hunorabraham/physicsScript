class Physics{
    static hello(){
        console.log("This is PS.js ver 0.0.1");
    }
}

class Transform{
    /** 
     * @param {float} scaleX the Transform's scale on the X axis.
     * @param {float} scaleY the Transform's scale on the Y axis.
     * @param {float} scaleZ the Transform's scale on the Z axis.
    */
    scaleX;
    scaleY;
    scaleZ;
    constructor(x,y,z,w){
        this.X = x;
        this.Y = y;
        this.Z = z;
        this.W = w;
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
    static FromVector2(vector2){
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
    /**
     * returns a new Mat2 object, that applies a rotation around the origin by the given angle
     * @param {float} angle the angle in radians
     * @returns {Mat2} the new Mat2
     */
    static rotation(angle){
        return new Mat2(Math.cos(angle), - Math.sin(angle), Math.sin(angle), Math.cos(angle));
    }
    /**
     * returns the transpose of the Mat2
     * @returns {Mat2} the new Mat2
     */
    transpose(){
        return new Mat2(this.xx, this.yx, this.xy, this.yy);
    }
    /**
     * don't even ask
     */
    inverse(){
        console.error("I forbor");
    }
    /**
     * modifies the original Mat2, turns it into it's transpose
     * @returns {Mat2} self
     */
    transposeInto(){
        let temp = this.xy;
        this.xy = this.yx;
        this.yx = temp;
        return this;
    }
}
class Vec2{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    /**
     * Returns a new vec2 with the members added together
     * @param {Vec2} v Vec2 object 
     * @returns {Vec2} the new vec2
     */
    add(v){return new Vec2(this.x + v.x, this.y + v.y);}
    /**
     * Returns a new vec2 with the members subtracted from left
     * @param {Vec2} v Vec2 object 
     * @returns {Vec2} the new vec2
     */
    sub(v){return new Vec2(this.x - v.x, this.y - v.y);}
    /**
     * Returns a new vec2, that is scaled by the given value
     * @param {float} c a scalar value
     * @returns {Vec2} the new vec2
     */
    scale(c){return new Vec2(this.x*c, this.y*c);}
    /**
     * Returns a new vec2 that has the transformation of M applied
     * @param {Mat2} M Mat2 object
     * @returns {Vec2} the new vec2
     */
    mul(M){return new Vec2(this.x*M.xx + this.y*M.xy, this.y*M.yy + this.x*M.yx);}
    /**
     * modifies the original vec2 object, adds the members together
     * @param {Vec2} v Vec2 object
     * @returns {Vec2} self
     */
    addInto(v){
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    /**
     * modifies the original vec2 object, subtracts the members from left
     * @param {Vec2} v Vec2 object
     * @returns {Vec2} self
     */
    subInto(v){
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    /**
     * modifies the original vec2 object, scales members by the given value
     * @param {float} c a scalar value
     * @returns {Vec2} self
     */
    scaleInto(c){
        this.x *= c;
        this.y *= c;
        return this;
    }
    /**
     * modifies the original vec2 object, applies the transformation M to it
     * @param {Mat2} M Mat2 object
     * @returns {Vec2} self
     */
    mulInto(M){
        this.x = this.x*M.xx + this.y*M.xy;
        this.y = this.y*M.yy + this.x*M.yx;
        return this;
    }
}

