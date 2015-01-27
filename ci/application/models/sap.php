<?php

class Sap extends CI_Model {

	function jml_sap()		{
		$sql =	"select count(*) AS sap from sap UNION ALL
				SELECT count(*) from sapfmea";
		$query = $this->db->query($sql);
		
		return $query->result();
	}

	function get_jmlWO($thn,$mwc,$lok)    {
		/*
		$sql =	"SELECT ordertype AS kode,pmtype,count(*) AS wo
				,ROUND((100*count(*)/(select count(*) from sap )),2) as persen
				FROM sap GROUP BY ordertype ORDER BY ordertype ASC,pmtype ASC";
		//*/
		$fmc = ''; $flok = '';
		if ($mwc !== '-')	$fmc  = " AND manwork LIKE '%$mwc%' ";
		//echo "lok: $lok<br/>";
		if ($lok >= 0)		{
			$flok = " AND sap.lokasi=$lok ";
		}
		
		
		$sql =	"select ordertype AS kode,pmtype,count(*) AS wo
				,ROUND((100*count(*)/(
					select count(*) from sap WHERE year(planstart) = '$thn' $fmc $flok AND 
					ordertype in ('EP01','EP02','EP03','EP04','EP05'))),3) as persen
				FROM sap
				WHERE year(planstart) = '$thn' $fmc $flok
				GROUP BY ordertype ";
		// LEFT JOIN hirarki h ON h.urut = sap.lokasi
		//echo "sql: $sql<br/><br/>";
		$query = $this->db->query($sql);
		
		return $query->result();
    }
    
    function get_selisih_WO($thn,$lok,$otp,$mwc)	{
		/*
		$sql =	"select (datediff(curdate(), planend)) as beda, count(*) as jml
				,ROUND((100*count(*)/(select count(*) from sap where teco=0 and planend<curdate() AND (datediff(curdate(), planend))>2)),2) as persen
				,(select CASE WHEN beda<3 THEN 0 WHEN beda<7 THEN 1 WHEN beda<30 THEN 2 WHEN beda<60 THEN 3 ELSE 4 END) AS flak
				from sap
				WHERE teco=0 and planend<curdate() AND YEAR(planstart)=$thn AND (datediff(curdate(), planend))>2 ";
		//*/
		$flt = '';
		//if ($lok!="ALL" and $lok!="_")		$flt .= " AND lokasi=$lok ";
		if ($lok>=0)		$flt .= " AND lokasi=$lok ";
		if ($otp!="ALL" and $otp!="_")		$flt .=	" AND ordertype like '%$otp%' ";
		if ($mwc!="ALL" and $mwc!="_")		$flt .=	" AND manwork like '%$mwc%' ";
		
		$sql =	"SELECT (datediff(CURDATE(), planend)) AS beda, count(*) AS jml
				,ROUND((100*count(*))/(
					select count(*) from sap where teco=0 and planend<curdate() AND datediff(curdate(), planend)>2 and year(planstart)=$thn $flt),2) as persen
				,(select CASE WHEN beda<3 THEN 0 WHEN beda<7 THEN 1 WHEN beda<30 THEN 2 WHEN beda<60 THEN 3 ELSE 4 END) AS flak
				from sap
				WHERE teco=0 AND YEAR(planstart)=$thn AND datediff(curdate(), planend)>2 AND planend<curdate() $flt ";	
		
		//*/
		$sql .=	" GROUP BY flak";
		//		"where downend='0000-00-00' and planend<curdate() group by flak";
		//echo "sql: $sql<br/><br/><br/>";
		// WHEN beda<3 THEN 0 		
		$query = $this->db->query($sql);
		
		return $query->result();
    }
    
    function get_cause($thn)	{
		$sql = "select cause as kode,CONCAT('[',cause,'] ',ifnull(cause.nama,'')) AS desk,cause.nama
				,count(*) AS jml
				,ROUND(100*count(*)/(SELECT count(*) FROM sapfmea sfx 
					LEFT JOIN sap ON sfx.pid = sap.pid 
					where YEAR(planstart)=$thn AND (sfx.cause <> 'COTH' OR sap.ordertype <> 'EP03')),2) as persen
				from sapfmea sf
				LEFT JOIN sap ON sf.pid = sap.pid
				LEFT JOIN cause on sf.cause= cause.kode
				where YEAR(planstart)=$thn AND (sf.cause <> 'COTH' OR sap.ordertype <> 'EP03')
				group by cause
				ORDER BY jml desc, cause asc";	 
		$query = $this->db->query($sql);
		
		return $query->result();
	}
	
