Physics.hello();
const can = document.querySelector("canvas");
const ctx = can.getContext("2d")


let tris = [];
const sides = 10;
let points = [Vec2.Zero(), Vec2.FromAngle(0), Vec2.FromAngle(Math.PI*2/sides)];
for(let i = 0; i < sides; i++){
    let rot = Mat2.rotation(Math.PI*2/sides*i);
    let tri = new Triangle(points.map(p=>p.mul(rot).scale(50)));
    tris.push(tri);
}


let c = new Collider2D(tris);

let t = new Triangle([Vec2.FromAngle(0).scale(50),Vec2.FromAngle(Math.PI*2/3).scale(50),Vec2.FromAngle(Math.PI*4/3).scale(50),]);
let c2 = new Collider2D([t]);
const rect = can.getBoundingClientRect();
