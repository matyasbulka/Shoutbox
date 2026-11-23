<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Content-Type');
    include "DB.php";


    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);

    $arr = [];
    $paramsToFill = 3;
    $i = null;



    if (is_array($data) && isset($data["message"]) && empty($data["message"]) === False) {
        $arr[":message"] = $data["message"];
        $paramsToFill--;
    }

    if (is_array($data) && isset($data["name"]) && empty($data["name"]) === False) {
        $arr[":name"] = $data["name"];
        $paramsToFill--;
    }

    if (is_array($data) && isset($data["color"]) && empty($data["color"]) === False) {
        $arr[":color"] = $data["color"];
        $paramsToFill--;
    }


    if($paramsToFill == 0) {
        $sql = "INSERT INTO `Shoutbox` (`id`, `name`, `message`, `color`, `timestamp`) VALUES (NULL, :name, :message, :color, CURRENT_TIMESTAMP)";
        $con = $db->prepare($sql);
        $p = $con->execute($arr);
        if ($p == true) {
            $i = $db->lastInsertId();
        }
        if ($p == true AND $i > 0) {
        } else {
        }
    }



    //select all
    $qry = "SELECT name, message, color FROM `Shoutbox`";
    $sql_com = $db->prepare($qry);
    $sql_com->execute();
    $output = $sql_com->fetchAll(\PDO::FETCH_ASSOC);

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($output);


?>