	function get_cause_info($cause,$thn)	{
		/*
		$sql = "SELECT sap.pid AS noorder,if(notifno=0,'',notifno) AS nosap,damage,damage.nama AS damagenm,cause,cause.nama AS causenm,
				manwork AS mainwork,down,opart,opart.nama as opartnm,
				eqkode AS equip,totplancost as biaya,notiftype AS tipe,ordertype,downstart
				FROM sapfmea
				LEFT JOIN sap ON sap.pid = sapfmea.pid
				LEFT JOIN opart ON sapfmea.opart = opart.kode
				LEFT JOIN damage ON sapfmea.damage = damage.kode
				LEFT JOIN cause ON sapfmea.cause = cause.kode
				group by noorder,damage,cause,opart";
		//*/
		$sql =	"select sf.pid AS noorder,if(orderno=0,'',orderno) AS nosap
				,sf.damage,if(sf.damage<>'',damage.nama,'') AS damagenm
				,sf.cause,if(sf.cause<>'',cause.nama,'') AS causenm,planstart AS plnstr
				,sf.opart,if(sf.opart<>'',opartdef.nama,'') as opartnm,deskord AS orderdesc
				,manwork AS mainwork,down,eqkode AS equip,totplancost as biaya,notiftype AS tipe,ordertype,downstart
				from sapfmea sf
				LEFT JOIN sap ON sap.pid = sf.pid
				LEFT JOIN cause ON sf.cause = cause.kode
				LEFT JOIN opartdef ON sf.opart = opartdef.kode
				LEFT JOIN damage ON sf.damage = damage.kode
				where YEAR(planstart)=$thn AND (sf.cause <> 'COTH' OR sap.ordertype <> 'EP03')";
		
		if (strlen($cause)>0)	{
			$sql .= "WHERE cause LIKE '%$cause%'";
		}
		$query = $this->db->query($sql);
		
		return $query->result();
	}
	
	function get_damage($thn)	{
		$sql = "select sapfmea.damage as kode,CONCAT('[',sapfmea.damage,'] ',damage.nama) AS desk,damage.nama, count(*) as jml,
				ROUND((100*count(*)/(select count(*) from sapfmea left join sap on sapfmea.pid= sap.pid where damage <> 'NDMG' AND 
					YEAR(planstart)=$thn)),2) as persen
				from sapfmea
				left join damage on sapfmea.damage = damage.kode
				left join sap on sapfmea.pid= sap.pid
				where YEAR(planstart)=$thn
				AND damage <> 'NDMG' group by damage order by jml desc, kode asc";
		$query = $this->db->query($sql);
		
		return $query->result();
	}
	
	function get_damage_info($damage, $thn)	{
		/*
		$sql = "SELECT sap.pid AS noorder,damage,cause,manwork AS mainwork,opart,eqkode AS equip,".
				"notiftype AS tipe,ordertype,downstart ".
				"FROM sapfmea ".
				"LEFT JOIN sap ON sap.pid = sapfmea.pid";
		//*/
		$sql =	"select sf.pid AS noorder,if(notifno=0,'',notifno) AS nosap
				,sf.damage,if(sf.damage<>'',damage.nama,'') AS damagenm
				,sf.cause,if(sf.cause<>'',cause.nama,'') AS causenm
				,sf.opart,if(sf.opart<>'',opartdef.nama,'') as opartnm,deskord AS orderdesc
				,manwork AS mainwork,down,eqkode AS equip,totplancost as biaya,notiftype AS tipe,ordertype,downstart
				from sapfmea sf
				LEFT JOIN sap ON sap.pid = sf.pid
				LEFT JOIN cause ON sf.cause = cause.kode
				LEFT JOIN opartdef ON sf.opart = opartdef.kode
				LEFT JOIN damage ON sf.damage = damage.kode
				where YEAR(planstart)=$thn
				ORDER BY ";
		
		if (strlen($damage)>0)	{
			$sql .= "WHERE damage LIKE '%$damage%'";
		}
		$query = $this->db->query($sql);
		
		return $query->result();
	}
	
