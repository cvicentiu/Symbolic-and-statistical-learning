document.write('<div class="dynamicbucket more">  <div class="buckettop">&nbsp;</div>  <h3><a href="/templates/topics/topic.php?topicId=1021">More People & Places        </a>  </h3>  <div class="bucketcontent">     <ul>');
stories = 0;
if (storyId != 7545512)
{
document.write('       <li><a href="/templates/story/story.php?storyId=7545512">Celebrity Parrots to Get Home Insurance</a></li>');
   stories++;
}
if (storyId != 7576261)
{
document.write('       <li><a href="/templates/story/story.php?storyId=7576261">Labor Photos Shed Light on Family History</a></li>');
   stories++;
}
if (stories < 2)
{
document.write('       <li><a href="/templates/story/story.php?storyId=7504120">Opting Out of College for a Blue-Collar Life</a></li>');
   stories++;
}
document.write('     </ul>     <div class="more"><a href="/templates/topics/topic.php?topicId=1021">More &raquo;</a></div>  </div>  <div class="bucketbottom">&nbsp;</div></div>');


