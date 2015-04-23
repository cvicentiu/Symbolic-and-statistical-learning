import os
from bs4 import BeautifulSoup
import nltk
from nltk.stem.porter import PorterStemmer
from nltk.corpus import stopwords



class Document:
  def __init__(self, rank, contents):
    self.rank = rank
    self.contents = contents

  def __repr__(self):
    return self.__unicode__()

  def __unicode__(self):
    return 'Raw Doc: ' + str(self.rank)

class ParsedDocument(Document):
  def __init__(self, document):
    Document.__init__(self, document.rank, document.contents)
    self.title = ''
    self.paragraphs = []
    self.words = {}
    self.parse_document_()
    self.perform_tokenization_()

  def parse_document_(self):
    soup = BeautifulSoup(self.contents)
    for paragraph in soup.find_all('p'):
      self.paragraphs.append(paragraph.get_text(strip=False))
    if soup.title:
      self.title = soup.title.get_text()

  def perform_tokenization_(self):
#    st = PorterStemmer()
    s_words = set(stopwords.words('english'))
    for i in range(len(self.paragraphs)):
      self.paragraphs[i] = self.paragraphs[i].replace('\n', " ")
      self.paragraphs[i] = self.paragraphs[i].replace('\r', " ")
      self.paragraphs[i] = self.paragraphs[i].replace('\t', " ")
      self.paragraphs[i] = ' '.join(self.paragraphs[i].split())
      self.paragraphs[i] = nltk.sent_tokenize(self.paragraphs[i])
      for j in range(len(self.paragraphs[i])):
        sentence = self.paragraphs[i][j]
#        words = sentence
        words = nltk.word_tokenize(sentence)
        for w in words:
          lower_word = w.lower()
          self.words[lower_word] = self.words.get(lower_word, 0) + 1
#        stemmed_words = []
#        for word in words:
#          stemmed_words.append(st.stem(word))


        filtered_words = [w for w in words if not w.lower() in s_words]
        self.paragraphs[i][j] = filtered_words



  def __unicode__(self):
    return 'Parsed Doc: ' + self.title



class PersonSearch:
  def __init__(self, name, path):
    self.name = name
    self.path = path
    self.documents = []

  def read_person_search_results(self):
    person_folder_path = self.path + '/' + Corpus.WEB_PAGES + '/' + \
                         self.name.replace(' ', '_') + '/'
    raw_folder = person_folder_path + Corpus.RAW_FOLDER + '/'
    documentsFolders = os.listdir(raw_folder)
    for doc in documentsFolders:
      with file(raw_folder + '/' + doc + '/index.html') as f:
        document_rank = int(doc)
        document_contents = f.read()
        document = Document(document_rank, document_contents)
        self.documents.append(document)
    self.documents = sorted(self.documents, key=lambda x:x.rank)

  def __repr__(self):
    return self.__unicode__()
  def __str__(self):
    return self.__unicode__()

  def __unicode__(self):
    return self.name + ' ' + str(len(self.documents))

class Corpus:
  WEB_PAGES = 'web_pages/'
  DESCRIPTION_FILES = 'description_files/'
  RAW_FOLDER = 'raw/'
  def __init__(self, path):
    self.person_searches = []
    self.path = path

  def read_person_searches(self):
    person_names = get_person_names(self.path)
    for name in person_names:
      if "." in name:
        continue
      ps = PersonSearch(name, self.path)
      ps.read_person_search_results()
      self.person_searches.append(ps)

def get_person_names(path):
  description_files_path = path + '/' + Corpus.DESCRIPTION_FILES + '/'
  desc_files = os.listdir(description_files_path)
  names = []
  for f in desc_files:
    names.append(f[:-4].replace('_', ' '))
  return names
