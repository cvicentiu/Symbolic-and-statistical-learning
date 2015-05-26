import os
import xml.etree.ElementTree as ET

class Tester:
  def __init__(self, path):
    self.searches = self.read_truth_values(path)

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

  def get_results_purity_inverse_purity(self, person_name, clusters):
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
          item_class = classes[item]
        except:
          item_class = classes[0]
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

  def get_results_bcubed(self, person_name, clusters):
    correct_clusters = self.searches[person_name.replace(' ', '_')]

    final_precision = 0.0
    final_recall = 0.0
    for cluster in correct_clusters:
      recall = Tester.compute_recall(cluster, clusters)
      precision = Tester.compute_precision(cluster, clusters)
      final_precision += precision
      final_recall += recall

    final_precision = final_precision / len(correct_clusters)
    final_recall = final_recall / len(correct_clusters)

    return (final_precision, final_recall)

  @staticmethod
  def compute_recall(correct_cluster, classification):
    S = set(correct_cluster)
    R = []
    U = set([])
    for cluster in classification:
      Ri = S.intersection(set(cluster))
      if len(Ri) > 0:
        R.append(Ri)
        U = U.union(Ri)
    diff = S.difference(U)
    for item in diff:
      R.append(set([item]))

    if len(S) == 1:
      if len(U) == 1:
        return 1
      return 0
    return (len(S) - len(R)) / float(len(S) - 1)

    correct_docs = set(correct_cluster)
    num_docs = len(correct_cluster)
    num_different_clusters = 0
    for cluster in classification:
      docs_set = set(cluster)
      if len(docs_set.intersection(correct_docs)) > 0:
        num_different_clusters += 1

    if num_different_clusters == 0:
      return 0
    if num_docs == 1:
      return 1

    res = (num_docs - num_different_clusters) / float((num_docs - 1))
    return res

  @staticmethod
  def compute_precision(correct_cluster, classification):
    final_precision = 0.0
    for cluster in classification:
      partial_precision = Tester.compute_recall(cluster, [correct_cluster])
      final_precision += partial_precision

    final_precision = final_precision / len(classification)

    return final_precision

  @staticmethod
  def get_f_score(precision, recall, alpha):
    return 1 / (alpha * (1 / precision) + (1 - alpha) * (1 / recall))



def get_cluster_info(filename):
  with file(filename) as f:
    contents = f.read()
  #print contents
  root = ET.fromstring(contents)
  results = []
  for clustering in root:
    vec = []
    for item in clustering:
      vec.append(int(item.attrib['rank']))
    results.append(vec)
  return results









