import corpus
import math
import numpy
from numpy.linalg import norm
from scipy.spatial.distance import pdist
import scipy
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



class PersonSearchFeatures:
  def __init__(self, person_search):
    self.person_search = person_search
    self.parsed_docs = []
    self.token_feature_sets = []
    # Go through all documents for that person search
    for d in person_search.documents:
      # Parse them to obtain the useful information
      self.parsed_docs.append(corpus.ParsedDocument(d))
      # Obtain the feature sets based on tokens for that particular document.
      self.token_feature_sets.append(TokenFeatureSet(person_search.name, self.parsed_docs[-1]))

    self.all_words = PersonSearchFeatures.get_all_words_frequencies(self.parsed_docs)
    self.all_query_words = PersonSearchFeatures.get_all_query_words_frequencies(self.token_feature_sets)
    self.features = sorted(self.all_query_words.keys())

    #print self.features
    #print '----'
    self.clean_features()
    #print self.features
    #print '----'

    #exit(1)
    # Clean up the feature vector

    # One row within the matrix represents the features describing the document.
    self.feature_matrix = []
    for i in range(len(self.token_feature_sets)):
      self.feature_matrix.append(self.compute_feature_vector(i))

    self.distance_matrix = pdist(numpy.array(self.feature_matrix), 'correlation')
    self.distance_matrix = scipy.spatial.distance.squareform(self.distance_matrix)
    self.distance_matrix = numpy.nan_to_num(self.distance_matrix)


  @staticmethod
  def get_all_words_frequencies(parsed_documents):
    freq = {}
    for document in parsed_documents:
      for word in document.words:
        freq[word] = freq.get(word, 0) + 1
    return freq


  @staticmethod
  def get_all_query_words_frequencies(token_feature_sets):
    freq = {}
    for tfs in token_feature_sets:
      doc_freq = tfs.queryname_tokens
      for k in doc_freq.keys():
        freq[k] = freq.get(k, 0) + doc_freq[k]
    return freq


  def compute_feature_vector(self, doc_idx):
    result = []
    for word in self.features:
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

  def clean_features(self):
    new_features = []
    FORBIDDEN_CHARS=['/', 'www', '-', '%']
    for i in xrange(len(self.features)):
      if len(self.features[i]) < 3:
        continue
      found = False
      for seq in FORBIDDEN_CHARS:
        if seq in self.features[i]:
          found = True
          break
      if not found:
        new_features.append(self.features[i])

    self.features = new_features
