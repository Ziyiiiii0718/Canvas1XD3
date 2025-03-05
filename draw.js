window.addEventListener("load", function () {
    let colorInput = document.getElementById("color");
    let shapeSelect = document.getElementById("shape");
    let canvas = document.getElementById("canvas1");
    let sizeInput = document.getElementById("range");
    let undoButton = document.getElementById("undo");
    let clearButton = document.getElementById("clear");
    let ctx = canvas.getContext("2d");
    
    let shapesArray = [];

    class Shape {
        constructor(x, y, color, size) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.size = size;
        }
        draw(ctx) {}
    }

    class Rectangle extends Shape {
        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size + 10, this.size);
        }
    }

    class Circle extends Shape {
        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    class Triangle extends Shape {
        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x - this.size / 2, this.y + this.size);
            ctx.lineTo(this.x + this.size / 2, this.y + this.size);
            ctx.closePath();
            ctx.fill();
        }
    }
    sizeInput.addEventListener("input", function (event) {
        let v = parseInt(this.value);
        v = v - 0;
        let msg = document.getElementById("rangeamount");
        msg.innerHTML = v;
    });

    function redrawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let shape of shapesArray) {
            shape.draw(ctx);
        }
    }

    function addShape(event) {
        let x = event.offsetX;
        let y = event.offsetY;
        let color = colorInput.value;
        let size = parseInt(sizeInput.value);
        let shapeType = shapeSelect.value;
        let shape;

        if (shapeType === "rectangle") {
            shape = new Rectangle(x, y, color, size);
        } else if (shapeType === "circle") {
            shape = new Circle(x, y, color, size);
        } else if (shapeType === "triangle") {
            shape = new Triangle(x, y, color, size);
        }

        shapesArray.push(shape);
        shape.draw(ctx);
        saveToLocalStorage();
    }

    function undoLastShape() {
        shapesArray.pop();
        redrawCanvas();
        saveToLocalStorage();
    }

    function clearCanvas() {
        shapesArray = [];
        redrawCanvas();
        localStorage.removeItem("shapesData");
    }

    function saveToLocalStorage() {
        localStorage.setItem("shapesData", JSON.stringify(shapesArray));
    }

    function loadFromLocalStorage() {
        let savedShapes = localStorage.getItem("shapesData");
        if (savedShapes) {
            shapesArray = JSON.parse(savedShapes);
            redrawCanvas();
        }
    }
    
    canvas.addEventListener("click", addShape);
    undoButton.addEventListener("click", undoLastShape);
    clearButton.addEventListener("click", clearCanvas);

    loadFromLocalStorage();
});
