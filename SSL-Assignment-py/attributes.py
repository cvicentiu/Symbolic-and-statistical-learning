from corpus import *
import re

class Attributes(object):
  def __init__(self, person_search, cluster, classifier):
    self.classifier = classifier
    print cluster
    for document_idx in cluster:
      print 'DOC IDX'
      print document_idx
      document = person_search.documents[document_idx]
      parsed_doc = ParsedDocument(document, perform_tokenization=False)
      self.extract_phone_number(parsed_doc)

  def extract_phone_number(self, parsed_doc):
    prog = re.compile('[0-9+(][.()0-9s/-]{4,}[0-9]{1,5}')
    for paragraph in parsed_doc.paragraphs:
      paragraph_l = paragraph.lower()
      TEL_LIST = ['tel', 'telephone', 'ph:', 'phone', 'mobile', 'call', 'reached at',
                  'office', 'cell', 'contact']
      for word in TEL_LIST:
        if word in paragraph_l:
          m = prog.findall(paragraph_l)
          if len(m) > 0:
            print m




  def extract_attributes(self):
    return [] # TODO
