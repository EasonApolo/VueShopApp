<?php
header('Access-Control-Allow-Origin:*');
$con = mysql_connect(MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD);
if (!$con) {
	die('Could not connect: ' . mysql_error());
}
mysql_select_db("sql_forvera", $con);

$sql="UPDATE ego_users SET username = ('$_POST[username]') WHERE phone = ('$_POST[phone]')";
$result = mysql_query($sql,$con);

$sql="UPDATE ego_users SET sex = ('$_POST[sex]') WHERE phone = ('$_POST[phone]')";
$result = mysql_query($sql,$con);

$sql="UPDATE ego_users SET birthday = ('$_POST[birthday]') WHERE phone = ('$_POST[phone]')";
$result = mysql_query($sql,$con);


$sql="SELECT * FROM ego_users WHERE phone = ('$_POST[phone]')";
$result = mysql_query($sql,$con);
$row = mysql_fetch_array($result);
$json = '{"status":"ok","phone":"'.$row['phone'].'","point":"'.$row['point'].'","avatar":"'.$row['avatar'].'","name":"'.$row['username'].'","sex":"'.$row['sex'].'","birthday":"'.$row['birthday'].'"}';
echo $json;

mysql_close($con)
?>