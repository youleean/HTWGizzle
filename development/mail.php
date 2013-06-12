<?php
$mbox = imap_open("{imap.htwg-konstanz.de:143}INBOX", "jusudend", "Bahula13")
     or die("can't connect: " . imap_last_error());

$MC = imap_check($mbox);

// Hole eine Übersicht aller Nachrichten in der INBOX

$quota = imap_get_quotaroot($mbox, "INBOX");
if (is_array($quota)) {
   $storage = $quota['STORAGE'];
   $result['capacity']['value']=($storage['limit']/1024);
   $result['capacity']['unit']='MB';
   $result['usedSpace']['value'] = round((($storage['usage'] / $storage['limit']) * 100),2);
   $result['usedSpace']['unit']='Percent';
}

echo json_encode($result);
/*
$result = imap_fetch_overview($mbox,"1:{$MC->Nmsgs}",0);
foreach ($result as $overview) {
    echo "#{$overview->msgno} ({$overview->date}) - From: {$overview->from}
    {$overview->subject}\n";
}
*/
imap_close($mbox);
?>