	function get_opart($thn)	{
		/*
		$sql = "select count(*) as jml, opart as kode,
				(select nama from opart where opart.kode = sapfmea.opart limit 0,1) as nama,
				concat('[',opart,'] ',(select nama from opart where opart.kode = sapfmea.opart limit 0,1)) AS desk,
				ROUND((100*count(*)/(select count(*) from sapfmea left join sap on sapfmea.pid= sap.pid
				where YEAR(planstart)=$thn)),2) as persen
				from sapfmea
				left join sap on sapfmea.pid= sap.pid
				where YEAR(planstart)=$thn
				group by opart,kode order by jml desc, kode asc";
		//*/
		$sql =	"SELECT sf.opart AS kode, count(*) AS jml,od.nama,CONCAT('[',sf.opart,'] ',od.nama) AS desk
				,ROUND((100*COUNT(*)/(SELECT COUNT(*) FROM sapfmea LEFT JOIN sap ON sapfmea.pid=sap.pid
					WHERE YEAR(planstart)=2014)),2) as persen
				FROM sapfmea sf
				LEFT JOIN sap ON sf.pid= sap.pid
				LEFT JOIN opartdef od ON od.kode = sf.opart 
				WHERE YEAR(planstart)=$thn AND (sf.cause <> 'COTH' OR sap.ordertype <> 'EP03')
				GROUP BY opart
				ORDER BY jml DESC";
		$query = $this->db->query($sql);
		
		return $query->result();
	}
	
	function get_opart_info($opart, $thn)	{
		$sql =	"SELECT sap.pid AS noorder,damage,cause,manwork AS mainwork,opart,eqkode AS equip,
				notiftype AS tipe,ordertype,downstart,deskord AS orderdesc
				FROM sapfmea
				LEFT JOIN sap ON sap.pid = sapfmea.pid
				WHERE YEAR(planstart)=$thn ";
				
		if (strlen($opart)>0)	{
			$sql .= "AND opart LIKE '%$opart%'";
		}
		//echo "sql: $sql";
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
		$sql = "SELECT sap.pid AS noorder,damage,cause,manwork AS mainwork,opart,eqkode AS equip,
				notiftype AS tipe,ordertype,downstart,deskord AS orderdesc
				FROM sapfmea
				LEFT JOIN sap ON sap.pid = sapfmea.pid
				WHERE ";
		
		if (strlen($damage)>0)	{
			$sql .= "WHERE opart LIKE '%$opart%'";
		}
		$query = $this->db->query($sql);
		
		return $query->result();
	}
	
	function get_teco_manwork($thn)	{
		$sql =	"select refer.nama, (count(teco)) as tot,
				sum(if(teco!=0,1,0)) as `teco`,
				sum(if(teco!=0,0,1)) as `open`,
				ROUND((100*(sum(if(teco!=0,1,0)))/count(teco)),2) as woc,
				ROUND((100*(sum(if(teco!=0,0,1)))/count(teco)),2) as woo
				from sap left join refer on refer.kode = sap.manwork
				where manwork != '' AND manwork != -1 AND YEAR(planstart)=$thn group by manwork";

		$query = $this->db->query($sql);
		return $query->result();
	}
	
	function get_teco_persen($thn)	{
		$sql =	"select (if(teco!=0,1,0)) as teko
				,(if(teco!=0,'Teco','Open')) as nama
				,ROUND((100*count(*)/(select count(*) from sap where YEAR(planstart)=$thn)),2) as `teco`
				from sap where YEAR(planstart)=$thn
				group by teko";

		$query = $this->db->query($sql);
		return $query->result();
	}
	
