

  d = new dTree('d');
  d.add(0,-1,'');
  //d.add(id, pid,'text','URL','title','target','image file');  
  d.add(1,0,'<span class="chapter">Introduction<\/span>','','Introduction','','');
  d.add(2,1,'<span class="tree_links">Overview<\/span>','/true/intro/overview.html','Overview','','');
  d.add(3,1,'<span class="tree_links">Value of Documentary &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Histories<\/span>','/true/intro/value.html','Value','','');
  d.add(4,1,'<span class="tree_links">Issues This Collection &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Raises<\/span>','/true/intro/issues.html','Issues','','');
  d.add(5,1,'<span class="tree_links">"Little Narratives of &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Literacy"<\/span>','/true/intro/narratives.html','Narratives','','');
  d.add(6,1,'<span class="tree_links">Further Research<\/span><br /><br />','/true/intro/further_research.html','Research','','');

  d.add(7,0,'<span class="chapter">Chapter 1: 1795-1819<\/span>','','Chapter 1','','');
  d.add(8,7,'<span class="tree_links">The Establishment of the &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;University<\/span>','/true/chapter/chp01-01/chp01-01.html','Establishment','','');
  d.add(9,7,'<span class="tree_links">The Early Faculty<\/span>','/true/chapter/chp01-02/chp01-02.html','Faculty','','');
  d.add(10,7,'<span class="tree_links">The Early Curriculum<\/span>','/true/chapter/chp01-03/chp01-03.html','Curriculum','','');
  d.add(11,7,'<span class="tree_links">Early Student Rebellions<\/span>','/true/chapter/chp01-04/chp01-04.html','Rebellions','','');
  d.add(12,7,'<span class="primary_docs">Primary Documents<\/span><br /><br />','/true/browse/chp01_mss.html','Primary','','');

  d.add(13,0,'<span class="chapter">Chapter 2: 1820-1829<\/span>','');
  d.add(14,13,'<span class="tree_links">Overview: 1820-29<\/span>','/true/chapter/chp02-01/chp02-01.html');
  d.add(15,13,'<span class="tree_links">Purposes of a University &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Education<\/span>','/true/chapter/chp02-02/chp02-02.html');
  d.add(16,13,'<span class="primary_docs">Primary Documents<\/span><br /><br />','/true/browse/chp02_mss.html');

  d.add(17,0,'<span class="chapter">Chapter 3: 1830-1839<\/span>','');
  d.add(18,17,'<span class="tree_links">Overview: 1830-39<\/span>','/true/chapter/chp03-01/chp03-01.html');
  d.add(19,17,'<span class="tree_links">The School Day and the &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;School Year<\/span>','/true/chapter/chp03-02/chp03-02.html');
  d.add(20,17,'<span class="tree_links">Slaves and Servants<\/span>','/true/chapter/chp03-03/chp03-03.html');
  d.add(21,17,'<span class="primary_docs">Primary Documents<\/span><br /><br />','/true/browse/chp03_mss.html');

  d.add(22,0,'<span class="chapter">Chapter 4: 1840-1849<\/span>','');
  d.add(23,22,'<span class="tree_links">Overview: 1840-49<\/span>','/true/chapter/chp04-01/chp04-01.html');
  d.add(24,22,'<span class="tree_links">Writing in the Academy<\/span>','/true/chapter/chp04-02/chp04-02.html');
  d.add(25,22,'<span class="primary_docs">Primary Documents<\/span><br /><br />','/true/browse/chp04_mss.html');

  d.add(26,0,'<span class="chapter">Chapter 5: 1850-1859<\/span>','');
  d.add(27,26,'<span class="tree_links">Overview: 1850-59<\/span>','/true/chapter/chp05-01/chp05-01.html');
  d.add(28,26,'<span class="tree_links">The Debating Societies<\/span>','/true/chapter/chp05-02/chp05-02.html');
  d.add(29,26,'<span class="primary_docs">Primary Documents<\/span><br /><br />','/true/browse/chp05_mss.html');

  d.add(30,0,'<span class="chapter">Chapter 6: 1860-1869<\/span>','');
  d.add(31,30,'<span class="tree_links">Civil War<\/span>','/true/chapter/chp06-01/chp06-01.html');
  d.add(32,30,'<span class="tree_links">Aftermath of the Civil War<\/span>','/true/chapter/chp06-02/chp06-02.html');
  d.add(33,30,'<span class="primary_docs">Primary Documents<\/span><br /><br />','/true/browse/chp06_mss.html');

  d.add(34,0,'<span class="chapter">Editorial Practices<\/span>','');
  d.add(35,34,'<span class="tree_links">Beginnings<\/span>','/true/about/beginnings.html');
  d.add(36,34,'<span class="tree_links">Major Manuscript &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Collections<\/span>','/true/about/major_manuscript.html');
  d.add(37,34,'<span class="tree_links">Selection Criteria<\/span>','/true/about/selection_criteria.html');
  d.add(38,34,'<span class="tree_links">Editorial Goals<\/span>','/true/about/editorial_goals.html');
  d.add(39,34,'<span class="tree_links">Transcriptions<\/span>','/true/about/transcriptions.html');
  d.add(40,34,'<span class="tree_links">Emendations<\/span>','/true/about/emendations.html');
  d.add(41,34,'<span class="tree_links">Annotations<\/span><br /><br />','/true/about/annotations.html');

  document.write(d);

  //<p><a href="mailto&#58;drop&#64;destroydrop&#46;com">&copy;2002-2003 Geir Landr&ouml;<\/a><\/p>


