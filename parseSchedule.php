<?php

require 'lib/class.iCalReader.php';
require 'data/courses_array.php';
?>

<form method ="post" action="parseSchedule.php">
<select name="abstgvnr">   
<?php 
foreach($courses as $course){
	echo '<option value="'.$course[2].'">'.$course[0].' - '.$course[1].'</option>'."\n";
}
?>                                                                                                                                                                                                                   	ZA 	   	4500-->
</select>
<select name="semester">
<option value="1">1. Semester</option>
<option value="2">2. Semester</option>
<option value="3">3. Semester</option>
<option value="4">4. Semester</option>
<option value="5">5. Semester</option>
<option value="6">6. Semester</option>
<option value="7">7. Semester</option>
<option value="8">8. Semester</option>
</select>
<input type="submit">
</form>

<?php


if(!empty($_POST)){
	$abstgvnr=$_POST['abstgvnr'];
	$semester=$_POST['semester'];


$lsfDoc = file_get_contents('https://lsf.htwg-konstanz.de/qisserver/rds?state=wplan&r_zuordabstgv.semvonint='.$semester.'&r_zuordabstgv.sembisint='.$semester.'&missing=allTerms&k_parallel.parallelid=&k_abstgv.abstgvnr='.$abstgvnr.'&r_zuordabstgv.phaseid=&week=-1&act=stg&pool=stg&show=plan&P.vx=lang&fil=plu&P.subc=plan');
$dom = new DOMDocument;
$dom->loadHTML($lsfDoc);
$xpath = new DOMXPath($dom);
foreach( $xpath->query('//a[contains(attribute::class, "tree")]') as $e ) {
  $icsfilelink=$e->getAttribute('href');
}
$ical  = new ICal($icsfilelink);
$array = $ical->events();

foreach($courses as $course){
	if($course[2]==$abstgvnr)
		$studiengang = $course[1];
}


/*
echo '<h1>Studiengang: '.$studiengang.'</h1>';
echo '<h2>Semester '.$semester.'</h2>';
foreach($array as $key){
	echo '<hr>';
	$wochentag=substr($key['DTSTART'], 6, 2);
	$such_array  = array ('11', '12', '13', '14', '15');
	$ersetzen_array = array ('Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag');
	$wochentag  = str_replace($such_array, $ersetzen_array, $wochentag);
	echo '<b>Tag</b>: '.$wochentag.'<br>';
	echo '<b>Beginn</b>: '.substr_replace(substr($key['DTSTART'], -6, 4),':',2,0).' Uhr<br>';
	echo '<b>Ende</b>: '.substr_replace(substr($key['DTEND'], -6, 4),':',2,0).' Uhr<br>';
	//echo $key['RRULE'].'<br>';
	echo '<b>Raum</b>: '.$key['LOCATION'].'<br>';
	
	$summary=$key['SUMMARY'];
	$teile = explode(" - ", $summary);
	$sub = explode(" (", $teile[1]);
	echo '<b>Fach</b>: '.$sub[0].'<br>';
	echo '<b>Nummer</b>: '.$teile[0].'<br>';
	echo '<b>Dozent</b>: '.substr($sub[1],0,-1).'<br>';
	echo '<b>Art</b>: '.$key['CATEGORIES'].'<br>';
	echo '<hr>';
	$tmpArray
	$jsonArray[]=array()

}
*/
$i=0;
foreach($array as $key){
	$wochentag=substr($key['DTSTART'], 6, 2);
	$such_array  = array ('11', '12', '13', '14', '15');
	$ersetzen_array = array ('Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag');
	$wochentag  = str_replace($such_array, $ersetzen_array, $wochentag);
	$tmpArray['wochentag']=$wochentag;
	$tmpArray['Beginn']=substr_replace(substr($key['DTSTART'], -6, 4),':',2,0);
	$tmpArray['Ende']=substr_replace(substr($key['DTEND'], -6, 4),':',2,0);
	$tmpArray['Raum']=$key['LOCATION'];
	
	$summary=$key['SUMMARY'];
	$teile = explode(" - ", $summary);
	$sub = explode(" (", $teile[1]);
	$tmpArray['FachName']=$sub[0];
	$tmpArray['FachID']=$teile[0];
	$tmpArray['Dozent']=substr($sub[1],0,-1);
	$tmpArray['Art']=$key['CATEGORIES'];
	$jsonArray[$i]=$tmpArray;
	$i++;
}



echo json_encode($jsonArray);
}
?>


