class Physics{
    static hello(){
        console.log("This is PS.js ver 0.0.1");
    }
    /**
     * checks if two collider2d collide, conditionally resolves the collision
     * @param {Collider2d} Cleft 
     * @param {Collider2d} Cright 
     * @param {boolean} shouldResolve if this is true it resolves the collision, otherwise it just returns
     * @returns {boolean} true if there is a collision, false otherwise
     */
    static checkCollision(Cleft, Cright, shouldResolve){
        collision = false;
        outer: for(let i = 0; i < Cleft.triangles.length; i++){
            for(let j = 0; j < Cright.triangles; j++){
                if(Physics.isOverlapping(Cleft.triangles[i], Cright.triangles[j])){
                    collision = true;
                    break outer;
                }
            }
        }
        if(!collision) return false; //return early when no collision
        //collided!
        if(!shouldResolve) return true; //abort resolution
        //resolve
        return true;
    }
    static isOverlapping(Tleft, Tright){
        return Tright.points.any(point=>Tleft.isOver(point)) || Tleft.points.any(point=>Tright.isOver(point));
    }
}

class Transform{
    /** 
     * @param {float} scaleX the Transform's scale on the X axis.
    */
    scaleX;
    /** 
     * @param {float} scaleY the Transform's scale on the Y axis.
    */
    scaleY;
    /** 
     * @param {float} scaleZ the Transform's scale on the Z axis.
    */
    scaleZ;
    /** 
     * @param {float} X the Transform's position on the X axis.
    */
    X;
    /** 
     * @param {float} Y the Transform's position on the Y axis.
    */
    Y;
    /** 
     * @param {float} Z the Transform's position on the Z axis.
    */
    Z;
    /** 
     * @param {float} W the Transform's rotation in some form optionally.
    */
    W;
    /**
     * Please don't use this. The static functions "FromValues", "FromVector2" and "FromVector3" are filling the role of this for you.
    */
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
    /**
    * This function changes the Transform itself and returns no values.
    * It adds a Vec2 to the Transform's X and Y values.
    * @param {Vec2} vector2 A Vec2 object with the properties x and y, both floats.
    */
    AddVector2(vector2){
        this.X += vector2.x;
        this.Y += vector2.y;
    }
    /**
    * This function changes the Transform itself and returns no values.
    * It adds a Vec3 to the Transform's X, Y and Z values.
    * @param {Vec3} vector3 A Vec3 object with the properties x, y and z both floats.
    */
    AddVector3(vector3){
        this.X += vector3.x;
        this.Y += vector3.y;
        this.Z += vector3.z;
    }
    /**
    * This function changes the Transform itself and returns no values. 
    * It adds a Transform object's position values to the Transform's position values.
    * @param {Transform} transform A Transform object.
    */
    AddTransform(transform){
        this.X += transform.X;
        this.Y += transform.Y;
        this.Z += transform.Z;
        this.W += transform.W;
    }
    /**
     * This function changes the Transform itself and returns no values.
     * Multiplies all of the Scale values of the Transform by a float.
     * @param {float} scale
     */
    MultiplyByScale(scale){
        this.scaleX *= scale;
        this.scaleY *= scale;
        this.scaleZ *= scale;
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
class Triangle{
    /**
     * creates a new triange
     * @param {Vec2[]} points the three points of the triangle
     */
    constructor(points){
        this.points = points;
    }
    /**
     * returns true if the triangle is over the given point, otherwise false
     * @param {Vec2} point to be tested against the triangle
     * @returns {boolean}
     */
    isOver(point){
        console.error("not implemented");
    }
}
class Collider2d{
    /**
     * Creates a new collideer
     * @param {Triangle[]} triangles the triangles defining the shape of the collider
     */
    constructor(triangles){
        this.triangles = triangles;
    }
    /**
     * renderes the oulines of all triangles to the given context, with the given colour
     * @param {CanvasRenderingContext2D} context the rendering context to use
     * @param {String | CanvasGradient | CanvasPattern} colour the colour the outline should be
     */
    debugRender(context, colour){
        context.strokeStyle = colour;
        context.beginPath();
        this.triangles.forEach(tri=>{
            context.MoveTo(tri.points[2].x, tri.points[2].y);
            tri.points.forEach(point=>context.LineTo(point.x, point.y));
        });
        context.closePath();
        context.stroke();
    }
}