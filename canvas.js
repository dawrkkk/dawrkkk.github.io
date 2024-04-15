let canvas = document.querySelector('canvas');
let cntxt = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove',
    function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse)
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function() {
        cntxt.beginPath();
        cntxt.arc(x, y, radius, 0, Math.PI * 2, false);
        cntxt.strokeStyle = "purple";
    }

    this.update = function() {
        cntxt.beginPath();
        cntxt.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        cntxt.strokeStyle = "purple";
        cntxt.stroke();

    
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx
        }
    
        if (this.y + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dy = -this.dy
        }
    
        this.x += this.dx;
        this.y += this.dy;

        //interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < 80) {
                this.radius += 3;
            }
        } else if (this.radius > 30) {
            this.radius -= 3;
        }

        this.draw();
    }
}

var circleArray = [];

for (let i = 0; i < 400; i++){
    let x = Math.random() * innerWidth;
    let y = Math.random() * innerHeight;
    let dx =  (Math.random() - 0.5) * 1.5;
    let dy = (Math.random() - 0.5) * 1.5;
    let radius = 30;
    circleArray.push(new Circle(x, y, dx, dy, radius));

}

console.log(circleArray);

function animate() {
    requestAnimationFrame(animate);
    cntxt.clearRect(0, 0, innerWidth, innerHeight); //clears the canvas

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

}

animate();