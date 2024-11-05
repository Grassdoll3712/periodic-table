const periodicTable = document.querySelector(".periodic-table");
const exceptList = ["lanthanide", "lanthanides", "actinide", "actinides", "superactinide", "superactinides"]

periodicTable.addEventListener("click", function(event) {
    if (event.target.closest(".element") && !exceptList.includes(event.target.closest(".element").id)) {
        clickEvent(event.target.closest(".element"));
    }
});

function clickEvent(target) {
    target.classList.toggle("flipped");
}

document.getElementById("return").addEventListener("click", function() {
    location.href = "./index.html"
})