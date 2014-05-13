<?php
// Afrendy Bayu, 15 Feb 2014
//   SokaKetikaSaatSendiri

include '../connection.php';
include '../util.php';

if (isset($_GET['qe']))	{
	//echo "bla ";
	$greq = $_GET["qe"];
}

//echo "greq: ".$greq."<br/>";

if (!strcmp($greq,'avgc'))	{
	$av = '66.3';
} else if (!strcmp($greq,'avgs'))	{
	$av = '74.9';
} else if (!strcmp($greq,'avpm'))	{
	$av = '92.7';
} else if (!strcmp($greq,'regc'))	{
	$av = '17.9';
} else if (!strcmp($greq,'regs'))	{
	$av = '29.9';
} else if (!strcmp($greq,'repm'))	{
	$av = '32.7';
} else
	$av = '87';

try {
	$arTeco = array();
	$obj1 = new stdClass();
	$obj1->nama = "";
	$obj1->av = $av;
	array_push($arTeco,$obj1);
		
	$jsonResult = array(
        'success' => true,
        'greq' => $arTeco
    );
	
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
	);
}

echo json_encode($jsonResult);

?>
