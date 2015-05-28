document.write('<div class="dynamicbucket more">  <div class="buckettop">&nbsp;</div>  <h3><a href="/templates/topics/topic.php?topicId=1022">More Interviews        </a>  </h3>  <div class="bucketcontent">     <ul>');
stories = 0;
if (storyId != 7593231)
{
document.write('       <li><a href="/templates/story/story.php?storyId=7593231">Aimee Liu, \'Gaining\' Perspective on Eating Issues</a></li>');
   stories++;
}
if (storyId != 7584958)
{
document.write('       <li><a href="/templates/story/story.php?storyId=7584958">A Veteran\'s View of Conditions at Walter Reed</a></li>');
   stories++;
}
if (stories < 2)
{
document.write('       <li><a href="/templates/story/story.php?storyId=7590503">Billie Jean King Cheers Equal Pay at Wimbledon</a></li>');
   stories++;
}
document.write('     </ul>     <div class="more"><a href="/templates/topics/topic.php?topicId=1022">More &raquo;</a></div>  </div>  <div class="bucketbottom">&nbsp;</div></div>');


