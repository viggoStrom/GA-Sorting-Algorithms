
import json
import math


def stringSum(interable):
    sumOut = 0
    for string in interable:
        sumOut += int(string)
    return sumOut


with open("./outputs/master.txt") as file:
    raw = file.readlines()
    entries = []
    for entry in raw:
        entries.append(json.loads(entry))

    sortedEntries = sorted(entries, key=lambda d: (
        d["name"], d["metaData"]["listLength"]))

    output = []
    for entry in sortedEntries:
        output.append(json.dumps(entry))

    with open("./outputs/pythonOut.csv", "w") as outFile:
        # outFile.write("name,list length, expected O(), actual O()\n")

        for line in output:
            jsonLine = json.loads(line)

            n = jsonLine["metaData"]["listLength"]
            opsAvarage = math.floor(stringSum(
                jsonLine["randomList"]["ops"].split(",")) / jsonLine["metaData"]["loops"])
            timeAvarage = stringSum(jsonLine["randomList"]["times"].split(
                ",")) / (jsonLine["metaData"]["loops"] * 1e6)
            # ,{timeAvarage}
            formattedOut = f'{jsonLine["name"]},{n},{opsAvarage}'
            # formattedOut = f'{jsonLine["name"]},{n},{jsonLine["metaData"]["averageOh"]},{opsAvarage},{stringSum(jsonLine["randomList"]["times"].split(","))/(jsonLine["metaData"]["loops"] * 1e6)}'

            outFile.write(formattedOut + "\n")


with open("outputs/pythonOut.csv", "r") as file:
    rawLines = file.readlines()

    algData = []

    for index, rawRow in enumerate(rawLines):
        row = rawRow.split(",")
        algorithm = row[0]
        size = int(row[1])
        time = int(row[2])

        if algorithm not in algData:
            algData.append({'name': "", 'sizes': [], 'times': []})

        algData[index]['name'] = row[0]
        algData[index]['sizes'].append(size)
        algData[index]['times'].append(time)

    outputRows = [""]*45
    outputRows[0] = "n"

    for alg in algData:
        outputRows[0] += ", " + algData[alg]["name"]
        pass

    for index, row in enumerate(outputRows):

        print(index, row, algData[index])
        pass

    print(outputRows)


# import io
# import csv

# data = open("outputs/pythonOut.csv", "r").read()

# csv_reader = csv.reader(io.StringIO(data))

# data_dict = {}

# for row in csv_reader:
#     algorithm = row[0]
#     size = int(row[1])
#     time = int(row[2])

#     if algorithm not in data_dict:
#         data_dict[algorithm] = {'name': [], 'sizes': [], 'times': []}

#     data_dict[algorithm]['name'] = row[0]
#     data_dict[algorithm]['sizes'].append(size)
#     data_dict[algorithm]['times'].append(time)


# with open("outputs/toExcel.csv", "w") as file:
#     output = ""
#     for alg in data_dict:

#         pass
#     pass
