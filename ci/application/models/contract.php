<?php

class Contract extends CI_Model {

	function get_contract($thn)	{
		/*
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
				,IFNULL(GROUP_CONCAT(CASE WHEN bulan=15 AND c.tahun=$thn THEN nilai END),0) as b15
				,IFNULL(ROUND(SUM(CASE WHEN bulan<15 AND c.tahun=$thn THEN nilai END)*100/
					GROUP_CONCAT(CASE WHEN bulan=15 AND c.tahun=$thn THEN nilai END),2),0) as persen 
				FROM cat_equip ce
				LEFT JOIN contract c ON c.tipe=ce.id
				WHERE ce.parent=0
				GROUP BY ce.id
				ORDER BY ce.nama ASC";
		//*/
		//*
		$sql =	"SELECT ce.id as tipe, ce.nama 
				,IFNULL(SUM(CASE WHEN month(c.tgl)=1 AND year(c.tgl)=$thn THEN (c.nilai) END),0) as b1 
				,IFNULL(SUM(CASE WHEN month(c.tgl)=2 AND year(c.tgl)=$thn THEN (c.nilai) END),0) as b2
				,IFNULL(SUM(CASE WHEN month(c.tgl)=3 AND year(c.tgl)=$thn THEN (c.nilai) END),0) as b3
				,IFNULL(SUM(CASE WHEN month(c.tgl)=4 AND year(c.tgl)=$thn THEN (c.nilai) END),0) as b4
				,IFNULL(SUM(CASE WHEN month(c.tgl)=5 AND year(c.tgl)=$thn THEN (c.nilai) END),0) as b5 
				,IFNULL(SUM(CASE WHEN month(c.tgl)=6 AND year(c.tgl)=$thn THEN (c.nilai) END),0) as b6
				,IFNULL(SUM(CASE WHEN month(c.tgl)=7 AND year(c.tgl)=$thn THEN (c.nilai) END),0) as b7 
				,IFNULL(SUM(CASE WHEN month(c.tgl)=8 AND year(c.tgl)=$thn THEN (c.nilai) END),0) as b8
				,IFNULL(SUM(CASE WHEN month(c.tgl)=9 AND year(c.tgl)=$thn THEN (c.nilai) END),0) as b9 
				,IFNULL(SUM(CASE WHEN month(c.tgl)=10 AND year(c.tgl)=$thn THEN (c.nilai) END),0) as b10
				,IFNULL(SUM(CASE WHEN month(c.tgl)=11 AND year(c.tgl)=$thn THEN (c.nilai) END),0) as b11 
				,IFNULL(SUM(CASE WHEN month(c.tgl)=12 AND year(c.tgl)=$thn THEN (c.nilai) END),0) as b12
				,IFNULL(SUM(CASE WHEN month(c.tgl)<15 AND year(c.tgl)=$thn THEN c.nilai END),0) as tot
				,IFNULL(SUM(CASE WHEN month(c.tgl)<15 AND year(c.tgl)=".($thn-1)." THEN c.nilai END),0) as tot1
				,IFNULL((CASE WHEN k.bulan=15 AND k.tahun=$thn THEN k.nilai END),0) as b15
				,IFNULL(ROUND(SUM(CASE WHEN month(c.tgl)<15 AND year(c.tgl)=$thn THEN c.nilai END)*100/
					GROUP_CONCAT(CASE WHEN k.bulan=15 AND k.tahun=$thn THEN k.nilai END),2),0) as persen 
				FROM cat_equip ce 
					LEFT JOIN kontrak c ON c.cat=ce.id
					LEFT JOIN contract k ON k.tipe=ce.id 
				WHERE ce.parent=0 
				GROUP BY ce.id ORDER BY ce.nama ASC";
		//*/
		//echo "sql: $sql<br/>";
		$query = $this->db->query($sql);
		return $query->result();
	}
	
	function get_single_kontrak($thn)	{
		$this->db->select('*');
		$this->db->where('YEAR(tgl)',$thn);
		$this->db->order_by('tgl','desc');
		
		$query = $this->db->get('kontrak');
		
		return $query->result();
	}
	
	function get_tipe_eq()	{
		$sql = "SELECT LOWER(kode) AS kode,nama 
				FROM cat_equip WHERE parent=0";
		//echo "sql: $sql";
		$query = $this->db->query($sql);
		return $query->result();
	}
	
	function get_grafikcontrak($thn)	{
		/*
		$sql =	"SELECT month(k.tgl) AS m 
				,IFNULL(SUM(CASE WHEN cat=5 THEN nilai end),0) gc
				,IFNULL(SUM(CASE WHEN cat=7 THEN nilai end),0) gs
				,IFNULL(SUM(CASE WHEN cat=6 THEN nilai end),0) pm
				FROM kontrak k
				WHERE year(k.tgl) = $thn 
				GROUP BY m
				ORDER BY m ASC";
		//*/
		$sql = "call rGKontrak($thn)";
		//echo "sql: $sql";
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


	function csKontrak($data)	{
		//echo "disini 1<br/>";
		$this->db->trans_start();
		//echo "disini 2<br/>";
		$this->db->insert('kontrak', $data);
		//echo "disini 3<br/>";
		//echo $this->db->last_query();
		//echo "disini 4<br/>";
		$insert_id = $this->db->insert_id();
		$this->db->trans_complete();
		return  $insert_id;
	}
	
	function dsKontrak($data)	{
		//echo 'id: '. $data->id;
		$this->db->where('id', $data->id);
		$this->db->delete('kontrak'); 
		return  $data->id;
	}
	
	function usKontrak($data)	{
		$this->db->set($data);
		$this->db->where('id', $data->id);
		return $this->db->update('kontrak');
	}
}

/* End of file contract.php */
/* Location: ./application/models/contract.php */
