/**
 * @version 0.0.1
 * @method hello logs the current version of PhysicsScript onto the console.
 * @method checkCollision
 * @method isOverlapping
 */
class Physics{
    static hello(){
        console.log("This is PS.js ver 0.0.1");
    }
    /**
     * checks if two collider2d collide, conditionally resolves the collision
     * @param {Collider2D} Cleft 
     * @param {Collider2D} Cright 
     * @param {boolean} shouldResolve if this is true it resolves the collision, otherwise it just returns
     * @returns {boolean} true if there is a collision, false otherwise
     * @todo resolve  
     */
    static checkCollision(Oleft, Oright, shouldResolve){
        let Cleft = Oleft.collider;
        let Cright = Oright.collider;
        let normal_vec = Vec2.Zero();
        outer: for(let i = 0; i < Cleft.triangles.length; i++){
            for(let j = 0; j < Cright.triangles.length; j++){
                if(Physics.isOverlapping(Cleft.triangles[i], Oleft.position, Cright.triangles[j], Oright.position)){
                    if(!shouldResolve){
                        return true; // return immediatelly
                    }
                    overlaps.push(Cleft.triangles[i]);
                    overlaps.push(Cright.triangles[j]);
                }
            }
        }
        if(!collision) return false; //return early when no collision
        //collided!
        if(!shouldResolve) return true; //abort resolution
        return true;
    }
    /**
     * 
     * @param {Triangle} Tleft 
     * @param {Triangle} Tright 
     * @returns {boolean} true if there is a collision, false otherwise
     */
    static isOverlapping(Tleft, Gleft, Tright, Gright){
        return Tright.points.some(point=>Tleft.isOver(point.add(Gright).sub(Gleft))) || Tleft.points.some(point=>Tright.isOver(point.add(Gleft).sub(Gright)));
    }
    static getNormalVector(Tleft, Gleft, Tright, Gright){
        let left_points = Tleft.points.map(p=>p.add(Gleft));
        let right_points = Tright.points.map(p=>p.add(Gright));
        let left_center = Tleft.center.add(Gleft);
        let right_center = Tright.center.add(Gright);
        let left_overlaps = left_points.map(p=>Triangle.isAnonymOver(right_points,p));
        let right_overlaps = right_points.map(p=>Triangle.isAnonymOver(left_points,p));

    }
}

/** 
* @author Krys
* @version 1.0.7
* @property {number} scaleX - the Transform's scale on the X axis.
* @property {number} scaleY - the Transform's scale on the Y axis.
* @property {number} scaleZ - the Transform's scale on the Z axis.
* @property {number} X - the Transform's position on the X axis.
* @property {number} Y - the Transform's position on the Y axis.
* @property {number} Z - the Transform's position on the Z axis.
* @property {number} W the Transform's rotation in some form optionally.
*/
class Transform{
    /**
     * @depracated Please don't use this. The static functions "FromValues", "FromVector2" and "FromVector3" are filling the role of this for you.
    */
    constructor(x,y,z,w){
        this.X = x;
        this.Y = y;
        this.Z = z;
        this.W = w;
    }
    /**
    * Creates a brand new Transform class object
    * @constructor
    * @param {number} x position x 
    * @param {number} y position y 
    * @param {number} z position z 
    * @param {number} w rotation w
    * @returns {Transform} new Transform
    */
    static FromValues(x,y,z,w){
        return new Transform(x,y,z,w);
    }    
    /**
    * Creates a brand new Transform class object with the z and w values as 0 from a Vector2;
    * @param {Vec2} vector2 A Vec2 object with the properties x and y, both numbers;
    * @returns {Transform} new Transform
    */
    static FromVector2(vector2){
        return new Transform(vector2.X,vector2.Y,0,0);
    }
    /**
    * Creates a brand new Transform class object with the w value as 0 from a Vector2;
    * @param {Vec3} vector3 A Vec3 object with the properties x, y and z, all numbers;
    * @returns {Transform} new Transform
    */
    static FromVector3(vector3){
        return new Transform(vector3.x,vector3.y,vector3.z,0);
    }
    /**
    * This function changes the Transform itself and returns no values.
    * It adds a Vec2 to the Transform's X and Y values.
    * @param {Vec2} vector2 A Vec2 object with the properties x and y, both numbers.
    */
    AddVector2(vector2){
        this.X += vector2.X;
        this.Y += vector2.Y;
    }
    /**
    * This function changes the Transform itself and returns no values.
    * It adds a Vec3 to the Transform's X, Y and Z values.
    * @param {Vec3} vector3 A Vec3 object with the properties x, y and z both numbers.
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
     * Multiplies all of the Scale values of the Transform by a number.
     * @param {number} scale
     */
    MultiplyByScale(scale){
        this.scaleX *= scale;
        this.scaleY *= scale;
        this.scaleZ *= scale;
    }
    /**
     * This function does not change the Transform itself and returns a new Transform. 
     * Intended to use with AddTransform() function to subtract values.
     * @see T1.AddTransform(Transform.Negate(T2));
     * @param {Transform} transform A Transform object.
     * @returns {Transform} a new Transform object that has the X, Y, Z and W values negated.
     */
    static Negate(transform){
        return new Transform(-transform.X, -transform.Y, -transform.Z, -transform.W);
    }
    /**
     * @returns {Transform} A null transform that bears all values as 0.
     */
    static NullTransform(){
        return new Transform(0,0,0,0);
    }
}

