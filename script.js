let graph = document.getElementById("graph")
let gtx = graph.getContext("2d")
let WIDTH = graph.width;
let HEIGHT = graph.height;
window.onload = () => {
    initGraph()
}
graph.addEventListener('mouseover', function(e) {
    getCursorPosition(graph, e)
})

function graphEquation() {
    gtx.clearRect(0, 0, WIDTH, HEIGHT);
    initGraph()
    let currentEquation = document.getElementById("equationInput").value
    renderGraph(100, currentEquation)
}

function initGraph() {
    gtx.moveTo(WIDTH / 2, 0);
    gtx.lineTo(WIDTH / 2, HEIGHT);
    gtx.moveTo(0, HEIGHT / 2);
    gtx.lineTo(WIDTH, HEIGHT / 2)
    gtx.stroke();
    gtx.save()
}

function proccessEquation(equation) {
    if (equation == "") {
        return undefined
    }
    return equation
}

function graphLine(x, y) {
    gtx.lineTo(x, y)
    gtx.stroke()
}

//n is the number of segments aka quality
function renderGraph(n, equation) {
    let spaceRegex = /[^ ]/
    let currentEquation = proccessEquation(equation)
    if (spaceRegex.test(currentEquation) && currentEquation != undefined) {
        for (let i = 0; i < n; i++) {
            let currentX = WIDTH - (i * (WIDTH / n));
            let newEquation = currentEquation.split('x').join(currentX);
            let currentY = HEIGHT - math.evaluate(newEquation);
            console.log(currentX, currentY)
            graphLine(currentX, currentY)

        }
        clearInterval()
    }
}

function getCursorPosition(graph, event) {
    let displayX = document.getElementById("xPos")
    let displayY = document.getElementById("yPos")
    const rect = graph.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    displayX.innerHTML = "X: " + x;
    displayY.innerHTML = "Y: " + y;

}