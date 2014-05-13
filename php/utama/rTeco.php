<?php
// Afrendy Bayu, 15 Feb 2014
//   SokaKetikaSaatSendiri

include '../connection.php';
include '../util.php';


try {
	$arTeco = array();
	$obj1 = new stdClass();
	$obj1->teco = '77.66';
	$obj1->nama = "Teco";
	array_push($arTeco,$obj1);
	
	$obj = new stdClass();
	$obj->teco = '23.34';
	$obj->nama = "Open";
	array_push($arTeco,$obj);
		
	$jsonResult = array(
        'success' => true,
        'hoteco' => $arTeco
    );
	
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
	);
}

echo json_encode($jsonResult);

?>
