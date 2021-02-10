function toggleButton(element) {
    let x = document.getElementById(element.id);

    let y = document.getElementsByClassName("active");
    if (y.length > 0)
        y[0].classList.remove("active");

    x.blur();

    if (x.classList.contains("active")) {
        x.classList.remove("active");
    } else {
        x.classList.add("active");
    }
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
}

function startPosition(ev) {
    drawing = true;
    draw(ev);
}

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

    let tool = document.getElementsByClassName("active");
    if (tool.length < 1)
        return;
    tool = tool[0].id;

    let color = document.getElementById("color").value;
    ctx.strokeStyle = color;
    let line = false;
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
        case 'bucket':
            paintBucket(ev.offsetX, ev.offsetY);
            break;
        case 'line':
            line = true;
            break;
    }    

    ctx.lineWidth = size;

    ctx.lineTo(ev.offsetX, ev.offsetY);
    ctx.stroke();
    if (!line)
        ctx.beginPath();
    line = false;
    ctx.moveTo(ev.offsetX, ev.offsetY);
    
}

function saveCanvas() {
    let cnv = document.getElementById("canvas");
    image = cnv.toDataURL("image/png");
    let link = document.createElement('a');
    link.download = "canvas.png";
    link.href = image;
    link.click();
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

function paintBucket(startx, starty) {
    let cnv = document.getElementById("canvas");
    let ctx = cnv.getContext("2d");
    let color = document.getElementById("color").value;
    let x = startx;
    let y = starty;

    let pixelData = ctx.getImageData(x, y, 1, 1).data; 

    let hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
    
    while (hex != color) {
        ctx.strokeStyle = color;
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(y, y);
        x += 1;
        y += 1;
        pixelData = ctx.getImageData(x, y, 1, 1).data; 
        hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
    }

}
