<?php

include '../connection.php';

function buildTree(Array $data, $parent = 0) {
    $tree = array();
    foreach ($data as $d) {
        if ($d['parent'] == $parent) {
            $children = buildTree($data, $d['id']);
            // set a trivial key
            if (!empty($children)) {
                $d['children'] = $children;	// 
				//$d['expanded'] = 'false';	// 
            } else {
				$d['leaf'] = 'true';	// 
			}
			//$d['leaf'] = 'true';	// 
            $tree[] = $d;
        }
    }
    return $tree;
}

try {
	$parent_id = $_GET['node'];
	$sql =	"SELECT id, nama as text,flag as unit FROM hirarki WHERE parent='".$parent_id."'  ORDER BY nama ASC";
	/*
	if ($parent_id==0)
		$sql =	"SELECT id, nama as text FROM hirarki WHERE parent='".$parent_id."'  ORDER BY urut ASC";
	else
		$sql =	"SELECT id, nama as text FROM hirarki WHERE parent='".$parent_id."'  ORDER BY nama ASC";
	//*/
	//echo "sql: $sql<br/>";
	$q = db_query($sql);
	
	if (!$q)	{
		echo "DB Error, could not query the database\n";
		echo 'MySQL Error: ' . mysql_error();
		exit;
	}
	
	$arr = array(); $k=0;
	while ($row = mysql_fetch_assoc($q)) {
		//$row['text'] = '['.$row['id'].'] '.$row['text'];
		//$arr[] = $row;
		$arr[$k]['id'] = $row['id'];
		//$arr[$k]['text'] = $row['text'];
		//$arr[$k]['text'] = $row['text']. " ".$arr[$k]['id'] = $row['id'];
		$arr[$k]['text'] = $row['text'];	//. " ".$arr[$k]['id'] = $row['id'];
		$arr[$k]['tipe'] = 'h';
		$arr[$k]['unit'] = $row['unit'];
		//$arr[$k]['leaf'] = true;
		$k++;
	}
	
	//echo "ar "; print_r($arr); echo "<br/>";
	//if (!isset($arr))	{
		
	if (count($arr)==0)	{		// mungkin sudah mentok ke equipment
		//echo "ar2 "; print_r($arr); echo "<br/>";
		//$sql =	"SELECT id, nama as text FROM hirarki WHERE parent='".$parent_id."'  ORDER BY text ASC";
		$sql =	"SELECT id, nama, tag FROM equip where unit_id='".$parent_id."'  ORDER BY nama ASC";
		//echo "sql: $sql<br/>";
		$q = db_query($sql);
		if (!$q)	{
			echo "DB Error, could not query the database\n";
			echo 'MySQL Error: ' . mysql_error();
			exit;
		}
		
		$arr = array(); $k=0;
		while ($row = mysql_fetch_assoc($q)) {
			//$row->leaf = 'true';
			//$row['leaf'] = "true";
			//$row['text'] = $row['nama'].' ['.$row['tag'].']';
			//$row['text'] = '['.$row['id'].' '.$row['tag'].'] '.$row['nama'];
			//print_r($row); echo "<br/>";
			//$arr[] = $row;
			$arr[$k]['leaf'] = 'true';
			$arr[$k]['id'] = $row['id'];
			//$arr[$k]['text'] = '['.$row['id'].' '.$row['tag'].'] '.$row['nama'];
			$arr[$k]['text'] = '['.$row['tag'].'] '.$row['nama'];
			$arr[$k]['tipe'] = 'e';
			$k++;
		}
	}
	//echo "ar3 "; print_r($arr); echo "<br/>";
	/*
	while ($row = mysql_fetch_assoc($q)) {
		//$tisi[$row["id"]] = $row;
		$tisi[$row["id"]]["text"] = $row["text"];
		$tisi[$row["id"]]["parent"] = $row["parent"];
		//$tisi[$row["id"]]["kode"] = $row["kode"];
		$tisi[$row["id"]]["id"] = $row["id"];
		if ($row["parent"]==0)	{
			//$tisi[$row["id"]]["expanded"] = "true";
		}
		//echo "<br/>";
	}
	$isi = buildTree($tisi);
	//*/


	//print_r($arr);
	
	mysql_free_result($q);
	
	//return;
	//$ch = new StdClass();
	//$ch->children = $isi;
	//$ch->children = $isi;
	//echo "<br/><br/>";
	//print_r($ch);
	//return;
	
    $jsonResult = array(
        'success' => true,
        'hirarki' => $arr
    );
    
    
} catch(Exception $e) {
    $jsonResult = array(
        'success' => false,
        'message' => $e->getMessage()
    );
}

//echo json_encode($isi);
echo json_encode($jsonResult);

?>