	function get_histori($thn,$lok,$otp,$mwc)	{
		
		if ($thn==12)	{
			$sql =	"SELECT (YEAR(planend)*100+MONTH(planend)) as wkt, DATE_FORMAT(planend, '%b%y') AS bulan, MONTH(planend)-1 AS nbln
					,SUM(IF(tecodate<=DATE_ADD(planend,INTERVAL 7 DAY) AND teco=0,0,1)) AS `teco`
					,SUM(IF(tecodate<=DATE_ADD(planend,INTERVAL 7 DAY) AND teco=0,1,0)) AS `open`
					,SUM(IF(tecodate<=DATE_ADD(planend,INTERVAL 7 DAY) AND teco=0,1,1)) AS jml
					,ROUND((SUM(IF(tecodate<=DATE_ADD(planend,INTERVAL 7 DAY) AND teco=0,1,0)))*100/
						(SUM(IF(tecodate<=DATE_ADD(planend,INTERVAL 7 DAY) AND teco=0,1,1))),2) as persen
					FROM sap WHERE (YEAR(planend)*100+MONTH(planend)) <= (YEAR(CURDATE())*100+MONTH(CURDATE())) ";
			
			if ($lok>=0)		$sql .=	"AND lokasi=$lok ";
			if ($otp!="ALL" and $otp!="_")		$sql .=	"AND ordertype like '%$otp%' ";
			if ($mwc!="ALL" and $mwc!="_")		$sql .=	"AND manwork like '%$mwc%' ";
			$sql .=	"GROUP BY wkt, nbln ORDER BY wkt desc, nbln ASC limit 0,12";
		}
		else {
			$sql =	"SELECT DATE_FORMAT(planend, '%b%y') AS bulan, MONTH(planend)-1 AS nbln
					,SUM(IF(tecodate<=DATE_ADD(planend,INTERVAL 7 DAY) AND teco=0,0,1)) AS `teco`
					,SUM(IF(tecodate<=DATE_ADD(planend,INTERVAL 7 DAY) AND teco=0,1,0)) AS `open`
					,SUM(IF(tecodate<=DATE_ADD(planend,INTERVAL 7 DAY) AND teco=0,1,1)) AS jml
					,ROUND((SUM(IF(tecodate<=DATE_ADD(planend,INTERVAL 7 DAY) AND teco=0,1,0)))*100/(SUM(IF(tecodate<=DATE_ADD(planend,INTERVAL 7 DAY) AND teco=0,1,1))),2) as persen
					FROM sap WHERE YEAR(planend)=$thn ";
		
			//echo "lok: $lok<br/>";

			//if ($lok!="ALL" and $lok!="_")		$sql .=	"AND lokasi=$lok ";
			if ($lok>=0)		$sql .=	"AND lokasi=$lok ";
			if ($otp!="ALL" and $otp!="_")		$sql .=	"AND ordertype like '%$otp%' ";
			if ($mwc!="ALL" and $mwc!="_")		$sql .=	"AND manwork like '%$mwc%' ";
			$sql .=	"GROUP BY nbln ORDER BY nbln ASC";
		}
		//echo "sql: $sql<br/><br/>";		
		
		$query = $this->db->query($sql);
		return $query->result();
	}

	function get_tahun()	{
		$sql =	"select YEAR(planstart) AS thn, YEAR(planstart) AS nama FROM sap WHERE YEAR(planstart)>1900 GROUP BY thn ORDER BY thn DESC";
		//echo "sql: $sql";		
		
		$query = $this->db->query($sql);
		return $query->result();
	}
	
	function get_tahun12()	{
		$sql =	"SELECT 12 AS thn, '12 Bulan berjalan' AS nama
					UNION
				SELECT YEAR(planstart) AS thn, YEAR(planstart) AS nama FROM sap WHERE YEAR(planstart)>1900 GROUP BY thn ORDER BY thn DESC";
		//echo "sql: $sql";		
		
		$query = $this->db->query($sql);
		return $query->result();
	}
	
	function get_mwc()	{
		$sql =	"SELECT 'ALL' AS mwc UNION ".
				"SELECT manwork as mwc FROM sap WHERE manwork <> '' AND manwork <> -1 GROUP BY manwork";
		//echo "sql: $sql";		
		
		$query = $this->db->query($sql);
		return $query->result();
	}
	
	function get_ordertype()	{
		$sql =	"SELECT 'ALL' AS otype UNION ".
				"SELECT ordertype as otype FROM sap WHERE ordertype <> '' GROUP BY ordertype";
		//echo "sql: $sql";		
		
		$query = $this->db->query($sql);
		return $query->result();
	}

