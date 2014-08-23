<?php

class Sap extends CI_Model {

	function get_jmlWO()    {

		$sql =	"SELECT ordertype AS kode,pmtype,count(*) AS wo ".
				",ROUND((100*count(*)/(select count(*) from sap )),2) as persen ".
				"FROM sap GROUP BY ordertype ORDER BY ordertype ASC,pmtype ASC";
		$query = $this->db->query($sql);
		
		return $query->result();
    }
    
    function get_selisih_WO()	{
		$sql =	"select (datediff(curdate(), planend)) as beda, count(*) as jml ".
				",ROUND((100*count(*)/(select count(*) from sap where downend='0000-00-00' and planend<curdate())),2) as persen ".
				",(select CASE WHEN beda<7 THEN 1 WHEN beda<30 THEN 2 WHEN beda<60 THEN 3 ELSE 4 END) AS flak ".
				"from sap ".
				"where downend='0000-00-00' and planend<curdate() group by flak";
		// WHEN beda<3 THEN 0 
		$query = $this->db->query($sql);
		
		return $query->result();
    }
    
    function get_cause()	{
		$sql = "select sapfmea.cause AS kode,cause.nama, count(*) as jml,".
				"ROUND((100*count(*)/(select count(*) from sapfmea )),2) as persen ".
				"from sapfmea ".
				"left join cause on sapfmea.cause= cause.kode ".
				"group by cause order by jml desc;";	 
		$query = $this->db->query($sql);
		
		return $query->result();
	}
	
	function get_cause_info($cause)	{
		$sql = "SELECT sap.pid AS noorder,damage,cause,manwork AS mainwork,opart,eqkode AS equip,".
				"notiftype AS tipe,ordertype,downstart ".
				"FROM sapfmea ".
				"LEFT JOIN sap ON sap.pid = sapfmea.pid";
		
		if (strlen($cause)>0)	{
			$sql .= "WHERE cause LIKE '%$cause%'";
		}
		$query = $this->db->query($sql);
		
		return $query->result();
	}
}

/* End of file sap.php */
/* Location: ./application/models/sap.php */
