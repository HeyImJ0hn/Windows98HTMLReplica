function moveBar() {
    document.body.style.backgroundImage = "url('/imgs/win98bg.jpg')";
    let i = 0;
    if (i == 0) {
        i = 1;
        let elem = document.getElementById("progressbar");
        let width = 1;
        let id = setInterval(frame, 50);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                i = 0;
                removeWelcomeScreen();
            } else {
                width++;
                elem.style.width = width + "%";
            }
        }
    }
}

function removeWelcomeScreen() {
    document.body.style.background = "#008080";
    document.getElementById("progressdiv").style.display = "none";
    showLoginScreen();
}

function showLoginScreen() {
    document.getElementById("login").style.display = "block";
}

function hideLoginScreen() {
    document.getElementById("login").style.display = "none";
}

function toggleStartMenu() {
    let menu = document.getElementById("startmenu");
    if (menu.style.display == "block")
        menu.style.display = "none";
    else
        menu.style.display = "block";

    let btn = document.getElementById("startbtn");

    let popuptask = document.getElementById("popuptask");
    let painttask = document.getElementById("painttask");
    let cryptotask = document.getElementById("cryptotask");

    if (btn.hasAttribute("active")) {
        btn.style.borderColor = "#ffffff #000000 #000000 #ffffff";
        popuptask.style.borderColor = "#000000 #ffffff #ffffff #000000";
        painttask.style.borderColor = "#000000 #ffffff #ffffff #000000";
        cryptotask.style.borderColor = "#000000 #ffffff #ffffff #000000";
        popuptask.setAttribute("active", "");
        painttask.setAttribute("active", "");
        cryptotask.setAttribute("active", "");
        btn.blur();
        btn.removeAttribute("active");
    } else {
        btn.style.borderColor = "#000000 #ffffff #ffffff #000000";
        popuptask.style.borderColor = "#ffffff #000000 #000000 #ffffff";
        painttask.style.borderColor = "#ffffff #000000 #000000 #ffffff";
        cryptotask.style.borderColor = "#ffffff #000000 #000000 #ffffff";
        popuptask.removeAttribute("active");
        painttask.removeAttribute("active");
        cryptotask.removeAttribute("active");
        btn.blur();
        btn.setAttribute("active", "");
    }
}

function closePopUp() {
    document.getElementById("welcomepopup").style.display = "none";
    document.getElementById("popuptask").style.display = "none";
}

function swapBorder(element) {
    let btn = document.getElementById(element.id);

    if (btn.hasAttribute("active")) {
        btn.style.borderColor = "#ffffff #000000 #000000 #ffffff";
        btn.blur();
        btn.removeAttribute("active");
    } else {
        btn.style.borderColor = "#000000 #ffffff #ffffff #000000";
        btn.blur();
        btn.setAttribute("active", "");
    }
}

function throwErrorPopUp() {
    document.getElementById("error").style.display = "block";
}

function closeError() {
    document.getElementById("error").style.display = "none";
}

function openPaint(element) {
    reloadCanvas(element);

    document.getElementById("mspaint").style.display = "block";
    document.getElementById("painttask").style.display = "inline";
    document.getElementById("painttask").style.borderColor = "#ffffff #000000 #000000 ##ffffff";
}

function closePaint() {
    document.getElementById("mspaint").style.display = "none";
    document.getElementById("painttask").style.display = "none";
}

function openCrypto(element) {
    let btn = document.getElementById(element.id);
    if (btn.id == "startmenucrypto")
        toggleStartMenu();

    document.getElementById("crypto").style.display = "block";
    document.getElementById("cryptotask").style.display = "inline";
    document.getElementById("cryptotask").style.borderColor = "#ffffff #000000 #000000 ##ffffff";
}

function closeCrypto() {
    document.getElementById("searchcrypto").value = null;
    document.getElementById("terminaltext").innerHTML = "<p>Please select a coin.<br>Re-selecting a coin will refresh the data.</p>";
    document.getElementById("crypto").style.display = "none";
    document.getElementById("cryptotask").style.display = "none";
}

/* Drag Clippy */
drag();
function drag() {
    dragElement(document.getElementById("clippy"));
    dragElement(document.getElementById("programpc"));
    dragElement(document.getElementById("programpaint"));
    dragElement(document.getElementById("programcrypto"));
    dragElement(document.getElementById("programbin"));
}

function dragElement(element) {
    let top, left, mouseX, mouseY;
    let moving = false;

    element.onmousedown = function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        moving = true;
    }

    element.onmousemove = function (e) {
        if (moving) {
            top = mouseY - e.clientY;
            left = mouseX - e.clientX;
            mouseX = e.clientX;
            mouseY = e.clientY;
            element.style.top = (element.offsetTop - top) + "px";
            element.style.left = (element.offsetLeft - left) + "px";
        }
    }

    element.onmouseleave = function (e) {
        moving = false;
    }

    element.onmouseup = function (e) {
        moving = false;
    }
}

function shutdown() {
    toggleStartMenu();
    setTimeout(function () { document.getElementById("programs").style.display = "none" }, 500);
    setTimeout(function () { document.getElementById("welcomepopup").style.display = "none" }, 500);
    setTimeout(function () { document.getElementById("mspaint").style.display = "none" }, 500);
    setTimeout(function () { document.getElementById("error").style.display = "none" }, 500);
    setTimeout(function () { document.getElementById("crypto").style.display = "none" }, 500);
    setTimeout(function () { document.getElementById("taskbar").style.display = "none" }, 1000);
    setTimeout(function () { document.getElementById("clippy").style.display = "none" }, 1000);
    setTimeout(function () { document.body.style.backgroundImage = "url('/imgs/win98bg.jpg')" }, 2000);
    setTimeout(function () { document.body.style.backgroundImage = "" }, 4000);
    setTimeout(function () { document.body.style.backgroundColor = "#000" }, 4000);
}