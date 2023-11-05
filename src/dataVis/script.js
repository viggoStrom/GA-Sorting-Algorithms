
const graph = document.getElementById("graph")

fetch("dataVisOut.csv")
    .then(response => response.text())
    .then((data) => {
        const list = data.split(",")

        let max = 0
        list.forEach(number => {
            if (number > max) {
                max = number
            }
        });

        list.forEach(number => {
            const div = document.createElement("div")
            div.id = number
            div.style.backgroundColor = "blue"
            div.style.height = `${number}%`
            div.style.width = "100%"
            graph.appendChild(div)
        })
    })