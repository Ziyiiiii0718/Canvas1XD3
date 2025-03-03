window.addEventListener("load", function () {
    let c = document.getElementById("color");
    let s = document.getElementById("shape");
    let ca = document.getElementById("canvas1");
    let r = document.getElementById("range");
    r.addEventListener("input", function (event) {
        let v = parseInt(this.value);
        v = v - 0;
        let msg = document.getElementById("rangeamount");
        msg.innerHTML = v;
    });
    document.getElementById("clear").addEventListener("click", function (event) {
        ctx.clearRect(0, 0, ca.width, ca.height);
    });
    function whereClicked(event) {
        var x = event.pageX - this.offsetLeft;
        var y = event.pageY - this.offsetTop;

        var ctx = this.getContext("2d");
        ctx.fillStyle = c.value;

        ca.addEventListener("click", function (event) {
            console.log(event.pageX - this.offsetLeft, event.pageY - this.offsetTop);
            let x = event.pageX - this.offsetLeft;
            let y = event.pageY - this.offsetTop;

            //Rectangle
            ctx.fillRect(x - 10, y - 10, parseInt(r.value),parseInt(r.value)+10);

            //Circle
            //ctx.beginPath();
            //ctx.arc(x - 10, y - 10, parseInt(r.value), 0, Math.PI * 2);
            //ctx.fill();

            //triangle



        });


    }

    document.getElementById("canvas1").addEventListener("mousemove", whereClicked);
});
