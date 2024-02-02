import math

def transpose(input="./outputs/semiSortedListRes.csv", output="./outputs/transposeMainOutput.csv"):
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

    n2 = ["n^2"]
    nlogn = ["n*log(n)"]
    for number in table[0][1:len(table[0])]:
        n2.append(str(int(number)**2))
        nlogn.append(str(int(number) * math.log10(int(number))))

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