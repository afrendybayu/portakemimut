<?php

class Contract extends CI_Model {

	function get_contract($thn)	{
		$sql =	"SELECT c.tipe, cat_equip.nama ".
				",ifnull((SELECT nilai from contract where bulan = 1 AND tahun = $thn AND tipe=c.tipe),0) as b1 ".
				",ifnull((SELECT nilai from contract where bulan = 2 AND tahun = $thn AND tipe=c.tipe),0) as b2 ".
				",ifnull((SELECT nilai from contract where bulan = 3 AND tahun = $thn AND tipe=c.tipe),0) as b3 ".
				",ifnull((SELECT nilai from contract where bulan = 4 AND tahun = $thn AND tipe=c.tipe),0) as b4 ".
				",ifnull((SELECT nilai from contract where bulan = 5 AND tahun = $thn AND tipe=c.tipe),0) as b5 ".
				",ifnull((SELECT nilai from contract where bulan = 6 AND tahun = $thn AND tipe=c.tipe),0) as b6 ".
				",ifnull((SELECT nilai from contract where bulan = 7 AND tahun = $thn AND tipe=c.tipe),0) as b7 ".
				",ifnull((SELECT nilai from contract where bulan = 8 AND tahun = $thn AND tipe=c.tipe),0) as b8 ".
				",ifnull((SELECT nilai from contract where bulan = 9 AND tahun = $thn AND tipe=c.tipe),0) as b9 ".
				",ifnull((SELECT nilai from contract where bulan = 10 AND tahun = $thn AND tipe=c.tipe),0) as b10 ".
				",ifnull((SELECT nilai from contract where bulan = 11 AND tahun = $thn AND tipe=c.tipe),0) as b11 ".
				",ifnull((SELECT nilai from contract where bulan = 12 AND tahun = $thn AND tipe=c.tipe),0) as b12 ".
				",IFNULL((SELECT sum(nilai) from contract where tahun = 2014 AND tipe=c.tipe),0) as tot ".
				"FROM contract c ".
				"LEFT JOIN cat_equip ON c.tipe = cat_equip.id ".
				"WHERE tahun = $thn group by tipe ".
				"ORDER by cat_equip.urut asc";
		$query = $this->db->query($sql);
		return $query->result();
	}
	
	
	function get_grafikcontrak($thn)	{
		$sql =	"SELECT bulan AS m, ".
				"IFNULL(GROUP_CONCAT(CASE WHEN tipe=5 THEN nilai end),0) gc, ".
				"IFNULL(GROUP_CONCAT(CASE WHEN tipe=7 THEN nilai end),0) gs, ".
				"IFNULL(GROUP_CONCAT(CASE WHEN tipe=6 THEN nilai end),0) pm ".
				"FROM contract ".
				"WHERE tahun = $thn ".
				"GROUP BY bulan ".
				"ORDER BY bulan  ASC";
		$query = $this->db->query($sql);
		return $query->result();
	}

	function uicontract($val, $bln, $tipe, $thn)	{
		$sql = "call iucontract('$val','$bln','$tipe','$thn')";
		//echo "sql: $sql<br/>";
		$hsl = new stdClass();
		$l1=0; $l2 = 0;
		if (mysqli_multi_query($this->db->conn_id,$sql))	{
			do    {
				//$l1++;
				// Store first result set
				if ($result=mysqli_store_result($this->db->conn_id))	{
					while ($row=mysqli_fetch_row($result))	{
						//$l2++;
						//printf("%s\n",$row['pid']);
						//$hsl = $row;
						$hsl->st = $row[0];
						$hsl->id = $row[1];
						//array_push($hsl, $row);
						//print_r($row); echo "<br/>";
					}
					mysqli_free_result($result);
				}
			}
			while (mysqli_next_result($this->db->conn_id));
		}
		
		//echo "l1: $l1, l2: $l2<br/>";
		return array($hsl);
	}

}

/* End of file contract.php */
/* Location: ./application/models/contract.php */