	function get_ordercostwo($thn)    {
		/*
		$sql =	"SELECT objid AS otipe, objtype AS `desc`, count(*) AS jml
				,ROUND(sum(totescost),2) AS plstcost,ROUND(sum(intcost),2) AS plincost,ROUND(sum(totplancost),2) AS tplcost
				,ROUND(sum(totmatcost),2) AS taccost,ROUND(sum(intcost),2) AS acincost
				,ROUND(sum(totservcost),2) AS srvcost,ROUND(sum(actcost),2) AS acstcost
				,(SELECT budget FROM ocost WHERE thn=$thn) AS budget
				,ROUND((SELECT wo FROM ocost WHERE thn=$thn),2) AS persen
				FROM sap WHERE totplancost>0 AND YEAR(planstart)=$thn and objid!='' GROUP BY otipe";
		//*/
		$sql =	"SELECT objid AS otipe, objtype AS `desc`, count(*) AS jml
				,ROUND(sum(totescost),2) AS plstcost,ROUND(sum(intcost),2) AS plincost,ROUND(sum(totplancost),2) AS tplcost
				,ROUND(sum(totmatcost),2) AS taccost,ROUND(sum(intcost),2) AS acincost
				,ROUND(sum(totservcost),2) AS srvcost,ROUND(sum(actcost),2) AS acstcost
				,(SELECT budget FROM ocost WHERE thn=$thn) AS budget
				,ROUND((select SUM(totmatcost) FROM sap WHERE totplancost>0 AND YEAR(planstart)=$thn AND objid!='')*100/
					(SELECT budget FROM ocost WHERE thn=$thn),2) as persen
				FROM sap WHERE totplancost>0 AND YEAR(planstart)=$thn and objid!='' GROUP BY otipe";
		//echo "sql: $sql";
		
		$query = $this->db->query($sql);
		return $query->result();
    }
    
    function get_ordercostot($thn)	{
		/*
		$sql =	"SELECT ordertype as otipe, pmtype as `desc`
				,ROUND(sum(totescost),2) AS plstcost,ROUND(sum(intcost),2) AS plincost,ROUND(sum(totplancost),2) AS tplcost
				,ROUND(sum(totmatcost),2) AS taccost,ROUND(sum(intcost),2) AS acincost
				,ROUND(sum(totservcost),2) AS srvcost,ROUND(sum(actcost),2) AS acstcost
				,(SELECT budget FROM ocost WHERE thn=$thn) AS budget
				,ROUND((SELECT otype FROM ocost WHERE thn=$thn),2) AS persen
				FROM sap WHERE totplancost>0 AND YEAR(planstart)=$thn group by ordertype";
		//*/
		$sql =	"SELECT ordertype as otipe, pmtype as `desc`
				,ROUND(sum(totescost),2) AS plstcost,ROUND(sum(intcost),2) AS plincost,ROUND(sum(totplancost),2) AS tplcost
				,ROUND(sum(totmatcost),2) AS taccost,ROUND(sum(intcost),2) AS acincost
				,ROUND(sum(totservcost),2) AS srvcost,ROUND(sum(actcost),2) AS acstcost
				,(SELECT budget FROM ocost WHERE thn=$thn) AS budget
				,ROUND((select SUM(totmatcost) FROM sap WHERE totplancost>0 AND YEAR(planstart)=$thn)*100/
					(SELECT budget FROM ocost WHERE thn=$thn),2) as persen
				FROM sap WHERE totplancost>0 AND YEAR(planstart)=$thn group by ordertype";
		
		$query = $this->db->query($sql);
		return $query->result();
	}
	
	function get_persen_ocwo($thn)	{
		$sql =	"SELECT objid AS nama 
				,ROUND(sum(totplancost)*100/(select sum(totplancost) from sap WHERE totplancost>0 AND YEAR(planstart)=$thn and objid!=''),2) as tPlCost 
				,ROUND(sum(totmatcost)*100/(select sum(totmatcost) from sap WHERE totplancost>0 AND YEAR(planstart)=$thn and objid!=''),2) as tAcCost 
				FROM sap WHERE totplancost>0 AND YEAR(planstart)=$thn and objid!='' GROUP BY objid";
				
		$query = $this->db->query($sql);
		return $query->result();
	}
	
	function get_persen_ocot($thn)	{
		$sql =	"SELECT ordertype as nama 
				,ROUND(sum(totplancost)*100/(SELECT sum(totplancost) FROM sap WHERE totplancost>0 AND YEAR(planstart)=$thn),2) as tPlCost 
				,ROUND(SUM(totmatcost)*100/(SELECT sum(totplancost) FROM sap WHERE totplancost>0 AND YEAR(planstart)=$thn),2) as tAcCost 
				FROM sap WHERE totplancost>0 AND YEAR(planstart)=2014 group by ordertype";
				
		$query = $this->db->query($sql);
		return $query->result();
	}

