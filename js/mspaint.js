function toggleButton(element) {
    let x = document.getElementById(element.id);

    let y = document.getElementsByClassName("active");
    if (y.length > 0)
        y[0].classList.remove("active");

    try {
        x.blur();

        if (x.classList.contains("active")) {
            x.classList.remove("active");
        } else {
            x.classList.add("active");
        }
    } catch (exception) {}
    
}

function reloadCanvas(element) {
    let cnv = document.getElementById("canvas");
    let ctx = cnv.getContext("2d");
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    ctx.fillStyle = "#fff";

    if (document.getElementById(element.id).id == "startmenupaint")
        toggleStartMenu();

    main();
}

let drawing = false;

function main() {
    let cnv = document.getElementById("canvas");
    let ctx = cnv.getContext("2d");
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    ctx.fillStyle = "#fff";

    cnv.addEventListener("mousedown", startPosition);
    cnv.addEventListener("mouseup", stopPosition);
    cnv.addEventListener("mousemove", draw);
    cnv.addEventListener("mouseleave", stopPosition);
}

function startPosition(ev) {
    //let tool = document.getElementsByClassName("active");
    //if (tool.length < 1)
    //    return;
    //tool = tool[0].id;

    drawing = true;
    draw(ev);
}

let p = 1;

function stopPosition() {
    let cnv = document.getElementById("canvas");
    let ctx = cnv.getContext("2d");

    let tool = document.getElementsByClassName("active");
    if (tool.length < 1)
        return;
    tool = tool[0].id;

    drawing = false;
    if (tool != 'line')
        ctx.beginPath();

    if (tool == 'line') {
        if (p == 0) {
            p++;
            ctx.beginPath();
        } else if (p == 1) {
            p = 0;
            ctx.closePath();
        }
    }
}

function draw(ev) {
    let cnv = document.getElementById("canvas");
    let ctx = cnv.getContext("2d");

    let size = document.getElementById("size").value;
    if (size > 50)
        document.getElementById("size").value = 50;
    else if (size < 1)
        document.getElementById("size").value = 1;

    if(!drawing)
        return;

    let paint = true;
    let square = false;
    let circle = false;
    let text = false;

    let tool = document.getElementsByClassName("active");
    if (tool.length < 1)
        return;
    tool = tool[0].id;

    let stroke = document.getElementById("stroke").checked;

    let color = document.getElementById("color").value;
    ctx.strokeStyle = color;
    switch(tool) {
        case 'pencil':
            ctx.lineCap = 'butt';
            break;
        case 'brush':
            ctx.lineCap = 'round';
            break;
        case 'eraser':
            ctx.lineCap = 'round';
            ctx.strokeStyle = "#fff";
            break;
        case 'line':
            ctx.lineCap = 'round';
            break;
        case 'square':
            paint = false;
            square = true;
            break;
        case 'circle':
            paint = false;
            circle = true;
            break;
        case 'type':
            paint = false;
            text = true;
            break;
    }    

    if(square) {
        ctx.fillStyle = color;
        if (stroke) {
            ctx.lineWidth = size / 2;
            ctx.strokeRect(ev.offsetX - size*5, ev.offsetY - size*5, size*10, size*10);
        } else
            ctx.fillRect(ev.offsetX - size*5, ev.offsetY - size*5, size*10, size*10);
    } else if (circle) {
        ctx.arc(ev.offsetX, ev.offsetY, size*10, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        if (stroke) {
            ctx.lineWidth = size / 2;
            ctx.stroke();
        } else
            ctx.fill();
    } else if (text) {
        let textStr = document.getElementById("textinput").value;
        ctx.font = (size * 2) + "px MS Sans Serif";
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        if (stroke) {
            ctx.lineWidth = size / 5;
            ctx.strokeText(textStr, ev.offsetX, ev.offsetY);
        } else {
            console.log('ee');
            ctx.fillText(textStr, ev.offsetX, ev.offsetY);
        }
    }
    
    if (paint) {
        ctx.lineWidth = size;

        ctx.lineTo(ev.offsetX, ev.offsetY);
        ctx.stroke();
        ctx.moveTo(ev.offsetX, ev.offsetY);
    }
}

function saveCanvas() {
    let cnv = document.getElementById("canvas");
    let image = cnv.toDataURL("image/png");
    let link = document.createElement('a');
    link.download = "canvas.png";
    link.href = image;
    link.click();
}
