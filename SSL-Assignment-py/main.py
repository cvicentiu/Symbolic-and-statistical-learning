from corpus import *
import os
import nltk
import features
from tester import Tester

from scipy.cluster.hierarchy import linkage, dendrogram
from scipy.cluster.hierarchy import fcluster
from matplotlib import pylab
import matplotlib.pyplot as plt


TRAINING_DATA_PATH = os.path.dirname(os.path.abspath(__file__)) + \
                        '/weps2007_data_1.1/training/'

corpus = Corpus(TRAINING_DATA_PATH)
corpus.read_person_searches()

t = Tester(TRAINING_DATA_PATH)

results = [0, 0]
for ps in corpus.person_searches:
  #tfs = features.TokenFeatureSet(ps.name, pd)
  psf = features.PersonSearchFeatures(ps)
  print ps.name
#  print len(psf.parsed_docs)
  Z = linkage(psf.distance_matrix, method='complete')
#  print psf.distance_matrix
#  print Z
  dendrogram(Z,
      color_threshold=1.5,
      leaf_font_size=6)
  pylab.savefig(ps.name + ".png")

  clusters_values = fcluster(Z, 1)

  clusters_dict = {}
  for i in range(len(clusters_values)):
    c_id = clusters_values[i]
    old_v = clusters_dict.get(c_id, [])
    old_v.append(i)
    clusters_dict[c_id] = old_v
  clusters = []
  for v in clusters_dict.values():
    clusters.append(v)



  res = t.get_results(ps.name, clusters)
  results[0] += res[0]
  results[1] += res[1]
  print res
  print len(clusters)
#print clusters
#print len(set(clusters))

results[0] /= len(corpus.person_searches)
results[1] /= len(corpus.person_searches)

print 'Average Results:'
print results





