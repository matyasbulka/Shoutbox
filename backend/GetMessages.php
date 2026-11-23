<?php
header('Access-Control-Allow-Origin: *');

include 'DB.php';

//select all
$qry = "SELECT name, message, color FROM `Shoutbox`";
$sql_com = $db->prepare($qry);
$sql_com->execute();
$output = $sql_com->fetchAll(\PDO::FETCH_ASSOC);

header('Content-Type: application/json; charset=utf-8');
echo json_encode($output);
?>
