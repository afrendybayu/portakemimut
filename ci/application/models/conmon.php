<?php

class Conmon extends CI_Model {

	function get_conmongrid($thn)	{
		$sql =	"SELECT c.tipe, u.nama
				,IFNULL(GROUP_CONCAT(CASE WHEN bln=1 AND thn=$thn THEN nilai END),0) as b1
				,IFNULL(GROUP_CONCAT(CASE WHEN bln=2 AND thn=$thn THEN nilai END),0) as b2
				,IFNULL(GROUP_CONCAT(CASE WHEN bln=3 AND thn=$thn THEN nilai END),0) as b3
				,IFNULL(GROUP_CONCAT(CASE WHEN bln=4 AND thn=$thn THEN nilai END),0) as b4
				,IFNULL(GROUP_CONCAT(CASE WHEN bln=5 AND thn=$thn THEN nilai END),0) as b5
				,IFNULL(GROUP_CONCAT(CASE WHEN bln=6 AND thn=$thn THEN nilai END),0) as b6
				,IFNULL(GROUP_CONCAT(CASE WHEN bln=7 AND thn=$thn THEN nilai END),0) as b7
				,IFNULL(GROUP_CONCAT(CASE WHEN bln=8 AND thn=$thn THEN nilai END),0) as b8
				,IFNULL(GROUP_CONCAT(CASE WHEN bln=9 AND thn=$thn THEN nilai END),0) as b9
				,IFNULL(GROUP_CONCAT(CASE WHEN bln=10 AND thn=$thn THEN nilai END),0) as b10
				,IFNULL(GROUP_CONCAT(CASE WHEN bln=11 AND thn=$thn THEN nilai END),0) as b11
				,IFNULL(GROUP_CONCAT(CASE WHEN bln=12 AND thn=$thn THEN nilai END),0) as b12
				,IFNULL(SUM(CASE WHEN thn=$thn THEN nilai END),0) as tot		
				FROM conmon c
				LEFT JOIN unitlist u ON c.tipe = u.id
				group by tipe
				ORDER by u.urut asc";
		//echo "sql: $sql<br/>";
		$query = $this->db->query($sql);
		return $query->result();
	}
	
	function jml_conmon()	{
		$sql = "select thn AS tahun,SUM(nilai) as jml from conmon GROUP BY thn ORDER BY thn desc";
		$query = $this->db->query($sql);
		return $query->result();
	}
	
	function gr_conmon()	{
		$sql = "SELECT cm.thn,
				IFNULL((SELECT SUM(nilai) FROM conmon cd WHERE cd.thn = cm.thn AND cd.tipe=5),0) AS gc,
				IFNULL((SELECT SUM(nilai) FROM conmon cd WHERE cd.thn = cm.thn AND cd.tipe=7),0) AS gs,
				IFNULL((SELECT SUM(nilai) FROM conmon cd WHERE cd.thn = cm.thn AND cd.tipe=6),0) AS pmp
				FROM conmon cm WHERE thn in (YEAR(NOW()),YEAR(NOW())-1,YEAR(NOW())-2) GROUP BY thn";
				
		$query = $this->db->query($sql);
		return $query->result();
	}
	
	function gunit_conmon($tipe)	{
		$sql = "SELECT bln,IF(thn=YEAR(NOW())-2,SUM(nilai),0) as skr2
				,IF(thn=YEAR(NOW())-1,SUM(nilai),0) as skr1
				,IF(thn=YEAR(NOW()),SUM(nilai),0) as skr
				FROM conmon
				WHERE tipe = $tipe GROUP BY bln";
				
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

	function uiconmon($val, $bln, $tipe, $thn)	{
		$sql = "call iuconmon('$val','$bln','$tipe','$thn')";
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
