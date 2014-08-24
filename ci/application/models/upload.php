<?php

class Upload extends CI_Model {

	function insert_bpm3($c)    {

		$sql = "call iusap('".date('Y-m-d')."','".cariLokasi($c[28])."','".$c[18]."',".
			"'{$c[1]}','{$c[2]}','{$c[3]}','{$c[4]}','".fDT($c[5])."','{$c[6]}','{$c[7]}','{$c[8]}','{$c[10]}','{$c[11]}',".
			"'".fDT($c[12])."','".fDT($c[13])."','".fDT($c[14])."','".fDT($c[15])."','{$c[19]}','{$c[20]}','{$c[21]}','{$c[22]}','{$c[23]}','{$c[25]}',".
			"'{$c[26]}','{$c[27]}','{$c[30]}','{$c[31]}','".fTgl($c[32])."','".fTgl($c[33])."','{$c[34]}','{$c[35]}','{$c[36]}','{$c[37]}',".
			"'{$c[38]}','{$c[39]}','{$c[40]}','{$c[41]}','{$c[42]}','".cekInt($c[43])."','".cekInt($c[44])."','{$c[52]}','{$c[53]}','".fDT($c[54])."',".
			"'{$c[55]}','{$c[56]}','{$c[57]}','{$c[58]}');";
		
		$hsl = array();		
		if (mysqli_multi_query($this->db->conn_id,$sql))	{
			do    {
				// Store first result set
				if ($result=mysqli_store_result($this->db->conn_id))	{
					while ($row=mysqli_fetch_row($result))	{
						//printf("%s\n",$row['pid']);
						//echo "pid";
						$hsl = $row;
						//print_r($row); echo "<br/>";
					}
					mysqli_free_result($result);
				}
			}
			while (mysqli_next_result($this->db->conn_id));
		}
		
		if ($hsl[0]==1)	{		// query sap update, maka hapus dulu di sapfmea
			//$sql = "DELETE FROM sapfmea where pid={$hsl[1]};";
			$this->db->where('pid', $hsl[1]);
			$this->db->delete('sapfmea');
		}
		
		//echo "sql: sukes<br/>";
		$opart = explode(",",$c[45]);
		if ($c[45] && strlen($c[45])>2)	{
			if (count($opart)>1)	{
				$damage = explode(",",$c[47]);
				$cause  = explode(",",$c[49]);
				
				for ($i=0; $i<count($opart); $i++)	{
					$data = array(
						'pid'	=> trim($c[1]),
						'opart' => trim($opart[$i]),
						'damage'=> trim($damage[$i]),
						'cause'	=> trim($cause[$i]),
						'input'	=> date('Y-m-d')
					);
					$this->db->set($data);
					$this->db->insert('sapfmea');
				}
			}
			else if (count($opart)==1) {
				$data = array(
					'pid'	=> trim($c[1]),
					'opart' => trim($c[45]),
					'damage'=> trim($c[47]),
					'cause'	=> trim($c[49]),
					'input'	=> date('Y-m-d')
				);
				$this->db->set($data);
				$this->db->insert('sapfmea');
			}
		}
    }

}

/* End of file upload.php */
/* Location: ./application/models/upload.php */
