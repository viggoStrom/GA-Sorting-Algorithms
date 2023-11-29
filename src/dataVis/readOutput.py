
import json
import math


def stringSum(interable):
    sumOut = 0
    for string in interable:
        sumOut += int(string)
    return sumOut


with open("./outputs/master.txt") as inFile:
    raw = inFile.readlines()
    entries = []
    for entry in raw:
        entries.append(json.loads(entry))
        
    sortedEntries = sorted(entries, key=lambda d: (d["name"], d["metaData"]["listLength"]))
        
    output = []
    for entry in sortedEntries:
        output.append(json.dumps(entry))
        
    with open("./outputs/pythonOut.csv","w") as outFile:
        # outFile.write("name,list length, expected O(), actual O()\n")
        
        for line in output:
            jsonLine = json.loads(line)

            n = jsonLine["metaData"]["listLength"]
            opsAvarage = math.floor(stringSum(jsonLine["randomList"]["ops"].split(",")) / jsonLine["metaData"]["loops"])
            timeAvarage = stringSum(jsonLine["randomList"]["times"].split(",")) / (jsonLine["metaData"]["loops"] * 1e6)
            formattedOut = f'{jsonLine["name"]},{n},{opsAvarage},{timeAvarage}'
            # formattedOut = f'{jsonLine["name"]},{n},{jsonLine["metaData"]["averageOh"]},{opsAvarage},{stringSum(jsonLine["randomList"]["times"].split(","))/(jsonLine["metaData"]["loops"] * 1e6)}'

            outFile.write(formattedOut + "\n")