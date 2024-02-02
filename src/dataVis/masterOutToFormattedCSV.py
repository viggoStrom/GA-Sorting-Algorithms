
import json
import math

def rawToCSV(input="./outputs/master.txt", output="./outputs/semiSortedListRes.csv"):
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

        with open(output, "w") as outFile: # type: ignore
            # with open("./outputs/randomListRes.csv", "w") as outFile:

            for line in output:
                jsonLine = json.loads(line)

                n = jsonLine["metaData"]["listLength"]
                opsAvarage = math.floor(
                    stringSum(
                    jsonLine["semiSortedList"]["ops"].split(","))
                    /
                    jsonLine["metaData"]["loops"]
                )
                timeAvarage = (
                    stringSum(
                    jsonLine["semiSortedList"]["times"].split(","))
                    /
                    (jsonLine["metaData"]["loops"] * 1e6)
                )
                formattedOut = f'{jsonLine["name"]},{n},{opsAvarage}'
                # formattedOut = f'{jsonLine["name"]},{n},{jsonLine["metaData"]["averageOh"]},{opsAvarage},{stringSum(jsonLine["randomList"]["times"].split(","))/(jsonLine["metaData"]["loops"] * 1e6)}'

                outFile.write(formattedOut + "\n")
