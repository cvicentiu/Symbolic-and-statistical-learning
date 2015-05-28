from corpus import *
import re
import operator
import nltk

class Attributes(object):
  def __init__(self, person_search, cluster, classifier):
    self.classifier = classifier
    self.cluster = cluster
    self.person_search = person_search



  def extract_phone_number(self, parsed_doc):
    result = {}
    prog = re.compile('(\d{3})\D*(\d{3})\D*(\d{4})\D*(\d*)$')
#    prog = re.compile('([0-9+(][.()0-9s/-]{4,}[0-9]){1,5}')
    for paragraph in parsed_doc.paragraphs:
      paragraph_l = paragraph.lower()
      TEL_LIST = ['tel', 'telephone', 'ph:', 'phone', 'mobile', 'call', 'reached at',
                  'office', 'cell', 'contact']
      for word in TEL_LIST:
        if word in paragraph_l:
          numbers = prog.findall(paragraph_l)
          for number in numbers:
            result[number] = result.get(number, 0) + 1
    return result

  def extract_birth_place(self, parsed_doc):
    result = {}
    for paragraph in parsed_doc.paragraphs:
      has_hint = False
      HINT_LIST = ['born', 'birth', 'birthplace', 'hometown', 'native']
      locations = []
      for sentence in paragraph:
        words = nltk.word_tokenize(sentence.lower())
        for hint in HINT_LIST:
          if hint in words:
            tag_list = self.classifier.tag([sentence])
            for elem in tag_list:
              prev_term = False
              for i in range(len(elem)):
                term = elem[i]
                if 'LOCATION' in term[1]:
                  if prev_term == True:
                    locations[-1] = locations[-1] + ' ' + term[0]
                  else:
                    locations.append(term[0])
                  prev_term = True
                else:
                  prev_term = False
            break

      for loc in locations:
        result[loc] = result.get(loc, 0) + 1
    return result




  def extract_attributes(self):
    result = []
    numbers = {}
    birthplaces = {}
    for document_idx in self.cluster:
      document = self.person_search.documents[document_idx]
      parsed_doc = ParsedDocument(document, perform_tokenization=False)
      # Retrieve phone numbers
      number_freq = self.extract_phone_number(parsed_doc)
      Attributes.merge_freq_dictionaries(numbers, number_freq)

      parsed_doc = ParsedDocument(document, perform_tokenization=True, remove_stopwords=False)
      # Retrieve birth places
      birthplace_freq = self.extract_birth_place(parsed_doc)
      Attributes.merge_freq_dictionaries(birthplaces, birthplace_freq)

    result.append(('phone', Attributes.select_k_most_frequent(numbers, 2)))
    result.append(('birthplace', birthplaces))
    return result # TODO

  @staticmethod
  def merge_freq_dictionaries(dest, source):
    for k in source:
      dest[k] = dest.get(k, 0) + source[k]

  @staticmethod
  def select_k_most_frequent(dict, k):
    sorted_dict = sorted(dict.items(), key=operator.itemgetter(1))
    result = []
    added = 0
    for i in reversed(range(len(sorted_dict))):
      result.append(sorted_dict[i][0])
      if len(result) == k:
        return result
    return result


