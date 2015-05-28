<!--##Javascript Calendar Copyright by Eugene Vassiltsov##-->

function show_calendar() {
if (parseInt(navigator.appVersion.substring(0,1)) < 4)  return;
calendar = new Date();
day = calendar.getDay();
month = calendar.getMonth();
date = calendar.getDate();
year = calendar.getYear();
if (year < 1000) year += 1900;

cent = parseInt(year/100);
g = year % 19;
k = parseInt((cent - 17)/25);
i = (cent - parseInt(cent/4) - parseInt((cent - k)/3) + 19*g + 15) % 30;
i = i - parseInt(i/28)*(1 - parseInt(i/28)*parseInt(29/(i+1))*parseInt((21-g)/11));
j = (year + parseInt(year/4) + i + 2 - cent + parseInt(cent/4)) % 7;
l = i - j;
emonth = 3 + parseInt((l + 40)/44);
edate = l + 28 - 31*parseInt((emonth/4));
edatea = l + 28 - 31*parseInt((emonth/4)) - 2;
edateb = l + 28 - 31*parseInt((emonth/4)) - 3;
emonth--;
var dayname = new Array ("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
var monthname = new Array ("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" );
document.write("<font face=verdana,arial size=1 color=white><b>");
document.write(dayname[day] + ", ");
document.write(monthname[month] + " ");
if (date< 10) document.write("0" + date + ", ");
	else document.write(date + ", ");
document.write(year + "    <font color=white>");

// January
if ((month == 0) && (date == 1)) document.write("Feast Day of Mary, Mother of God (Holy Day of Obligation)");
if ((month == 0) && (date == 2)) document.write("Feast Day of St. Basil the Great & St. Gregory Nazianzen");
if ((month == 0) && (date == 3)) document.write("Feast Day of St. Genevieve, Virgin, Patroness of Paris");
if ((month == 0) && (date == 4)) document.write("Feast Day of St. Elizabeth Ann Seton");
if ((month == 0) && (date == 5)) document.write("Feast Day of St. John Neumann, Bishop");
if ((month == 0) && (date == 6)) document.write("Feast Day of Blessed Brother Andre Bessette");
if ((month == 0) && (date == 7)) document.write("Feast Day of St. Raymond of Penafort");
if ((month == 0) && (date == 8)) document.write("Feast Day of St. Severin, Abbot, & St. Thorfinn");
if ((month == 0) && (date == 9)) document.write("Feast Day of St. Julian of Cuenca & St. Adrian of Canterbury");
if ((month == 0) && (date == 10)) document.write("Feast Day of St. Peter Orseolo & St. William of Bourges");
if ((month == 0) && (date == 11)) document.write("Feast Day of St. Theodosius the Cenobiarch and St. Paulinus, Patriarch of Aquileia");
if ((month == 0) && (date == 12)) document.write("Feast Day of St. Marguerite Bourgeoys & St. Aelred");
if ((month == 0) && (date == 13)) document.write("Feast Day of St. Hilary of Poitiers & St. Veronica");
if ((month == 0) && (date == 14)) document.write("Feast Day of St. Sava, Patron of the Serbs, and St. Malachy");
if ((month == 0) && (date == 15)) document.write("Feast Day of St. Ita, Virgin, and St. Paul, Hermit");
if ((month == 0) && (date == 16)) document.write("Feast Day of St. Macellus and St. Honoratus");
if ((month == 0) && (date == 17)) document.write("Feast Day of St. Anthony the Abbot, Founder of Monasticism");
if ((month == 0) && (date == 18)) document.write("Feast Day of St. Prisca");
if ((month == 0) && (date == 19)) document.write("Feast Day of St. Marius and St. Wulfstan, Bishop");
if ((month == 0) && (date == 20)) document.write("Feast Day of St. Fabian, Martyr, and St. Sebastian, Martyr, Patron of Athletes");
if ((month == 0) && (date == 21)) document.write("Feast Day of St. Agnes, Virgin, Martyr");
if ((month == 0) && (date == 22)) document.write("Feast Day of St. Vincent of Saragossa, Deacon, Martyr, Patron of Winemakers");
if ((month == 0) && (date == 23)) document.write("Feast Day of St. John the Almsgiver and St. Emerentiana");
if ((month == 0) && (date == 24)) document.write("Feast Day of St. Francis de Sales, Bishop, Patron of Writers");
if ((month == 0) && (date == 25)) document.write("Feast Day of the Conversion of St. Paul");
if ((month == 0) && (date == 26)) document.write("Feast Day of Sts. Timothy and Titus, Bishops");
if ((month == 0) && (date == 27)) document.write("Feast Day of St. Angela Merici, Virgin, Founder of the Ursulines");
if ((month == 0) && (date == 28)) document.write("Feast Day of St. Thomas Aquinas, Doctor of the Church, Patron of Catholic Students");
if ((month == 0) && (date == 29)) document.write("Feast Day of St. Valerius and St. Gildas the Wise, Abbot");
if ((month == 0) && (date == 30)) document.write("Feast Day of St. Hyacintha Mariscotti & St. Martina");
if ((month == 0) && (date == 31)) document.write("Feast Day of St. John Bosco, Patron of Editors, & St. Marcella");
// February
if ((month == 1) && (date == 2)) document.write("Feast Day of the Presentation of the Lord");
if ((month == 1) && (date == 3)) document.write("Feast Day of St. Blaise");
if ((month == 1) && (date == 5)) document.write("Feast Day of St. Agatha");
if ((month == 1) && (date == 8)) document.write("Feast Day of St. Jerome Emilian");
if ((month == 1) && (date == 10)) document.write("Feast Day of St. Scholastica");
if ((month == 1) && (date == 11)) document.write("Feast Day of Our Lady of Lourdes");
if ((month == 1) && (date== 12)) document.write("Lincoln's Birthday");
if ((month == 1) && (date == 14)) document.write("Feast Day of Sts. Cyril and Methodius");
if ((month == 1) && (date == 17)) document.write("Feast Day of the Seven Founders of the Order of Servites");
if ((month == 1) && (date == 21)) document.write("Feast Day of St. Peter Damian");
if ((month == 1) && (date == 22)) document.write("Feast Day of the Chair of St. Peter");
if ((month == 1) && (date == 23)) document.write("Feast Day of St. Polycarp");
if ((month == 1) && (date == 29)) document.write("Leap Day");
// March
if ((month == 2) && (date == 1)) document.write("Feast Day of St. Albinus, Bishop");
if ((month == 2) && (date == 2)) document.write("Feast Day of St. Basileus");
if ((month == 2) && (date == 3)) document.write("Feast Day of St. Katharine Drexel");
if ((month == 2) && (date == 4)) document.write("Feast Day of St. Casimir, King, Patron of Poland");
if ((month == 2) && (date == 5)) document.write("Feast Day of St. John Joseph of the Cross, St. Adrian, Martyr");
if ((month == 2) && (date == 6)) document.write("Feast Day of St. Colette, Virgin");
if ((month == 2) && (date == 7)) document.write("Feast Day of Sts. Perpetua and Felicity, Martyrs");
if ((month == 2) && (date == 8)) document.write("Feast Day of St. John of God, Patron of Booksellers");
if ((month == 2) && (date == 9)) document.write("Feast Day of St. Frances of Rome, St. Dominic Savio");
if ((month == 2) && (date == 10)) document.write("Feast Day of the Forty Holy Martyrs of Sebaste");
if ((month == 2) && (date == 11)) document.write("Feast Day of St. Eulogius, Martyr");
if ((month == 2) && (date == 12)) document.write("Feast Day of St. Euphrasia, Virgin");
if ((month == 2) && (date == 13)) document.write("Feast Day of St. Matilda, Queen, Patroness of Parents of Large Families");
if ((month == 2) && (date == 14)) document.write("Feast Day of St. Louise de Marillac, Widow, Founder of Sisters of Charity");
if ((month == 2) && (date == 15)) document.write("Feast Day of St. Agapetus, Pope");
if ((month == 2) && (date == 16)) document.write("Feast Day of St. Heribert, Bishop");
if ((month == 2) && (date == 17)) document.write("Feast Day of St. Patrick, Bishop, Patron of Ireland");
if ((month == 2) && (date == 18)) document.write("Feast Day of St. Cyril of Jerusalem, Bishop");
if ((month == 2) && (date == 19)) document.write("Feast Day of St. Joseph, husband of the Blessed Virgin Mary");
if ((month == 2) && (date == 20)) document.write("Feast Day of St. Cuthbert");
if ((month == 2) && (date == 21)) document.write("Feast Day of St. Nicholas of Flue, Hermit, Patron of Switzerland");
if ((month == 2) && (date == 22)) document.write("Feast Day of St. Catherine of Genoa, Mystic");
if ((month == 2) && (date == 23)) document.write("Feast Day of St. Turibius of Mogrovejo, Bishop of Lima, Peru");
if ((month == 2) && (date == 24)) document.write("Feast Day of St. Catherine of Sweden, Virgin");
if ((month == 2) && (date == 25)) document.write("Feast Day of the Annunciation of the Lord");
if ((month == 2) && (date == 26)) document.write("Feast Day of St. Ludger, St. Emmanuel, Martyr");
if ((month == 2) && (date == 27)) document.write("Feast Day of St. Rupert of Salzburg, Bishop");
if ((month == 2) && (date == 28)) document.write("Feast Day of St. Guntramnus, King");
if ((month == 2) && (date == 29)) document.write("Feast Day of St. Joseph of Arimathea, Patron of Funeral Directors");
if ((month == 2) && (date == 30)) document.write("Feast Day of St. John Climacus, Abbot");
if ((month == 2) && (date == 31)) document.write("Feast Day of St. Cornelia, St. Benjamin, Deacon, Martyr");
// April
if ((month == 3) && (date == 1)) document.write("Feast Day of St. Hugh and St. Venantius Fortunatus");
if ((month == 3) && (date == 2)) document.write("Feast Day of St. Francis of Paola");
if ((month == 3) && (date == 3)) document.write("Feast Day of St. Richard, Bishop of Chichester, St. Irene of Thessalonica");
if ((month == 3) && (date == 4)) document.write("Feast Day of St. Isadore of Seville");
if ((month == 3) && (date == 5)) document.write("Feast Day of St. Vincent Ferrer, Bl. Juliana of Mt. Cornillon");
if ((month == 3) && (date == 6)) document.write("Feast Day of St. Marcellinus of Carthage, Martyr");
if ((month == 3) && (date == 7)) document.write("Feast Day of St. John Baptist de la Salle");
if ((month == 3) && (date == 8)) document.write("Feast Day of St. Julie Billiart");
if ((month == 3) && (date == 9)) document.write("Feast Day of St. Mary of Cleophas");
if ((month == 3) && (date == 10)) document.write("Feast Day of St. Ezechiel, 1 of 4 Major Prophets of the Old Testament");
if ((month == 3) && (date == 11)) document.write("Feast Day of St. Stanislaus, St. Leo the Great, St. Gemma Galgani");
if ((month == 3) && (date == 12)) document.write("Feast Day of St. Julius, St. Sabbas, Martyr");
if ((month == 3) && (date == 13)) document.write("Feast Day of St. Martin I, St. Hermenegild, Bl. Margaret of Castello");
if ((month == 3) && (date == 14)) document.write("Feast Day of St. Justin, Sts. Tiburtius, Valerian and Maximus, Martyrs");
if ((month == 3) && (date == 15)) document.write("Feast Day of Sts. Basilissa and Anastasia, St. Paternus,  Bishop");
if ((month == 3) && (date == 16)) document.write("Feast Day of St. Benedict Joseph Labre");
if ((month == 3) && (date == 17)) document.write("Feast Day of St. Anicetus, Martyr, St. Stephen Harding, Abbot");
if ((month == 3) && (date == 18)) document.write("Feast Day of St. Apollonius, Martyr");
if ((month == 3) && (date == 19)) document.write("Feast Day of St. Elphege, Bishop and Martyr, St. Leo IX, Pope");
if ((month == 3) && (date == 20)) document.write("Feast Day of St. Agnes of Montepulciano, Virgin, St. Marcellinus, Bishop");
if ((month == 3) && (date == 21)) document.write("Feast Day of St. Anselm, Bishop, St. Conrad");
if ((month == 3) && (date == 22)) document.write("Feast Day of Sts. Caius and Soter, Martyrs, Sts. Epipodius and Alexander, Martyrs");
if ((month == 3) && (date == 23)) document.write("Feast Day of St. George, Martyr, St. Adalbert, Bishop and Martyr");
if ((month == 3) && (date == 24)) document.write("Feast Day of St. Fidelis of Sigmaringen, Martyr");
if ((month == 3) && (date == 25)) document.write("Feast Day of St. Mark, Evangelist, Patron of Notaries");
if ((month == 3) && (date == 26)) document.write("Feast Day of St. Cletus and Marcellius, Priests and Martyrs");
if ((month == 3) && (date == 27)) document.write("Feast Day of St. Peter Canisius, St. Zita, Virgin, Patronness of Domestic Workers");
if ((month == 3) && (date == 28)) document.write("Feast Day of St. Peter Chanel, St. Louis Marie De Montfort, St. Paul of the Cross");
if ((month == 3) && (date == 29)) document.write("Feast Day of St. Catherine of Siena, Virgin, Patron of Italy, St. Peter of Verona");
if ((month == 3) && (date == 30)) document.write("Feast Day of St. Pius V, Pope");
if ((month == 3) && (day == 0) && (date > 0) && (date< 8)) document.write("....Daylight Savings Time Begins");
if ((month == emonth) && (date == edate)) document.write("....Easter Sunday");
if ((month == emonth) && (date == edatea)) document.write("....Good Friday");
if ((month == emonth) && (date == edateb)) document.write("....Holy Thursday");
// May
if ((month == 4) && (date == 1)) document.write("Feast Day of St. Joseph the Worker");
if ((month == 4) && (date == 2)) document.write("Feast Day of St. Athanasius, Bishop, Doctor of the Church");
if ((month == 4) && (date == 3)) document.write("Feast Day of Sts. Philip and James, Apostles");
if ((month == 4) && (date == 4)) document.write("Feast Day of St. Florian");
if ((month == 4) && (date == 5)) document.write("Feast Day of St. Hillary of Arles");
if ((month == 4) && (date == 6)) document.write("Feast Day of St. Jutta, Widow, Patroness of Prussia");
if ((month == 4) && (date == 7)) document.write("Feast Day of St. John of Beverley, Bishop of Bourges");
if ((month == 4) && (date == 8)) document.write("Feast Day of St. Julian of Norwic");
if ((month == 4) && (date == 9)) document.write("Feast Day of St. Pachomius, Abbot, Founder of Christian Monasticism");
if ((month == 4) && (date == 10)) document.write("Feast Day of St. Solange, Virgin, Martyr, Invoked in Time of Drought");
if ((month == 4) && (date == 11)) document.write("Feast Day of St. Mammertus, Archbishop of Vienne");
if ((month == 4) && (date == 12)) document.write("Feast Day of Sts. Nereus, Achilleus, and Pancratius, Martyrs");
if ((month == 4) && (date == 13)) document.write("Feast Day of Our Lady of Fatima, Our Lady of the Blessed Sacrament");
if ((month == 4) && (date == 14)) document.write("Feast Day of St. Matthias, Apostle, Martyr");
if ((month == 4) && (date == 15)) document.write("Feast Day of Bl. Imelda Lambertini");
if ((month == 4) && (date == 15)) document.write("Feast Day of St. Isidore the Farmer");
if ((month == 4) && (date == 16)) document.write("Feast Day of St. John Nepomucene, Martyr, Patron of Confessors");
if ((month == 4) && (date == 17)) document.write("Feast Day of St. Paschal Baylon");
if ((month == 4) && (date == 18)) document.write("Feast Day of St. John I, Pope, Martyr");
if ((month == 4) && (date == 19)) document.write("Feast Day of St. Dustan, Archbishop of Canterbury");
if ((month == 4) && (date == 20)) document.write("Feast Day of St. Bernardine of Siena, Preacher");
if ((month == 4) && (date == 21)) document.write("Feast Day of St. Felix of Cantalice");
if ((month == 4) && (date == 22)) document.write("Feast Day of St. Rita of Cascia, Widow, Patroness of Impossible Causes");
if ((month == 4) && (date == 23)) document.write("Feast Day of St. John the Baptist dei Rossi, Apostle of the Abandoned");
if ((month == 4) && (date == 24)) document.write("Feast Day of St. Mary, Help of Christians");
if ((month == 4) && (date == 25)) document.write("Feast Day of Sts. Bede, Gregory VII, Mary Magdalene de Pazzi");
if ((month == 4) && (date == 26)) document.write("Feast Day of St. Philip Neri, Patron of Rome");
if ((month == 4) && (date == 27)) document.write("Feast Day of St. Augustine of Canterbury");
if ((month == 4) && (date == 28)) document.write("Feast Day of Sts. Emilius, Mariana of Jesus");
if ((month == 4) && (date == 29)) document.write("Feast Day of St. Maximinus of Trier, Bishop");
if ((month == 4) && (date == 30)) document.write("Feast Day of St. Joan of Arc, Virgin, Patroness of France, Soldiers");
if ((month == 4) && (date == 31)) document.write("Visitation of the Blessed Virgin Mary");
if ((month == 4) && (day == 0) && (date > 7) && (date< 16)) document.write("....Happy Mother's Day!");
// June
if ((month == 5) && (date == 1)) document.write("Feast Day of the Ascension of the Lord (Holy Day of Obligation)");
if ((month == 5) && (date == 2)) document.write("Feast Day of Sts. Marcellinus and Peter");
if ((month == 5) && (date == 3)) document.write("Feast Day of St. Charles Lwanga and Companions");
if ((month == 5) && (date == 5)) document.write("Feast Day of St. Boniface of Mainz");
if ((month == 5) && (date == 6)) document.write("Feast Day of St. Norbert");
if ((month == 5) && (date == 9)) document.write("Feast Day of St. Ephrem of Syria");
if ((month == 5) && (date == 13)) document.write("Feast Day of St. Anthony of Padua");
if ((month == 5) && (date == 19)) document.write("Feast Day of St. Romuald");
if ((month == 5) && (date == 21)) document.write("Feast Day of St. Aloysius Gonzaga");
if ((month == 5) && (date == 22)) document.write("Feast Day of Sts. John Fisher and Thomas More");
if ((month == 5) && (date == 24)) document.write("Feast Day of St. John the Baptist");
if ((month == 5) && (date == 27)) document.write("Feast Day of St. Cyril of Alexandria");
if ((month == 5) && (date == 28)) document.write("Feast Day of St. Irenaeus, Vigil of Sts. Peter and Paul");
if ((month == 5) && (date == 29)) document.write("Feast Day of Sts. Peter and Paul");
if ((month == 5) && (date == 30)) document.write("Feast Day of the Most Sacred Heart of Jesus");
if ((month == 5) && (day == 0) && (date > 15) && (date< 24)) document.write("....Happy Father's Day!");
// July
if ((month == 6) && (date == 1)) document.write("Feast Day of the Immaculate Heart of Mary");
if ((month == 6) && (date == 2)) document.write("Feast Day of Sts. Processus and Martinian");
if ((month == 6) && (date == 3)) document.write("Feast Day of St. Thomas the Apostle");
if ((month == 6) && (date == 4)) document.write("Feast Day of St. Elizabeth, Queen of Portugal");
if ((month == 6) && (date == 5)) document.write("Feast Day of St. Anthony Mary Zaccaria");
if ((month == 6) && (date == 6)) document.write("Feast Day of St. Maria Goretti");
if ((month == 6) && (date == 11)) document.write("Feast Day of St. Benedict");
if ((month == 6) && (date == 12)) document.write("Feast Day of St. John Gualbert, Abbot");
if ((month == 6) && (date == 13)) document.write("Feast Day of St. Henry");
if ((month == 6) && (date == 14)) document.write("Feast Day of Bl. Kateri Tekakwitha");
if ((month == 6) && (date == 15)) document.write("Feast Day of St. Bonaventure");
if ((month == 6) && (date == 16)) document.write("Feast Day of Our Lady of Mt. Carmel");
if ((month == 6) && (date == 17)) document.write("Feast Day of St. Alexius, Confessor");
if ((month == 6) && (date == 18)) document.write("Feast Day of St. Camillus of Lelis, St. Symphorosa and her seven sons");
if ((month == 6) && (date == 20)) document.write("Feast Day of St. Margaret");
if ((month == 6) && (date == 21)) document.write("Feast Day of St. Lawrence of Brindisi");
if ((month == 6) && (date == 22)) document.write("Feast Day of St. Mary Magdalene");
if ((month == 6) && (date == 23)) document.write("Feast Day of Sts. Apollinaris and Liborius, bishops");
if ((month == 6) && (date == 25)) document.write("Feast Day of St. James");
if ((month == 6) && (date == 26)) document.write("Feast Day of Sts. Joachim and Anne");
if ((month == 6) && (date == 29)) document.write("Feast Day of St. Martha");
if ((month == 6) && (date == 31)) document.write("Feast Day of St. Ignatius of Loyola");
// August
if ((month == 7) && (date == 1)) document.write("Feast Day of St. Alphonsus Liguori");
if ((month == 7) && (date == 2)) document.write("Feast Day of Sts. Eusebius of Vercelli, and Peter Julian Eymard");
if ((month == 7) && (date == 4)) document.write("Feast Day of St. John Vianney");
if ((month == 7) && (date == 5)) document.write("Dedication of the Basilica of St. Mary in Rome");
if ((month == 7) && (date == 7)) document.write("Feast Day of St. Sixtus II and Companions, and St. Cajetan");
if ((month == 7) && (date == 8)) document.write("Feast Day of St. Dominic");
if ((month == 7) && (date == 10)) document.write("Feast Day of St. Lawrence");
if ((month == 7) && (date == 11)) document.write("Feast Day of St. Clare");
if ((month == 7) && (date == 14)) document.write("Feast Day of St. Maximilian Kolbe");
if ((month == 7) && (date == 15)) document.write("Feast Day of the Assumption of the Blessed Virgin Mary (Holy Day of Obligation)");
if ((month == 7) && (date == 16)) document.write("Feast Day of St. Stephen of Hungary");
if ((month == 7) && (date == 18)) document.write("Feast Day of St. Jane Frances de Chantal");
if ((month == 7) && (date == 19)) document.write("Feast Day of St. John Eudes");
if ((month == 7) && (date == 21)) document.write("Feast Day of St. Pius X");
if ((month == 7) && (date == 22)) document.write("Feast Day of the Queenship of the Blessed Virgin Mary");
if ((month == 7) && (date == 23)) document.write("Feast Day of St. Rose of Lima");
if ((month == 7) && (date == 24)) document.write("Feast Day of St. Bartholomew");
if ((month == 7) && (date == 25)) document.write("Feast Day of Sts. Louis of France and Joseph Calasanz");
if ((month == 7) && (date == 28)) document.write("Feast Day of St. Augustine");
if ((month == 7) && (date == 29)) document.write("Feast Day of the Beheading of St. John the Baptist");
// September
if ((month == 8) && (date == 8)) document.write("Feast Day of the Birth of the Blessed Virgin Mary");
if ((month == 8) && (date == 9)) document.write("Feast Day of St. Peter Claver");
if ((month == 8) && (date == 13)) document.write("Feast Day of St. John Chrysostom");
if ((month == 8) && (date == 14)) document.write("Feast Day of the Exultation of the Holy Cross");
if ((month == 8) && (date == 15)) document.write("Feast Day of Our Lady of Sorrows");
if ((month == 8) && (date == 16)) document.write("Feast Day of Sts. Cornelius and Cyprian");
if ((month == 8) && (date == 19)) document.write("Feast Day of St. Januarius");
if ((month == 8) && (date == 20)) document.write("Feast Day of St. Andrew Kim Taegon and Companions");
if ((month == 8) && (date == 21)) document.write("Feast Day of St. Matthew");
if ((month == 8) && (date == 26)) document.write("Feast Day of Sts. Cosmas and Damian");
if ((month == 8) && (date == 27)) document.write("Feast Day of St. Vincent de Paul");
// October
if ((month == 9) && (date == 1)) document.write("Feast Day of St. Therese of Lisieux");
if ((month == 9) && (date == 2)) document.write("Feast Day of Guardian Angels");
if ((month == 9) && (date == 3)) document.write("Feast Day of St. Remigius of Reims (c.437-c.533), Bishop");
if ((month == 9) && (date == 4)) document.write("Feast Day of St. Francis of Assisi");
if ((month == 9) && (date == 5)) document.write("Feast Day of St. Placid");
if ((month == 9) && (date == 6)) document.write("Feast Day of St. Bruno and Bl. Marie-Rose Durocher");
if ((month == 9) && (date == 7)) document.write("Feast Day of Our Lady of the Rosary");
if ((month == 9) && (date == 8)) document.write("Feast Day of St. Pelagia, Virgin, Martyr, and St. Thais");
if ((month == 9) && (date == 9)) document.write("Feast Day of St. Denis, Bishop, Martyr, and St. John Leonardi");
if ((month == 9) && (date == 10)) document.write("Feast Day of St. Francis Borgia");
if ((month == 9) && (date == 11)) document.write("Feast Day of the Maternity of Our Lady");
if ((month == 9) && (date == 12)) document.write("Feast Day of Our Lady of Pillar");
if ((month == 9) && (date == 13)) document.write("Feast Day of St. Edward the Confessor, King of England");
if ((month == 9) && (date == 14)) document.write("Feast Day of St. Callistus I, Pope, Martyr");
if ((month == 9) && (date == 15)) document.write("Feast Day of St. Teresa of Avila, Virgin, Doctor of the Church");
if ((month == 9) && (date == 16)) document.write("Feast Day of St. Hedwig and St. Margaret Mary Alacoque, Virgin");
if ((month == 9) && (date == 17)) document.write("Feast Day of St. Ignatius of Antioch, Bishop, Martyr under the  Emperor Trajan");
if ((month == 9) && (date == 18)) document.write("Feast Day of St. Luke, Evangelist, Martyr");
if ((month == 9) && (date == 19)) document.write("Feast Day of St. Isaac Jogues, and St. John de Brebeuf and Companions, Martyrs");
if ((month == 9) && (date == 20)) document.write("Feast Day of St. Paul of the Cross and St. Irene");
if ((month == 9) && (date == 21)) document.write("Feast Day of St. Ursula");
if ((month == 9) && (date == 22)) document.write("Feast Day of St. Mary Salome, Mother of Apostles James and John");
if ((month == 9) && (date == 23)) document.write("Feast Day of St. John of Capistrano");
if ((month == 9) && (date == 24)) document.write("Feast Day of St. Anthony Mary Claret, Bishop of Cuba");
if ((month == 9) && (date == 25)) document.write("Feast Day of St. Crispin, Martyr");
if ((month == 9) && (date == 26)) document.write("Feast Day of St. Evaristus, Pope, Martyr");
if ((month == 9) && (date == 27)) document.write("Feast Day of St. Frumentius, Bishop of Ethiopia, Martyr");
if ((month == 9) && (date == 28)) document.write("Feast Day of Sts. Simon and Jude, Apostles");
if ((month == 9) && (date == 29)) document.write("Feast Day of St. Narcissus, Bishop of Jerusalem and St. Maximillian");
if ((month == 9) && (date == 30)) document.write("Feast Day of St. Alphonsus Rodriguez");
if ((month == 9) && (date == 31)) document.write("Feast Day of St. Quentin and St. Wolfgang, Bishop of Ratisbon");
if ((month == 9) && (day == 1) && (date > 7) && (date< 16)) document.write("....Columbus Day");
if ((month == 9) && (day == 0) && (date > 24) && (date< 31)) document.write("....Daylight Savings Time Ends");
if ((month == 9) && (day == 0) && (date == 31)) document.write("....Daylight Savings Time Ends");
// November
if ((month == 10) && (date == 1)) document.write("All Saints Day (Holy Day of Obligation)");
if ((month == 10) && (date == 2)) document.write("All Souls Day");
if ((month == 10) && (date == 3)) document.write("Feast Day of St. Martin de Porres, Patron of South America");
if ((month == 10) && (date == 4)) document.write("Feast Day of St. Emeric, and St. Charles Borromeo, Bishop, Patron of Seminarians");
if ((month == 10) && (date == 5)) document.write("Feast Day of St. Elizabeth, St. Zachary, and St. Silvia, Martyr, Mother of St. Gregory");
if ((month == 10) && (date == 6)) document.write("Feast Day of St. Leonard");
if ((month == 10) && (date == 7)) document.write("Feast Day of St. Ernest");
if ((month == 10) && (date == 8)) document.write("Feast Day of St. Goddfrey, Bishop of Amiens");
if ((month == 10) && (date == 9)) document.write("Feast Day of the Dedication of the Lateran Basilica in Rome");
if ((month == 10) && (date == 10)) document.write("Feast Day of St. Leo the Great, Pope, Doctor of the Church"); 
if ((month == 10) && (date == 11)) document.write("Feast Day of St. Martin of Tours, Bishop, Patron of Soldiers");
if ((month == 10) && (date == 12)) document.write("Feast Day of St. Josaphat, Eastern-Rite Bishop of Polotsk, Martyr");
if ((month == 10) && (date == 13)) document.write("Feast Day of St. Francis Xavier Cabrini, Virgin, Patroness of Immigrants");
if ((month == 10) && (date == 14)) document.write("Feast Day of St. Clement of Ireland, and St. Sidonius, Abbot");
if ((month == 10) && (date == 15)) document.write("Feast Day of St. Albert the Great, Bishop, Doctor of the Church, Patron of Scientists");
if ((month == 10) && (date == 16)) document.write("Feast Day of St. Margaret of Scotland, and St. Gertrude the Great");
if ((month == 10) && (date == 17)) document.write("Feast Day of St. Elizabeth of Hungary");
if ((month == 10) && (date == 18)) document.write("Feast Day of the Dedication of the Basilicas of Peter and Paul in Rome");
if ((month == 10) && (date == 19)) document.write("Feast Day of St. Pontianus, Pope, and St. Mathilda");
if ((month == 10) && (date == 20)) document.write("Feast Day of St. Felix of Valois");
if ((month == 10) && (date == 21)) document.write("Feast Day of the Presentation of the Blessed Virgin Mary");
if ((month == 10) && (date == 22)) document.write("Feast Day of St. Cecilia, Virgin, Martyr, Patroness of Music, Musicians and Poetry");
if ((month == 10) && (date == 23)) document.write("Feast Day of St. Clement I, Pope and Martyr, and Bl. Miguel Agustin Pro");
if ((month == 10) && (date == 24)) document.write("Feast Day of St. Andrew Dung-Lac and Companions (117 Vietnamese Martyrs)");
if ((month == 10) && (date == 25)) document.write("Feast Day of St. Catherine of Laboure, and St. Catherine of Alexandria, Virgin, Martyr");
if ((month == 10) && (date == 26)) document.write("Feast Day of St. Peter of Alexandria, Bishop, Martyr");
if ((month == 10) && (date == 27)) document.write("Feast Day of the Miraculous Medal of the Blessed Virgin Mary, St. James, Martyr");
if ((month == 10) && (date == 28)) document.write("Feast Day of St. Rufus, and St. James of the Marches");
if ((month == 10) && (date == 29)) document.write("Feast Day of St. Saturninus, Bishop, Martyr, Patron of Toulouse");
if ((month == 10) && (date == 30)) document.write("Feast Day of St. Andrew, Apostle, Patron of Fishermen");
if ((month == 10) && (day == 4) && (date > 23) && (date< 30)) document.write("....Happy Thanksgiving!");
if ((month == 10) && (date == 30) && (day == 4)) document.write("....Happy Thanksgiving!");

// December
if ((month == 11) && (date == 1)) document.write("Feast Day of St. Edmund Campion, Martyr, and St. Eligius, Bishop");
if ((month == 11) && (date == 2)) document.write("Feast Day of St. Bibiana, Martyr, Patroness of Single Women, and Venerable Charles de Foucauld");
if ((month == 11) && (date == 3)) document.write("Feast Day of St. Francis Xavier, Patron of Foreign Missions, and St. John of Damascence");
if ((month == 11) && (date == 4)) document.write("Feast Day of St. Barbara, Virgin, Martyr, Invoke Against Lightning");
if ((month == 11) && (date == 5)) document.write("Feast Day of St. Julius I, Pope from 337-352");
if ((month == 11) && (date == 6)) document.write("Feast Day of St. Nicholas, Bishop of Bari, Patron of Children, Bakers, Pawnbrokers, and Russia");
if ((month == 11) && (date == 7)) document.write("Feast Day of St. Ambrose, Bishop, Doctor of the Church, Patron of Candlemakers");
if ((month == 11) && (date == 8)) document.write("Feast Day of the Immaculate Conception of the Blessed Virgin (Holy Day of Obligation)");
if ((month == 11) && (date == 9)) document.write("Feast Day of Bl. Juan Diego and St. Peter Fourier");
if ((month == 11) && (date == 10)) document.write("Feast Day of Our Lady of Loreto, Site of the Holy House of Mary");
if ((month == 11) && (date == 11)) document.write("Feast Day of St. Damascus I, Pope");
if ((month == 11) && (date == 12)) document.write("Feast Day of Our Lady of Guadelupe, Patroness of the Americas");
if ((month == 11) && (date == 13)) document.write("Feast Day of St. Lucy, Virgin, Martyr, Patroness of the Blind");
if ((month == 11) && (date == 14)) document.write("Feast Day of St. John of the Cross, Mystic, Doctor of the Church");
if ((month == 11) && (date == 15)) document.write("Feast Day of St. Florence, Abbot");
if ((month == 11) && (date == 16)) document.write("Feast Day of St. Adelaide, Queen of Italy, Patroness of Large Families, and St. Lazarus");
if ((month == 11) && (date == 17)) document.write("Feast Day of Bl. Hyacinth Cormier, Built the Angelicum in Rome");
if ((month == 11) && (date == 18)) document.write("Feast Day of St. Gatian, Bishop of Tours");
if ((month == 11) && (date == 19)) document.write("Feast Day of St. Daria, and Bl. Urban V, Pope");
if ((month == 11) && (date == 20)) document.write("Feast Day of Sts. Abraham, Issac and Jacob, Patriarchs, and St. Anastasia");
if ((month == 11) && (date == 21)) document.write("Feast Day of St. Peter Canisius, Doctor of the Church");
if ((month == 11) && (date == 22)) document.write("Feast Day of St. Flavian, Patriarch of Constantinople");
if ((month == 11) && (date == 23)) document.write("Feast Day of Sts. Victoria and Anotolia, Martyrs, and St. John of Cantius");
if ((month == 11) && (date == 24)) document.write("Sts. Adam and Eve, St. Adele, Christmas Eve");
if ((month == 11) && (date == 25)) document.write("Christmas Day (Holy Day of Obligation)");
if ((month == 11) && (date == 26)) document.write("Feast Day of St. Stephen, The First Martyr, Patron of Stonemasons");
if ((month == 11) && (date == 27)) document.write("Feast Day of St. John, Apostle and Evangelist, Patron of Asia Minor");
if ((month == 11) && (date == 28)) document.write("Feast Day of the Holy Innocents");
if ((month == 11) && (date == 29)) document.write("Feast Day of the Holy Family of Jesus, Mary and Joseph");
if ((month == 11) && (date == 30)) document.write("Feast Day of St. Eugene, Bishop of Milan, and St. Anysius, Bishop of Thessalonica");
if ((month == 11) && (date == 31)) document.write("Feast Day of St. Sylvester I, Pope");
document.write("<br></font>");
}
show_calendar();