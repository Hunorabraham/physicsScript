
function hello(){
    console.log("This is PS.js ver 0.0.1");
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
    * @param {Vector2} vector2 A Vector2 object with the properties x and y, both floats;
    * @returns {Transform} new Transform
    */
    static FromVector2(vector2) {
        return new Transform(vector2.x,vector2.y,0,0);
    }
    /**
    * Creates a brand new Transform class object with the w value as 0 from a Vector2;
    * @param {Vector3} vector3 A Vector3 object with the properties x, y and z, all floats;
    * @returns {Transform} new Transform
    */
    static FromVector3(vector3){
        return new Transform(vector3.x,vector3.y,vector3.z,0);
    }
}