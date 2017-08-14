<?php
header('Access-Control-Allow-Origin:*');
$con = mysql_connect(MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD);
if (!$con) {
	die('Could not connect: ' . mysql_error());
}
mysql_select_db("sql_forvera", $con);
$sql="SELECT * FROM ego_users WHERE phone = ('$_POST[phone]')";

$result = mysql_query($sql,$con);

$row = mysql_fetch_array($result);

if (mysql_num_rows($result) < 1) {
	$json = '{"status":"Phone not signup"}';
	echo $json;
} else {
    if ($row['password'] == $_POST[password]) {
        $json = '{"status":"ok","phone":"'.$row['phone'].'","point":"'.$row['point'].'"}';
        echo $json;
    } else {
        $json = '{"status":"Bad password"}';
        echo $json;
    }
}

mysql_close($con)
?>