/** 
* @author Krys
* @version 1.0.1
* @property {Transform} Position A Transform that describes the position of the RigidBody2D.
* @property {Transform} Rotation A Transform that describes the rotation of the RigidBody2D.
* @property {Vec2} LinearVelocity A Vec2 that describes the linear velocity of the RigidBody2D. By default this is a Vec2 with zero as both values.
* @property {Vec2} AngularVelocity A Vec2 that describes the angular velocity of the RigidBody2D. By default this is a Vec2 with zero as both values.
* @property {number} Mass A number that describes the mass of the object, and gravity affects it accordingly.
* @property {number} Inertia The object's resistance to changes in angular velocity (rotation).
* @property {number} PhysicsLayer A number that indicates the physics layer of the object on which it operates.
*/
class RigidBody2D{
    constructor(Position, Rotation, Mass, Inertia, PhysicsLayer){
        this.Position = Position;
        this.Rotation = Rotation;
        this.Mass = Mass;
        this.Inertia = Inertia;
        this.PhysicsLayer = PhysicsLayer;
        this.LinearVelocity = Vec2.Zero();
        this.AngularVelocity = Vec2.Zero();
    }
    /**
     * @param {Vec2} Force The force that you wish to apply.
     */
    ApplyLinearVelocity(Force){
        this.LinearVelocity.X += Force.X;
        this.LinearVelocity.Y += Force.Y;
    }
    /**
     * @param {Vec2} Force The force that you wish to apply.
     */
    ApplyAngularVelocity(Force){
        this.AngularVelocity.X += Force.X;
        this.AngularVelocity.Y += Force.Y;
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
     * @param {number} angle the angle in radians
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
        this.X = x;
        this.Y = y;
    }
    /**
     * 
     * @returns {Vec2} the zero vector
     */
    static Zero(){return new Vec2(0,0);}
    static FromAngle(angle){return new Vec2(Math.cos(angle), Math.sin(angle));}
    /**
     * Returns a new vec2 with the members added together
     * @param {Vec2} v Vec2 object 
     * @returns {Vec2} the new vec2
     */
    add(v){return new Vec2(this.X + v.X, this.Y + v.Y);}
    /**
     * Returns a new vec2 with the members subtracted from left
     * @param {Vec2} v Vec2 object 
     * @returns {Vec2} the new vec2
     */
    sub(v){return new Vec2(this.X - v.X, this.Y - v.Y);}
    /**
     * Returns a new vec2, that is scaled by the given value
     * @param {number} c a scalar value
     * @returns {Vec2} the new vec2
     */
    scale(c){return new Vec2(this.X*c, this.Y*c);}
    /**
     * Returns a new vec2 that has the transformation of M applied
     * @param {Mat2} M Mat2 object
     * @returns {Vec2} the new vec2
     */
    mul(M){return new Vec2(this.X*M.xx + this.Y*M.xy, this.Y*M.yy + this.X*M.yx);}
    /**
     * modifies the original vec2 object, adds the members together
     * @param {Vec2} v Vec2 object
     * @returns {Vec2} self
     */
    addInto(v){
        this.X += v.X;
        this.Y += v.Y;
        return this;
    }
    /**
     * modifies the original vec2 object, subtracts the members from left
     * @param {Vec2} v Vec2 object
     * @returns {Vec2} self
     */
    subInto(v){
        this.X -= v.X;
        this.Y -= v.Y;
        return this;
    }
    /**
     * modifies the original vec2 object, scales members by the given value
     * @param {number} c a scalar value
     * @returns {Vec2} self
     */
    scaleInto(c){
        this.X *= c;
        this.Y *= c;
        return this;
    }
    /**
     * modifies the original vec2 object, applies the transformation M to it
     * @param {Mat2} M Mat2 object
     * @returns {Vec2} self
     */
    mulInto(M){
        this.X = this.X*M.xx + this.Y*M.xy;
        this.Y = this.Y*M.yy + this.X*M.yx;
        return this;
    }
    /**
     * renderes the oulines of all triangles to the given context, with the given colour
     * @param {CanvasRenderingContext2D} context the rendering context to use
     * @param {String | CanvasGradient | CanvasPattern} colour the colour the outline should be
     */
    debugRender(context, colour){
        context.fillStyle = colour;
        context.beginPath();
        context.arc(this.X, this.Y, 2, 0, Math.PI*2, false);
        context.fill();
        context.closePath();
    }
}
class Triangle{
    /**
     * creates a new triange
     * @param {Vec2[]} points the three points of the triangle
     */
    constructor(points){
        this.points = points;
        this.center = points[0].add(points[1]).add(points[2]).scale(1/3);
    }
    /**
     * returns true if the triangle is over the given point, otherwise false
     * @param {Vec2} point to be tested against the triangle
     * @returns {boolean}
     */
    isOver(point){
        //vectors
        let AB = this.points[1].sub(this.points[0]);
        let BC = this.points[2].sub(this.points[1]);
        let CA = this.points[0].sub(this.points[2]);
        let AP = point.sub(this.points[0]);
        let BP = point.sub(this.points[1]);
        let CP = point.sub(this.points[2]);
        //sings
        let s1 = Math.sign(AB.X*AP.Y - AP.X*AB.Y);
        let s2 = Math.sign(BC.X*BP.Y - BP.X*BC.Y);
        let s3 = Math.sign(CA.X*CP.Y - CP.X*CA.Y);
        //check
        return s1 == s2 && s2 == s3;
    }
    /**
     * returns true if the triangle given by the points in the array is over the given point, otherwise false
     * @param {Vec2[]} vertecies an array of points that should be treated as a triangle
     * @param {Vec2} point to be tested against the triangle
     * @returns {boolean}
     */
    isAnonymOver(vertecies, point){
        //vectors
        let AB = vertecies[1].sub(vertecies[0]);
        let BC = vertecies[2].sub(vertecies[1]);
        let CA = vertecies[0].sub(vertecies[2]);
        let AP = point.sub(vertecies[0]);
        let BP = point.sub(vertecies[1]);
        let CP = point.sub(vertecies[2]);
        //sings
        let s1 = Math.sign(AB.X*AP.Y - AP.X*AB.Y);
        let s2 = Math.sign(BC.X*BP.Y - BP.X*BC.Y);
        let s3 = Math.sign(CA.X*CP.Y - CP.X*CA.Y);
        //check
        return s1 == s2 && s2 == s3;    
    }
    /**
     * renderes the oulines of all triangles to the given context, with the given colour
     * @param {CanvasRenderingContext2D} context the rendering context to use
     * @param {String | CanvasGradient | CanvasPattern} colour the colour the outline should be
     */
    debugRender(context, colour){
        context.strokeStyle = colour;
        context.fillStyle = colour;
        context.beginPath();
        context.arc(this.center.X, this.center.Y, 2, 0, Math.PI*2, false);
        context.fill();
        context.moveTo(this.points[2].X, this.points[2].Y);
        this.points.forEach(point=>context.lineTo(point.X, point.Y));
        context.closePath();
        context.stroke();
    }
}
class Collider2D{
    /**
     * Creates a new collideer
     * @param {Triangle[]} triangles the triangles defining the shape of the collider
     * @param {Vec2} position the position of the collider
     */
    constructor(triangles){
        this.triangles = triangles;
        this.center = triangles.reduce((sum,tri)=>sum.add(tri.center), Vec2.Zero()).scale(1/triangles.length);
    }
    /**
     * renderes the oulines of all triangles to the given context, with the given colour
     * @param {CanvasRenderingContext2D} context the rendering context to use
     * @param {String | CanvasGradient | CanvasPattern} colour the colour the outline should be
     */
    debugRender(context, colour){
        context.strokeStyle = colour;
        context.beginPath();
        context.arc(0,0,2,0,Math.PI*2,false);
        context.fillStyle = colour;
        context.fill();
        this.triangles.forEach(tri=>{
            context.moveTo(tri.points[2].X, tri.points[2].Y);
            tri.points.forEach(point=>context.lineTo(point.X, point.Y));
        });
        context.closePath();
        context.stroke();
    }
}
class PhysicsObject2D{
    /**
     * 
     * @param {RigidBody2D} rigidBody
     * @param {Collider2D} collider 
     */
    constructor(rigidBody, collider, elasticity, hasGravity){
        this.RigidBody2D = rigidBody;
        this.Collider = collider;
        this.HasGravity = hasGravity;
        this.Elasticity = elasticity;
        this.IsFixed = false;
    }
    fixInPlace(){this.IsFixed = true;}
    /**
     * renderes the oulines of all triangles to the given context, with the given colour
     * @param {CanvasRenderingContext2D} context the rendering context to use
     * @param {String | CanvasGradient | CanvasPattern} colour the colour the outline should be
     */
    debugRender(context, colour){
        context.translate(this.RigidBody2D.Position.X, this.RigidBody2D.Position.Y);
        context.rotate(this.RigidBody2D.Rotation.Z);
        this.Collider.debugRender(context, colour);
        context.resetTransform();
    }
    update(deltaTime){
        if(this.IsFixed) return;
        this.RigidBody2D.Position.AddVector2(this.RigidBody2D.LinearVelocity.scale(deltaTime));
        this.Rotation.Z += this.AngularVelocity.X * deltaTime;
        if(this.HasGravity){
            this.LinearVelocity.AddVector2(new Vec2(0,10));
        }
    }
}
