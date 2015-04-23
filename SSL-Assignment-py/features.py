import corpus
import math
import numpy
from numpy.linalg import norm
from scipy.spatial.distance import pdist
from numpy import clip

class TokenFeatureSet:
  def __init__(self, query, parsed_document):
    self.document = parsed_document
    self.queryname_tokens = self.get_queryname_tokens_(query)

  def get_queryname_tokens_(self, query):
    name_tokens = query.split(' ')
    for i in range(len(name_tokens)):
      name_tokens[i] = name_tokens[i].lower()
    tokens_dict = {}
    for paragraph in self.document.paragraphs:
      for sentence in paragraph:
        match = False
        for word in sentence:
          for name_token in name_tokens:
            if name_token == word.lower(): # TODO perhaps use a word distance
              match = True
              break
          if match == True:
            break
        if match == True:
          for word in sentence:
            key = word.lower()
            tokens_dict[key] = tokens_dict.get(key, 0) + 1
    return tokens_dict


def get_all_words_frequencies(parsed_documents):
  freq = {}
  for document in parsed_documents:
    for word in document.words:
      freq[word] = freq.get(word, 0) + 1
  return freq

def get_all_query_words_frequencies(token_feature_sets):
  freq = {}
  for tfs in token_feature_sets:
    doc_freq = tfs.queryname_tokens
    for k in doc_freq.keys():
      freq[k] = freq.get(k, 0) + doc_freq[k]
  return freq


class PersonSearchFeatures:
  def __init__(self, person_search):
    self.person_search = person_search
    self.parsed_docs = []
    self.token_feature_sets = []
    for d in person_search.documents:
      self.parsed_docs.append(corpus.ParsedDocument(d))
      self.token_feature_sets.append(TokenFeatureSet(person_search.name, self.parsed_docs[-1]))
    self.all_words = get_all_words_frequencies(self.parsed_docs)
    self.all_query_words = get_all_query_words_frequencies(self.token_feature_sets)
    self.feature_vector = sorted(self.all_query_words.keys())

    self.feature_matrix = []
    for i in range(len(self.token_feature_sets)):
      self.feature_matrix.append(self.compute_feature_vector(i))
#    self.distance_matrix = pdist(self.feature_matrix, 'correlation'), 1)

    self.distance_matrix = []
    for i in range(len(self.token_feature_sets)):
      row = []
      for j in range(len(self.token_feature_sets)):
        row.append(1 - self.compute_similarity(i, j))
      self.distance_matrix.append(row)

  def compute_feature_vector(self, doc_idx):
    result = []
    for word in self.feature_vector:
      query_dict = self.token_feature_sets[doc_idx].queryname_tokens
      tf = query_dict.get(word, 0)
      n_docs = len(self.token_feature_sets)
      n_docs_with_word = 0
      for tfs in self.token_feature_sets:
        if tfs.queryname_tokens.get(word, 0) > 0:
          n_docs_with_word += 1
      idf = math.log(n_docs / n_docs_with_word)
      result.append(tf * idf)
    return result

  def compute_similarity(self, p1, p2):
    if p1 == p2:
      return 1
    v1 = self.feature_matrix[p1]
    v2 = self.feature_matrix[p2]
#    numpy.seterr(all='call')
#    numpy.seterrcall(f1)
#    prod = 0
#    for i in range(len(v1)):
#      prod += v1[i] * v2[i]
#    if (math.isnan(n)):
#      return 0
#    if (math.isnan(prod)
    dot = numpy.dot(v1, v2)
    n = norm(v1) * norm(v2)
    if math.isnan(dot):
      return 0
    result = dot / n
    if math.isnan(result):
      return 0
    return result

