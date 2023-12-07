
# import json
# import math


# def stringSum(interable):
#     sumOut = 0
#     for string in interable:
#         sumOut += int(string)
#     return sumOut


# with open("./outputs/master.txt") as inFile:
#     raw = inFile.readlines()
#     entries = []
#     for entry in raw:
#         entries.append(json.loads(entry))

#     sortedEntries = sorted(entries, key=lambda d: (d["name"], d["metaData"]["listLength"]))

#     output = []
#     for entry in sortedEntries:
#         output.append(json.dumps(entry))

#     with open("./outputs/pythonOut.csv","w") as outFile:
#         # outFile.write("name,list length, expected O(), actual O()\n")

#         for line in output:
#             jsonLine = json.loads(line)

#             n = jsonLine["metaData"]["listLength"]
#             opsAvarage = math.floor(stringSum(jsonLine["randomList"]["ops"].split(",")) / jsonLine["metaData"]["loops"])
#             timeAvarage = stringSum(jsonLine["randomList"]["times"].split(",")) / (jsonLine["metaData"]["loops"] * 1e6)
#             formattedOut = f'{jsonLine["name"]},{n},{opsAvarage}' # ,{timeAvarage}
#             # formattedOut = f'{jsonLine["name"]},{n},{jsonLine["metaData"]["averageOh"]},{opsAvarage},{stringSum(jsonLine["randomList"]["times"].split(","))/(jsonLine["metaData"]["loops"] * 1e6)}'

#             outFile.write(formattedOut + "\n")


import io
import csv

# Assuming your data is stored in a string variable named 'data'
data = open("outputs/pythonOut.csv", "r").read()

# Create a CSV reader for the data
csv_reader = csv.reader(io.StringIO(data))

# Dictionary to store data for each algorithm
data_dict = {}

# Iterate through the CSV reader and organize the data
for row in csv_reader:
    algorithm = row[0]
    size = int(row[1])
    time = int(row[2])

    if algorithm not in data_dict:
        data_dict[algorithm] = {'sizes': [], 'times': []}

    data_dict[algorithm]['sizes'].append(size)
    data_dict[algorithm]['times'].append(time)

print(data_dict)

with open("outputs/toExcel.csv", "w") as outputFile:

    pass