	function get_topten($thn)	{
		/*
		$sql =	"SELECT ROUND(SUM(totmatcost),2) as jml
				,CONCAT(e.nama,' ',SUBSTRING_INDEX(sap.funcloc,'-',-1),' @',SUBSTRING_INDEX(h.nama,' ',-1)) as desk
				FROM sap,equip e,hirarki h
				WHERE e.tag= sap.eqkode AND sap.lokasi=h.urut 
				AND YEAR(planstart)=$thn
				GROUP BY eqkode
				ORDER BY jml desc, totmatcost DESC LIMIT 0,10";
		//*/
		$sql =	"SELECT sap.funcloc,CONCAT(e.nama,' ',SUBSTRING_INDEX(sap.funcloc,'-',-1),' @',h.nama) AS desk, 
				ROUND(sum(sap.totmatcost),2) AS jml
				FROM sap
				LEFT JOIN equip e ON e.tag = sap.eqkode
				LEFT JOIN hirarki h ON h.urut>=0 and h.parent = 0 AND sap.lokasi = h.urut
				where year(sap.planstart)=2014 AND  sap.eqdesc <> ''
				group by sap.eqkode 
				order by jml DESC limit 0,10";
		
		$query = $this->db->query($sql);
		return $query->result();
	}
	
	function get_toptenFL($thn)	{
		$sql =	"SELECT CONCAT(h.nama,' @',SUBSTRING_INDEX(hhh.nama,' ',-1)) AS desk
				,ROUND(SUM(totmatcost),2) as jml
				FROM sap,hirarki h
				INNER JOIN hirarki hh ON h.parent = hh.id
				INNER JOIN hirarki hhh ON hh.parent = hhh.id
				WHERE sap.funcloc=h.funcloc AND YEAR(planstart)=$thn
				GROUP BY sap.funcloc
				ORDER BY jml DESC, totmatcost DESC LIMIT 0,10";
		//echo "sql: $sql<br/>";
		$query = $this->db->query($sql);
		//print_r($query->result());
		return $query->result();
	}

	function get_pm_cost($thn)	{
		/*
		$sql = "SELECT ordertype AS ortype, pmtype AS desk, ROUND(SUM(totplancost),2) as jml,
				(SELECT CASE WHEN ortype = 'EP01' THEN '#2f7ed8'
					WHEN ortype = 'EP02' THEN '#0d233a'
					WHEN ortype = 'EP03' THEN '#8bbc21'
					WHEN ortype = 'EP04' THEN '#910000'
					WHEN ortype = 'EP05' THEN '#ffa81f' END) AS color 
				FROM sap
				WHERE YEAR(planstart)=$thn AND pmtype <> ''
				GROUP BY ordertype,pmtype
				ORDER BY ordertype asc, jml desc";
		//echo "sql: $sql";
		//*/
		//*
		$sql =	"select pmtype AS desk,ordertype AS ortype, ROUND(SUM(totmatcost),0) as jml
				,(CASE WHEN ordertype = 'EP01' THEN '#2f7ed8'
					WHEN ordertype = 'EP02' THEN '#0d233a'
					WHEN ordertype = 'EP03' THEN '#8bbc21'
					WHEN ordertype = 'EP04' THEN '#910000'
					WHEN ordertype = 'EP05' THEN '#ffa81f' END) AS color 
				FROM sap
				WHERE YEAR(planstart)=$thn AND pmtype <> ''
				GROUP BY ordertype,pmtype
				ORDER BY ordertype asc, jml desc";
		//*/
		$query = $this->db->query($sql);
		return $query->result();
	}
	
	function get_ocost($thn)	{
		$sql =	"SELECT * FROM ocost where thn=$thn";
		$query = $this->db->query($sql);
		return $query->result();
	}
	
	function set_ocost($thn,$wo,$otype,$budget)	{
		$sql =	"REPLACE INTO ocost (thn,wo,otype,budget) VALUES ($thn, $wo, $otype, $budget)";
		//echo "sql: $sql<br/>";
		$this->db->query($sql);
		
		return 1;
	}
	
}

/* End of file sap.php */
/* Location: ./application/models/sap.php */
