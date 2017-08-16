<?php
header('Access-Control-Allow-Origin:*');
$con = mysql_connect(MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD);
if (!$con) {
	die('Could not connect: ' . mysql_error());
}
mysql_select_db("sql_forvera", $con);
$sql="INSERT INTO ego_users (phone, password) VALUES
('$_POST[phone]','$_POST[password]')";

if (!mysql_query($sql,$con)) {
	$json = '{"status":"' . mysql_error().'"}';
	echo $json;
} else {
	$result = mysql_query("SELECT * FROM ego_users WHERE phone = ('$_POST[phone]')");
	$row = mysql_fetch_array($result);

	$json = '{"status":"ok","phone":"'.$row['phone'].'","point":"'.$row['point'].'"}';
	echo $json;
}

mysql_close($con)
?>
