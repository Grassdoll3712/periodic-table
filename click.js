let isCtrlPressed;
let lastClick;
let midas = false;
let CuTe = false;
let isDragging = false;

document.addEventListener("keydown", function (event) {
    if (event.key === "Control") {
        isCtrlPressed = true;
    }
});

document.addEventListener("keyup", function (event) {
    if (event.key === "Control") {
        isCtrlPressed = false;
    }
});

const periodicTable = document.querySelector(".periodic-table");
const exceptList = ["lanthanide", "lanthanides", "actinide", "actinides"]

periodicTable.addEventListener("click", function(event) {
    if (event.target.closest(".element")) {
        // 79: Gold
        if (midas) {
            event.target.closest(".element").classList.add("gold");
        }
        if (!exceptList.includes(event.target.closest(".element").id)) {
            clickEvent(event.target.closest(".element"), Number(event.target.closest(".element").id.slice(7)));
        }
    }
});

// Fisher-Yates Shuffle Algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 26: Iron
function handleMouseMove(event) {
    if (!isDragging) return;
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const elements = Array.from(document.querySelectorAll(".element"));

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect();
        const dx = mouseX - (elementPosition.left + elementPosition.width / 2);
        const dy = mouseY - (elementPosition.top + elementPosition.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < window.innerWidth * 0.15) {
            const pullStrength = Math.max(0, 1 - distance / (window.innerWidth * 0.15));
            element.classList.add("magnet");
            element.style.translate = `${dx * 0.01 * pullStrength}vw ${dy * 0.01 * pullStrength}vw`;
        } else {
            element.classList.remove("magnet");
            element.style.translate = "";
        }
    });
}

// 29-52: CuTe
function cute() {
    if (CuTe) {
        document.querySelector('body > div.head > span.title').innerHTML = '<a href="https://scpko.wikidot.com/gengo" target="_blank">SCP-2300</a>';
        periodicTable.addEventListener("mouseover", cuteHover);
        periodicTable.addEventListener("mouseout", cuteOut);
    } else {
        document.querySelector('body > div.head > span.title').innerHTML = 'Periodic Table';
        periodicTable.removeEventListener("mouseover", cuteHover);
        periodicTable.removeEventListener("mouseout", cuteOut);
    }
    const elements = Array.from(document.querySelectorAll(".element"));
    elements.forEach(element => {
        id = element.id.slice(7);
        if (id <= 98) setTimeout(function (id) {
            if (CuTe) {
                element.classList.add("CuTe");
                image = element.querySelector('.back > .image');
                image.src = `images/2300/${id}.jpeg`;
                element.classList.add("flipped");
            } else {
                element.classList.remove("CuTe");
                element.classList.remove("flipped");
            }
        }, 80*id, id);
        else if (id <= 118) setTimeout(function () {
            if (CuTe) element.classList.add("disappear");
            else element.classList.remove("disappear");
        }, 80*id);
        else setTimeout(function () {
            if (CuTe) element.classList.add("disappear");
            else element.classList.remove("disappear");
        }, 80*119);
    });
}

function cuteHover(event) {
    if (event.target.closest(".element")) {
        if (event.target.closest(".element").id.slice(7) <= 98 && event.target.closest(".element").classList.contains("CuTe")) {
            document.querySelector('body > div.head > span.title').innerHTML = `<a href="https://scpko.wikidot.com/gengo" target="_blank">SCP-2300-${event.target.closest(".element").id.slice(7)}</a>`;
        }
    }
}

function cuteOut(event) {
    if (event.target.closest(".element")) {
        document.querySelector('body > div.head > span.title').innerHTML = '<a href="https://scpko.wikidot.com/gengo" target="_blank">SCP-2300</a>';
    }
}

