import csv
import numpy as np
import copy
from datetime import datetime
from sklearn.ensemble import RandomForestClassifier

columns = []
data = []
test_data = []

def read_data(filename):
  columns = []
  data = []
  with open(filename, 'rb') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    i = False
    for row in reader:
      if i == False:
        i = True
        pass
      else:
        data.append(row)
  return data

def transform_data(data):
  new_data = []
  for row in data:
    new_row = transform_row(row)
    new_data.append(new_row)
  return new_data

def transform_row(row):
  result = []
  date = datetime.strptime(row[0], '%Y-%m-%d %H:%M:%S')
  result.append(date.year)
  result.append(date.day)
  result.append(date.hour)
  for i in range(1, len(row)):
    result.append(float(row[i]))
  return result

def extract_input(data):
  input_data = []
  for row in data:
    input_row = []
    for i in range(len(row) - 3):
      input_row.append(row[i])
    input_data.append(input_row)
  return input_data

def extract_column(data, col):
  column_data = []
  for row in data:
    column_data.append(row[col])
  return column_data

data = read_data('train.csv')
transformed_data = transform_data(data)
input_values = extract_input(transformed_data)
casual_result = extract_column(transformed_data, len(transformed_data[0]) - 3)
registered_result = extract_column(transformed_data, len(transformed_data[0]) - 2)


classifier_casual = RandomForestClassifier(n_jobs=-1)
classifier_casual.fit(input_values, casual_result)
classifier_registered = RandomForestClassifier(n_jobs=-1)
classifier_registered.fit(input_values, registered_result)

test_data = read_data('test.csv')
t_test_data = transform_data(test_data)
#print len(test_data)
#print len(t_test_data)
#print len(t_test_data[0])
casual_p = classifier_casual.predict(t_test_data)
registered_p = classifier_registered.predict(t_test_data)

print 'datetime,count'
for i in range(len(test_data)):
  print '%s,%d' % (test_data[i][0], casual_p[i] + registered_p[i])

def train_on(data, results):
  N = len(data)
  assert(len(data) == len(results))
  X = data
  X = np.c_[ np.ones(N), X]
  Y = np.c_[results]
  XT = np.transpose(X)
  # inv(X' * X) * X' * Y
  res = np.linalg.inv(XT.dot(X)).dot(XT).dot(Y)
  return res
"""
beta = train_on(data[:, 1:10], data[:, 12])

copy_data = []
with open('test.csv', 'rb') as csvfile:
  reader = csv.reader(csvfile, delimiter=',')
  i = 0
  for row in reader:
    if i == 0:
      pass
    else:
      test_data.append(row)
    copy_data.append(copy.deepcopy(row))
    i = i + 1

for row in test_data:
  date = datetime.strptime(row[0], '%Y-%m-%d %H:%M:%S')
#  row.insert(0, date.year)
  row[0] = date.hour
  for i in range(1,len(row)):
    row[i] = float(row[i])

N = len(test_data)
test_data = np.c_[np.ones(len(test_data)), test_data]

values = test_data.dot(beta)

print 'datetime,count'
for i in range(len(test_data)):
  if values[i] < 0:
    values[i] = 0;
  values[i] = round(values[i])
  print '%s,%d' % (copy_data[i+1][0], values[i])

"""
