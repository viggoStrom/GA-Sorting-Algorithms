
const graph = document.getElementById("graph")

fetch("dataVisOut.csv")
    .then(response => response.text())
    .then((data) => {
        const list = data.split(",")

        list.forEach(number => {
            const div = document.createElement("div")
            div.id = number
            div.style.backgroundColor = "blue"
            div.style.height = `${number}%`
            div.style.width = "100%"
            div.style.padding = 0
            div.style.margin = 0
            graph.appendChild(div)
        })
    })