//group memeber - Ziyi(400525051), Nandini(400560295)
//date of creation - 26 February, 2025
//This is the javascript page of the website . It velrooks all the functioning
//and responsive elements of the website.
window.addEventListener("load", function () {
    let colorInput = document.getElementById("color");
    let shapeSelect = document.getElementById("shape");
    let canvas = document.getElementById("canvas1");
    let sizeInput = document.getElementById("range");
    let undoButton = document.getElementById("undo");
    let clearButton = document.getElementById("clear");
    let ctx = canvas.getContext("2d");

    let shapesArray = [];
    // creating circle, rectangle, and triangle shape using class and constructor
    class Shape {
        constructor(x, y, color, size) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.size = size;
        }
        draw(ctx) { }
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
    //clears the canvas
    function redrawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let shape of shapesArray) {
            shape.draw(ctx);
        }
    }
    // It is triggered when the user clicks on the canvas, it takes parameters like
    // shape, color, and size to create the required object
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
    // Removes last shape from the array
    function undoLastShape() {
        shapesArray.pop();
        redrawCanvas();
        saveToLocalStorage();
    }
    // Empties the array
    function clearCanvas() {
        shapesArray = [];
        redrawCanvas();
        localStorage.removeItem("shapesData");
    }
    // Converts shapes array to JSON string
    function saveToLocalStorage() {
        let shapesData = shapesArray.map(shape => {
            return {
                x: shape.x,
                y: shape.y,
                color: shape.color,
                size: shape.size,
                type: shape instanceof Rectangle ? "rectangle" :
                    shape instanceof Circle ? "circle" : "triangle"
            };
        });
        localStorage.setItem("shapesData", JSON.stringify(shapesData));
    }
    // Checks if there are shapes in local storage, converts JSON string to shapes if there is
    function loadFromLocalStorage() {
        let savedShapes = localStorage.getItem("shapesData");
        if (savedShapes) {
            let parsedShapes = JSON.parse(savedShapes);
            shapesArray = parsedShapes.map(shapeData => {
                let { x, y, color, size, type } = shapeData;
                if (type === "rectangle") {
                    return new Rectangle(x, y, color, size);
                } else if (type === "circle") {
                    return new Circle(x, y, color, size);
                } else {
                    return new Triangle(x, y, color, size);
                }
            });
            redrawCanvas();
        }
    }
    
    canvas.addEventListener("click", addShape);
    undoButton.addEventListener("click", undoLastShape);
    clearButton.addEventListener("click", clearCanvas);

    loadFromLocalStorage();
});