function clickEvent(target, id) {
    // 29-52: CuTe
    if (CuTe) {
        CuTe = false;
        cute();
    }
    else if (!isCtrlPressed) {
        const image = target.querySelector(".image");
        if (!target.classList.contains("flipped")) {
            image.src = image.dataset.src;
        } else {
            setTimeout(function () {if (!target.classList.contains("flipped")) image.removeAttribute("src");}, 750);
        }
        target.classList.toggle("flipped");
    }
    else {
        switch(id) {
            case 2:
                target.classList.add("balloon");
                const elements = Array.from(document.getElementsByClassName("element"))
                shuffleArray(elements)
                elements.forEach((element, index) => {
                    element.classList.remove("flipped");
                    setTimeout(() => {
                        element.classList.add("balloon");
                    }, 200*Math.sqrt(index));
                });
                setTimeout(() => {
                    document.querySelectorAll(".balloon").forEach((element) => {
                        element.classList.add("appear");
                        element.classList.remove("balloon");
                        setTimeout(() => {
                            element.classList.remove("appear");
                        }, 3000);
                    });
                }, 10000);
                break;

            case 6:
                const fullName = target.querySelector(".full");
                if (target.classList.contains("diamond") || target.classList.contains("graphite")) {
                    target.classList.remove("diamond", "graphite");
                    fullName.innerHTML = "Carbon";
                } else if (Math.random() >= 0.99) {
                    target.classList.add("diamond");
                    target.classList.remove("graphite");
                    fullName.innerHTML = "Diamond";
                } else {
                    target.classList.add("graphite");
                    target.classList.remove("diamond");
                    fullName.innerHTML = "Graphite";
                }
                break;

            case 10:
                if (document.body.classList.contains("dark-mode") && !document.body.classList.contains("neon-mode")) {
                    document.body.classList.add("neon-mode");
                } else {
                    document.body.classList.remove("neon-mode");
                }
                break;

            case 26:
                isDragging = !isDragging;
                if (!isDragging) {
                    document.querySelectorAll(".element").forEach(element => {
                        element.style.translate = "";
                    });
                    document.removeEventListener("mousemove", handleMouseMove);
                } else {
                    document.addEventListener("mousemove", handleMouseMove);
                }
                break;

            case 46:
                target.querySelector(".image").src = "images/arc_reactor.svg";
                target.classList.add("flipped");
                break;

            case 52:
                CuTe = true;
                if (lastClick == 29) cute();
                break;

            case 79:
                if (midas) {
                    midas = false;
                    document.querySelectorAll(".gold").forEach(element => {
                        element.classList.remove("gold");
                    });
                } else {
                    midas = true;
                    target.classList.add("gold");
                }
                break;
            
            case 99:
                target.querySelector(".image").src = "images/Einstein.jpeg";
                target.classList.add("flipped");
                break;

            case 118:
                location.href = "./extended.html";
                break;
        }
        lastClick = id;
    }
}

/* 이전 코드
for (let i=1; i<=118; i++) {
    if (i === 6) {
        document.getElementById(`element${i}`).addEventListener("click", function () {
            if (midas) document.getElementById(`element${i}`).classList.add("gold");
            if (isCtrlPressed) {
                if (document.querySelector("#element6 > div.front > div.full").innerHTML === "Carbon") {
                    if (Math.random() >= 0.99) {
                        document.querySelector("#element6 > div.front > div.full").innerHTML = "Diamond";
                        document.getElementById(`element${i}`).classList.add("diamond");
                    } else {
                        document.querySelector("#element6 > div.front > div.full").innerHTML = "Graphite";
                        document.getElementById(`element${i}`).classList.add("graphite");
                    }
                } else {
                    document.querySelector("#element6 > div.front > div.full").innerHTML = "Carbon";
                    document.getElementById(`element${i}`).classList.remove("diamond");
                    document.getElementById(`element${i}`).classList.remove("graphite");
                }
            } else {
                document.getElementById(`element${i}`).classList.toggle("flipped");
            }
        });
    } else if (i === 10) {
        document.getElementById(`element${i}`).addEventListener("click", function () {
            if (midas) document.getElementById(`element${i}`).classList.add("gold");
            if (isCtrlPressed) {
                if (document.body.classList.contains("dark-mode") && !document.body.classList.contains("neon-mode")) {
                    document.body.classList.add("neon-mode");
                } else {
                    document.body.classList.remove("neon-mode");
                }
            } else {
                document.getElementById(`element${i}`).classList.toggle("flipped");
            }
        });
    } else if (i === 79) {
        document.getElementById(`element${i}`).addEventListener("click", function () {
            if (midas) document.getElementById(`element${i}`).classList.add("gold");
            if (isCtrlPressed) {
                if (midas) {
                    midas = false;
                    document.querySelectorAll(".gold").forEach(element => {
                        element.classList.remove("gold");
                    });
                } else {
                    midas = true;
                    document.getElementById(`element${i}`).classList.add("gold");
                }
            } else {
                document.getElementById(`element${i}`).classList.toggle("flipped");
            }
        });
    } else if (i === 99) {
        document.getElementById(`element${i}`).addEventListener("click", function () {
            if (midas) document.getElementById(`element${i}`).classList.add("gold");
            if (isCtrlPressed) {
                document.querySelector("#element99 > div.back > img").src = "images/Einstein.jpeg";
                document.getElementById(`element${i}`).classList.add("flipped");
            } else {
                document.getElementById(`element${i}`).classList.toggle("flipped");
                setTimeout(function () {document.querySelector("#element99 > div.back > img").src = "images/99.svg";}, 500);
            }
        });
    } else {
        document.getElementById(`element${i}`).addEventListener("click", function () {
            if (midas) document.getElementById(`element${i}`).classList.add("gold");
            document.getElementById(`element${i}`).classList.toggle("flipped");
        });
    }
}
*/