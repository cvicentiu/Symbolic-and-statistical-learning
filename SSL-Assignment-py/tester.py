import os
import xml.etree.ElementTree as ET

class Tester:
  def __init__(self, path):
    self.read_truth_values(path)
    self.searches = self.read_truth_values(path)
    self.read_truth_values(path)

  def read_truth_values(self, path):
    truth_files_folder = path + '/truth_files/'
    files = os.listdir(truth_files_folder)
    searches = {}
    for f in files:
      if f[0] == '.':
        continue
      person_name = f[:-10]
      searches[person_name] = get_cluster_info(truth_files_folder + f)
    return searches

  def get_results(self, person_name, clusters):
    correct_clusters = self.searches[person_name.replace(' ', '_')]
    classes = {}
    for i in range(len(correct_clusters)):
      for item in correct_clusters[i]:
        classes[item] = i;

    total = 0
    counts = [] # Dictionary of number of items per class
    for i in range(len(clusters)):
      total += len(clusters[i])
      clusters_class_count = {}
      for item in clusters[i]:
        try:
          item_class = classes[str(item)]
        except:
          item_class = classes[str(0)]
          correct_clusters[item_class].append(item)
        clusters_class_count[item_class] = clusters_class_count.get(item_class, 0) + 1
      counts.append(clusters_class_count)

    cluster_maj = []
    for i in range(len(counts)):
      max = -1
      cls = -1
      for class_id in counts[i]:
        if max < counts[i][class_id]:
          max = counts[i][class_id]
          cls = class_id
      cluster_maj.append(cls)

    purity = 0
    inverse_purity = 0
    for i in range(len(counts)):
      purity += counts[i][cluster_maj[i]]
    
    for i in range(len(correct_clusters)):
      num_items = len(correct_clusters[i])
      max = -1
      for j in range(len(counts)):
        if counts[j].get(i, 0) > max:
          max = counts[j].get(i, 0)
      inverse_purity += max



    purity = purity / float(total)
    inverse_purity = inverse_purity / float(total)


    return (purity, inverse_purity)



def get_cluster_info(filename):
  with file(filename) as f:
    contents = f.read()
  #print contents
  root = ET.fromstring(contents)
  results = []
  for clustering in root:
    vec = []
    for item in clustering:
      vec.append(item.attrib['rank'])
    results.append(vec)
  return results









