<?php

class Sap extends CI_Model {

	function get_jmlWO()    {

		$sql =	"SELECT ordertype AS kode,pmtype,count(*) AS wo ".
				",ROUND((100*count(*)/(select count(*) from sap )),2) as persen ".
				"FROM sap GROUP BY ordertype ORDER BY ordertype ASC,pmtype ASC";
		$query = $this->db->query($sql);
		
		return $query->result();
    }
    
    function get_selisih_WO($thn)	{
		/*
		$sql =	"select (datediff(curdate(), planend)) as beda, count(*) as jml ".
				",ROUND((100*count(*)/(select count(*) from sap where teco=0 and planend<curdate())),2) as persen ".
				",(select CASE WHEN beda<7 THEN 1 WHEN beda<30 THEN 2 WHEN beda<60 THEN 3 ELSE 4 END) AS flak ".
				"from sap ".
				"WHERE teco=0 and planend<curdate() AND YEAR(planstart)=$thn GROUP BY flak";
		//*/
		$sql =	"select (datediff(curdate(), planend)) as beda, count(*) as jml ".
				",ROUND((100*count(*)/(select count(*) from sap where teco=0 and planend<curdate() AND (datediff(curdate(), planend))>2)),2) as persen ".
				",(select CASE WHEN beda<3 THEN 0 WHEN beda<7 THEN 1 WHEN beda<30 THEN 2 WHEN beda<60 THEN 3 ELSE 4 END) AS flak ".
				"from sap ".
				"WHERE teco=0 and planend<curdate() AND YEAR(planstart)=$thn  AND (datediff(curdate(), planend))>2 ".
				"GROUP BY flak";
		//		"where downend='0000-00-00' and planend<curdate() group by flak";
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
	
	function get_damage()	{
		$s = "select sapfmea.damage as kode,damage.nama, count(*) as jml, ".
			 "ROUND((100*count(*)/(select count(*) from sapfmea where damage <> 'NDMG')),2) as persen ".
			 "from sapfmea ".
			 "left join damage on sapfmea.damage = damage.kode ".
			 "where damage <> 'NDMG' group by damage order by jml desc;";
		$query = $this->db->query($s);
		
		return $query->result();
	}
	
	function get_damage_info($damage)	{
		$sql = "SELECT sap.pid AS noorder,damage,cause,manwork AS mainwork,opart,eqkode AS equip,".
				"notiftype AS tipe,ordertype,downstart ".
				"FROM sapfmea ".
				"LEFT JOIN sap ON sap.pid = sapfmea.pid";
		
		if (strlen($damage)>0)	{
			$sql .= "WHERE damage LIKE '%$damage%'";
		}
		$query = $this->db->query($sql);
		
		return $query->result();
	}
	
	function get_opart()	{
		$s = "select count(*) as jml, opart as kode, ".
			 "(select nama from opart where opart.kode = sapfmea.opart limit 0,1) as nama, ".
			 "ROUND((100*count(*)/(select count(*) from sapfmea)),2) as persen ".
			 "from sapfmea ".
			 "group by opart order by jml desc";
		$query = $this->db->query($s);
		
		return $query->result();
	}
	
	function get_opart_info($opart)	{
		$sql = "SELECT sap.pid AS noorder,damage,cause,manwork AS mainwork,opart,eqkode AS equip,".
				"notiftype AS tipe,ordertype,downstart ".
				"FROM sapfmea ".
				"LEFT JOIN sap ON sap.pid = sapfmea.pid";
		
		if (strlen($damage)>0)	{
			$sql .= "WHERE opart LIKE '%$opart%'";
		}
		$query = $this->db->query($sql);
		
		return $query->result();
	}
	
	function get_symptom()	{
		$s = "select count(*) as jml, opart as kode, ".
			 "(select nama from opart where opart.kode = sapfmea.opart limit 0,1) as nama, ".
			 "ROUND((100*count(*)/(select count(*) from sapfmea)),2) as persen ".
			 "from sapfmea ".
			 "group by symptom order by jml desc";
		$query = $this->db->query($s);
		
		return $query->result();
	}
	
	function get_symptom_info($opart)	{
		$sql = "SELECT sap.pid AS noorder,damage,cause,manwork AS mainwork,opart,eqkode AS equip,".
				"notiftype AS tipe,ordertype,downstart ".
				"FROM sapfmea ".
				"LEFT JOIN sap ON sap.pid = sapfmea.pid";
		
		if (strlen($damage)>0)	{
			$sql .= "WHERE opart LIKE '%$opart%'";
		}
		$query = $this->db->query($sql);
		
		return $query->result();
	}
	
	function get_teco_manwork($thn)	{
		$sql =	"select refer.nama, (count(teco)) as tot, ".
				"sum(if(teco!=0,1,0)) as `teco`, ".
				"sum(if(teco!=0,0,1)) as `open`,".
				"ROUND((100*(sum(if(teco!=0,1,0)))/count(teco)),2) as woc, ".
				"ROUND((100*(sum(if(teco!=0,0,1)))/count(teco)),2) as woo ".
				"from sap left join refer on refer.kode = sap.manwork ".
				"where manwork != '' AND YEAR(planstart)=$thn group by manwork";

		$query = $this->db->query($sql);
		return $query->result();
	}
	
	function get_teco_persen($thn)	{
		$sql =	"select (if(teco!=0,1,0)) as teko ".
				",(if(teco!=0,'Teco','Open')) as nama ".
				",ROUND((100*count(*)/(select count(*) from sap)),2) as `teco` ".
				"from sap where YEAR(planstart)=2014 ".
				"group by teko";

		$query = $this->db->query($sql);
		return $query->result();
	}
	
	function get_histori($thn)	{
		$sql =	"SELECT DATE_FORMAT(planend, '%b') AS bulan, MONTH(planend)-1 AS nbln ".
				",SUM(IF(tecodate<=DATE_ADD(planend,INTERVAL 7 DAY) AND teco=0,0,1)) AS `teco` ".
				",SUM(IF(tecodate<=DATE_ADD(planend,INTERVAL 7 DAY) AND teco=0,1,0)) AS `open` ".
				",SUM(IF(tecodate<=DATE_ADD(planend,INTERVAL 7 DAY) AND teco=0,1,1)) AS jml ".
				",ROUND((SUM(IF(tecodate<=DATE_ADD(planend,INTERVAL 7 DAY) AND teco=0,1,0)))*100/(SUM(IF(tecodate<=DATE_ADD(planend,INTERVAL 7 DAY) AND teco=0,1,1))),2) as persen ".
				"FROM sap WHERE YEAR(planstart)=$thn GROUP BY nbln ORDER BY nbln ASC";
		//echo "sql: $sql";		
		
		$query = $this->db->query($sql);
		return $query->result();
	}
	
	

}

/* End of file sap.php */
/* Location: ./application/models/sap.php */
