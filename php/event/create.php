<?php
// Afrendy Bayu, 23Des2013 //
// KetikaMencobaMerangkai  //


include '../connection.php';
include '../util.php';

try {
	$params = json_decode(file_get_contents('php://input'));
	
	if (is_array($params))	{
		//echo "var array !!<br/>";
		$k = 1;	$hasil = array();
		foreach ($params as $obj)	{
			$sql =	"INSERT INTO event (down_id,eq,opart,fm,cause,aksi) VALUES ".
			"('{$obj->iddown}','{$obj->ideql}','{$obj->idopart}','{$obj->idmode}','{$obj->idcause}','{$obj->idaksi}' )";
			//echo "sql$k: $sql<br/>";
			$k++;
			$q = db_query($sql);
			if ($q)	{
				$sql = "SELECT id FROM event order by id desc limit 0,1";
				$qq = db_query($sql);
				if ($qq)	{
					$row = mysql_fetch_assoc($q);
					echo "{$row['id']} ";
					array_push($hasil, $row['id']);
				}
			}
		}
	}
	if (is_object($params))	{
		//echo "var object !!<br/>";
		$sql =	"INSERT INTO event (down_id, eq,opart,fm,cause,aksi) VALUES ".
			"('{$params->iddown}','{$params->ideql}','{$params->idopart}','{$params->idmode}','{$params->idcause}','{$params->idaksi}' )";
		//echo "sql: $sql<br/>";
		$q = db_query($sql);
		if ($qq)	{
			$row = mysql_fetch_assoc($q);
			$hasil = $row['id'];
		}
	}
	//print_r($params);
	
	/*
	$params = new stdClass();
	$params->cat = 10;
	$params->eql = "ENG KE-A01A16003";
    $params->ideql = 36;
	$params->opart = "Filter Lub";
	$params->idopart = 16;
	$params->mode = "INL - Internal Leakage";
	$params->idmode = "INL";
	$params->cause = "Improper capacity";
	$params->idcause = 1;
	$params->aksi = "Reset";
	$params->idaksi = 1;
	//*/
	//
	
	//echo "sql: $sql<br/>";
	//$q = db_query($sql);
	/*
	if (!$q)	{
		echo "DB Error, could not query the database\n";
		echo 'MySQL Error: ' . mysql_error();
		exit;
	}
	//*/
    $jsonResult = array(
        'success' => true,
        'event' => $hasil
    );
} catch(Exception $e) {
	$jsonResult = array(
		'success' => false,
		'message' => $e->getMessage()
    );
}

echo json_encode($jsonResult);    
    
    
?>
