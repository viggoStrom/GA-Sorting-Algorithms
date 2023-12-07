import matplotlib.pyplot as plt
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

# Plot the data
plt.figure(figsize=(10, 6))

for algorithm, values in data_dict.items():
    plt.plot(values['sizes'], values['times'], label=algorithm)

plt.xlabel('Input Size')
plt.ylabel('Time')
plt.title('Sorting Algorithms Performance')
plt.legend()
plt.grid(True)
plt.show()



# import matplotlib.pyplot as plt
# import numpy as np

# labels = []
# x = []

# with open("outputs/pythonOut.csv", "r") as inputFile:
#     for line in inputFile.readlines():
#         data = line.split(",")
#         if data[0] == "Selectionsort":
#             x.append(data[2])
#             # y.append(data[1])
#         pass
#     pass

# y = np.linspace(0, 100_000, len(x))
# plt.scatter(y, x)

# plt.show()

# import matplotlib.pyplot as plt
# import numpy as np

# plt.style.use('_mpl-gallery')

# # make data
# x = np.linspace(0, 10, 100)
# y = 4 + 2 * np.sin(2 * x)

# # plot
# fig, ax = plt.subplots()

# ax.plot(x, y, linewidth=2.0)

# # ax.set(xlim=(0, 8), xticks=np.arange(1, 8),
# #        ylim=(0, 8), yticks=np.arange(1, 8))

# plt.show()
