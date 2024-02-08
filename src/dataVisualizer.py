
import matplotlib.pyplot as plt
import json
import math


def rawToCSV(input="./data/raw.json", semiSortedOutput="./data/semiSortedLists/avgOps.csv", fullyRandomOutput="./data/fullyRandomLists/avgOps.csv"):
    def stringSum(interable):
        sumOut = 0
        for string in interable:
            sumOut += int(string)
        return sumOut

    with open(input) as file:
        raw = file.readlines()
        entries = []
        for entry in raw:
            entries.append(json.loads(entry))

        sortedEntries = sorted(entries, key=lambda d: (
            d["name"], d["metaData"]["listLength"]))

        output = []
        for entry in sortedEntries:
            output.append(json.dumps(entry))

        with open(semiSortedOutput, "w") as outFile:  # type: ignore

            for line in output:
                jsonLine = json.loads(line)

                n = jsonLine["metaData"]["listLength"]
                opsAvarage = math.floor(
                    stringSum(
                        jsonLine["semiSortedList"]["ops"].split(","))
                    /
                    jsonLine["metaData"]["loops"]
                )
                formattedOut = f'{jsonLine["name"]},{n},{opsAvarage}'

                outFile.write(formattedOut + "\n")

        with open(fullyRandomOutput, "w") as outFile:  # type: ignore

            for line in output:
                jsonLine = json.loads(line)

                n = jsonLine["metaData"]["listLength"]
                opsAvarage = math.floor(
                    stringSum(
                        jsonLine["randomList"]["ops"].split(","))
                    /
                    jsonLine["metaData"]["loops"]
                )

                formattedOut = f'{jsonLine["name"]},{n},{opsAvarage}'

                outFile.write(formattedOut + "\n")


def transpose(input="./data/semiSortedLists/avgOps.csv", output="./data/semiSortedLists/transposedAvgOps.csv"):
    table = [
        ["List Length"],  # list length
        [""],  # V columns V
        [""],
        [""],
        [""],
        [""],
        [""],
        [""],
        [""],
    ]
    column = 0

    with open(input, "r") as inputFile:
        for index, line in enumerate(inputFile.readlines()):
            data = line.replace("\n", "").split(",")
            if index < 44:
                table[0].append(data[1])  # sets list length column

            if index % 44 == 0:
                column += 1

            table[column][0] = data[0]  # sets column name i.e. the alg name
            table[column].append(data[2])  # sets column name i.e. the alg name

    n2 = ["n²"]
    nlogn = ["nlog(n)"]
    for number in table[0][1:len(table[0])]:
        n2.append(str(int(int(number)**2)))
        nlogn.append(str(int(int(number) * math.log10(int(number)))))

    table.append(n2)
    table.append(nlogn)

    with open(output, "w") as outputFile:
        outputFile.write("")

    with open(output, "a") as outputFile:
        for index in range(len(table[0])):
            row = []
            for column in table:
                row.append(column[index])
            outputFile.write(", ".join(row) + "\n")


rawToCSV()
transpose("./data/semiSortedLists/avgOps.csv",
          "./data/semiSortedLists/transposedAvgOps.csv")
transpose("./data/fullyRandomLists/avgOps.csv",
          "./data/fullyRandomLists/transposedAvgOps.csv")


# with open("./data/fullyRandomLists/avgOps.csv", "r") as file:

#     x = [0, 100_000]
#     y = [0, 3e10]

#     points = []
#     for index, line in enumerate(file.readlines()):
#         if index < 44:
#             fullLine = line.split(",")
#             listLength = int(fullLine[1])
#             opsCount = float(fullLine[2])
#             plt.scatter(listLength, opsCount, color='blue')

#     # # Connect nodes with lines
#     # for i in range(len(x) - 1):
#     #     plt.plot([x[i], x[i+1]], [y[i], y[i+1]], color='black', linestyle='-')

#     plt.plot(x, [0, 0], color="black")
#     plt.plot([0, 0], y, color="black")

#     # Customize the plot
#     plt.title('Scatter Chart with Connecting Lines')
#     plt.xlabel('X-axis')
#     plt.ylabel('Y-axis')
#     plt.legend()

#     # Show the plot
#     plt.xlim(x)
#     plt.ylim(y)
#     plt.show()
