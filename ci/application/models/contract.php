<?php

class Contract extends CI_Model {

	function get_contract($thn)	{
		/*
		$sql =	"SELECT ce.nama, ce.id as tipe
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=1 AND c.tipe=ce.id THEN nilai END),0) as b1 
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=2 AND c.tipe=ce.id THEN nilai END),0) as b2 
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=3 AND c.tipe=ce.id THEN nilai END),0) as b3 
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=4 AND c.tipe=ce.id THEN nilai END),0) as b4 
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=5 AND c.tipe=ce.id THEN nilai END),0) as b5 
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=6 AND c.tipe=ce.id THEN nilai END),0) as b6 
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=7 AND c.tipe=ce.id THEN nilai END),0) as b7 
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=8 AND c.tipe=ce.id THEN nilai END),0) as b8
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=9 AND c.tipe=ce.id THEN nilai END),0) as b9 
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=10 AND c.tipe=ce.id THEN nilai END),0) as b10
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=11 AND c.tipe=ce.id THEN nilai END),0) as b11
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=12 AND c.tipe=ce.id THEN nilai END),0) as b12
				,IFNULL(SUM(CASE WHEN c.tipe=ce.id AND bulan<15 THEN nilai END),0) as tot
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=15 AND c.tipe=ce.id THEN nilai END),0) as budget 
				,IFNULL(ROUND(SUM(CASE WHEN bulan<15 AND c.tipe=ce.id THEN nilai END)*100/
					GROUP_CONCAT(CASE WHEN bulan=15 AND c.tipe=ce.id THEN nilai END),2),0) as persen 
				FROM cat_equip ce, contract c
				WHERE ce.parent=0 AND c.tahun=$thn
				group by ce.id ORDER BY ce.nama";
		//*/
		$sql =	"SELECT  ce.id, ce.nama
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=1 AND c.tahun=$thn THEN nilai END),0) as b1 
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=2 AND c.tahun=$thn THEN nilai END),0) as b2 
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=3 AND c.tahun=$thn THEN nilai END),0) as b3 
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=4 AND c.tahun=$thn THEN nilai END),0) as b4 
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=5 AND c.tahun=$thn THEN nilai END),0) as b5 
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=6 AND c.tahun=$thn THEN nilai END),0) as b6 
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=7 AND c.tahun=$thn THEN nilai END),0) as b7 
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=8 AND c.tahun=$thn THEN nilai END),0) as b8
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=9 AND c.tahun=$thn THEN nilai END),0) as b9 
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=10 AND c.tahun=$thn THEN nilai END),0) as b10 
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=11 AND c.tahun=$thn THEN nilai END),0) as b11
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=12 AND c.tahun=$thn THEN nilai END),0) as b12
				,IFNULL(SUM(CASE WHEN bulan<15 AND c.tahun=$thn THEN nilai END),0) as tot
				,IFNULL(SUM(CASE WHEN bulan<15 AND c.tahun=".($thn-1)." THEN nilai END),0) as tot1
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=15 AND c.tahun=$thn THEN nilai END),0) as budget
				,IFNULL(ROUND(SUM(CASE WHEN bulan<15 AND c.tahun=$thn THEN nilai END)*100/
					GROUP_CONCAT(CASE WHEN bulan=15 AND c.tahun=$thn THEN nilai END),2),0) as persen 
				FROM cat_equip ce
				LEFT JOIN contract c ON c.tipe=ce.id
				WHERE ce.parent=0
				GROUP BY ce.id
				ORDER BY ce.nama ASC";
		//echo "sql: $sql<br/>";
		$query = $this->db->query($sql);
		return $query->result();
	}
	
	
	function get_grafikcontrak($thn)	{
		$sql =	"SELECT bulan AS m,
				IFNULL(GROUP_CONCAT(CASE WHEN tipe=5 THEN nilai end),0) gc,
				IFNULL(GROUP_CONCAT(CASE WHEN tipe=7 THEN nilai end),0) gs,
				IFNULL(GROUP_CONCAT(CASE WHEN tipe=6 THEN nilai end),0) pm 
				FROM contract
				WHERE tahun = $thn AND bulan<13
				GROUP BY bulan
				ORDER BY bulan ASC";
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
