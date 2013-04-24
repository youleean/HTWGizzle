<?php
/*Server*/
$ldaphost = "ldap.htwg-konstanz.de";
$ldapport = 389;

/*BenutzerDn*/
$dn = 'ou=users,dc=fh-konstanz,dc=de';

/*Verbindung aufbauen*/
$ds = ldap_connect($ldaphost, $ldapport)
or die("konnte keine Verbindung herstellen");

/*Name und Passwort für Login*/
$loginName='NaN';
$loginPass='NaN';

/*Puffervariablen für Daten von Student/Prof */
$getName='NaN';
$getRole='NaN';
if(!empty($_POST)){

$loginName=$_POST['name'];
$loginPass=$_POST['pw'];

if ($ds) 
{
    $username = "uid=".$loginName.",ou=users,dc=fh-konstanz,dc=de";

    $ldapbind = ldap_bind($ds, $username, $loginPass);
                               
    if ($ldapbind) 
        {
		print "Logindaten korrekt - bei Hochschule registriert!<br>\n";
		
		$filter="(|(uid=$loginName*))";
		$justthese = array( "givenName", "sn", "cn", "gidNumber", "userprintacc");
		$sr=ldap_search($ds, $dn, $filter, $justthese);

		$info = ldap_get_entries($ds, $sr);

		$n_entries = $info["count"];
		$entry = ldap_first_entry($ds, $sr);
		$attrs = ldap_get_attributes ($ds, $entry);
		
		/* voller Name */
		$getName = $attrs['cn'][0];
		//var_dump($attrs);
		/* 1
		Auslesen der gidNumber
		121 = Prof
		137 & 123 = Mitarbeiter
		103 = Lehrbeauftragter
		xxx = Student
		*/
		$getRole = $attrs['gidNumber'][0];
		//var_dump($attrs);
		switch ($getRole) {
			case 121:
				$getRole = 'Professor';
				break;
			case 123:
				$getRole = 'Mitarbeiter';
				break;
			case 137:
				$getRole = 'Mitarbeiter';
				break;
			case 103:
				$getRole = 'Lehrbeauftragter';
				break;
			default:
				$getRole = 'Student';
		}
		
		}
    else 
        {print "Logindaten falsch!<br>\n";}
		
}


echo "name: ".$getName."<br>";
echo "role: ".$getRole."<br>";

/*Connection Token Generator*/
function token($length) {
    $characters = array(
        "A","B","C","D","E","F","G","H","J","K","L","M",
        "N","P","Q","R","S","T","U","V","W","X","Y","Z",
        "a","b","c","d","e","f","g","h","i","j","k","m",
        "n","o","p","q","r","s","t","u","v","w","x","y","z",
        "1","2","3","4","5","6","7","8","9");
    if ($length < 0 || $length > count($characters)) return null;
    shuffle($characters);
    return implode("", array_slice($characters, 0, $length));
}

echo token(26);

}




?>

<form method="post">
	<input type="text" name="name" placeholder="Name"><br>
	<input type="password" name="pw" placeholder="Passwort"><br>
	<input type="submit">
</form>