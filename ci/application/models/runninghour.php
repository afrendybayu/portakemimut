<?php

class Runninghour extends CI_Model {
	//function get_event($id,$downt,$downj,$upt,$upj,$flag=0,$event,$edit,$idid,$da,$db,$ua,$ub)    {
	function cek_tgl_rh_ada($eq, $tgl) {
		$this->db->select('id');
		$this->db->where('eq',$eq);
		$this->db->where('tgl',$tgl);
		$query = $this->db->get('rh_201311');
		
		//$hsl = $query->result();
		$adaTgl = new stdClass();
		$adaTgl->id = $query->result();
		$adaTgl->jml = count($query->result());
		//echo "<br/>adaTgl: ";	print_r($adaTgl); 
		return $adaTgl;
	}
	
	function insert_rh($data)	{
		$this->db->set($data);
		$this->db->insert('rh_201311');
	}
	
	function update_rh($data,$id)	{
		$this->db->where('id',$id);
		$this->db->update('rh_201311',$data);
	}
	
	function get_spAvReU($avre, $cat, $bln, $thn)	{
		$sql =	"select ROUND(ifnull((sum($avre)/count(id))*(100/24),0),2) as av from rh_201311 ".
				"where thn=$thn and bln = $bln and cat = $cat";
		
		$query = $this->db->query($sql);
		
		//echo "<br/>sql: $sql<br/>";
		//echo "hsl : "; print_r($query->result());
		return $query->result();
	}
	
	function get_avre_sthn($thn)	{
		$sql =	"select cat ".	// , count(id) as jmleq
				",ROUND((sum(rh_av)*100/(count(id)*24)),2) as av,ROUND((sum(rh_re)*100/(count(id)*24)),2) as re ".
				"from rh_201311 where thn=? group by cat";
		//echo "sql: $sql<br/>";
		$query = $this->db->query($sql,$thn);
		return $query->result();
	}

	function get_avre_ytd($bln, $thn)	{
		$sql =	"select cat ".	// , count(id) as jmleq
				",ROUND((sum(rh_av)*100/(count(id)*24)),2) as av,ROUND((sum(rh_re)*100/(count(id)*24)),2) as re ".
				"from rh_201311 where thn=? and bln<=? group by cat";
		//echo "sql: $sql<br/>";
		$query = $this->db->query($sql,array($thn, $bln));
		return $query->result();
	}
	

	function get_rhunit($eq,$tgl){
		$this->db->select('eq,tgl');
		$this->db->where('eq',$eq);
		$this->db->where('tgl',$tgl);
		$query = $this->db->get('rh_201311');
		return $query->result();
	}

	function get_avre_sbln($bln, $thn)	{//  count(id) AS jmleq 
		$sql =	"SELECT cat ".		
				",ROUND((sum(rh_av)*100/(count(id)*24)),2) AS av,ROUND((sum(rh_re)*100/(count(id)*24)),2) AS re ".
				"FROM rh_201311 WHERE thn=$thn AND bln=$bln GROUP BY cat";
		//echo "sql: $sql<br/>";
		$query = $this->db->query($sql,$thn);
		return $query->result();
	}

	function get_avre_sbln_eq($bln, $thn, $cat)	{//  count(id) AS jmleq 
		/*
		$sql =	"SELECT eq ".		
				",ROUND((sum(rh_av)*100/(count(id)*24)),2) AS av,ROUND((sum(rh_re)*100/(count(id)*24)),2) AS re ".
				"FROM rh_201311 WHERE thn=$thn AND bln=$bln AND cat=$cat GROUP BY eq";
		echo "sql: $sql<br/>";
		//*/
		$sql =	"SELECT hirarki.id AS id ".
				",CONCAT(hirarki.init,'@',(SELECT hhh.kode FROM hirarki hhh WHERE hhh.id = (SELECT hh.parent FROM hirarki hh WHERE hirarki.parent = hh.id))) AS kode ".
				",CONCAT(hirarki.nama,', ',equip.nama,' @',(SELECT hhh.nama FROM hirarki hhh WHERE hhh.id = (SELECT hh.parent FROM hirarki hh WHERE hirarki.parent = hh.id))) AS nama ".
				",(SELECT ifnull(ROUND((sum(rh_201311.rh_av)*100/(count(rh_201311.id)*24)),2),0) ".
				"FROM rh_201311 WHERE eq = hirarki.id AND thn=$thn AND bln=$bln) AS av ".
				",(SELECT ifnull(ROUND((sum(rh_201311.rh_re)*100/(count(rh_201311.id)*24)),2),0) ".
				"FROM rh_201311 WHERE eq = hirarki.id AND thn=$thn AND bln=$bln) AS re ".
				",(SELECT hhh.urut FROM hirarki hhh WHERE hhh.id = (SELECT hh.parent FROM hirarki hh WHERE hirarki.parent = hh.id)) AS urut ".
				"FROM hirarki ".
				"LEFT JOIN rh_201311 ON hirarki.id = rh_201311.eq ".
				"LEFT JOIN equip ON hirarki.id = equip.unit_id AND equip.kode LIKE (SELECT kode FROM cat_equip WHERE cat_equip.id=$cat) ".
				"WHERE hirarki.flag=$cat ".
				"GROUP BY hirarki.id ORDER BY urut,init ASC;";
		$query = $this->db->query($sql,array($thn,$bln,$cat));
		return $query->result();
	}
	
	function get_avre_sthn_eq($thn, $cat)	{//  count(id) AS jmleq 
		/*
		$sql =	"SELECT eq ".		
				",ROUND((sum(rh_av)*100/(count(id)*24)),2) AS av,ROUND((sum(rh_re)*100/(count(id)*24)),2) AS re ".
				"FROM rh_201311 WHERE thn=$thn AND cat=$cat GROUP BY eq";
		//*/
		$sql =	"SELECT hirarki.id AS id ".
				",CONCAT(hirarki.init,'@',(SELECT hhh.kode FROM hirarki hhh WHERE hhh.id = (SELECT hh.parent FROM hirarki hh WHERE hirarki.parent = hh.id))) AS kode ".
				",CONCAT(hirarki.nama,', ',equip.nama,' @',(SELECT hhh.nama FROM hirarki hhh WHERE hhh.id = (SELECT hh.parent FROM hirarki hh WHERE hirarki.parent = hh.id))) AS nama ".
				",(SELECT ifnull(ROUND((sum(rh_201311.rh_av)*100/(count(rh_201311.id)*24)),2),0) ".
				"FROM rh_201311 WHERE eq = hirarki.id AND thn=$thn) AS av ".
				",(SELECT ifnull(ROUND((sum(rh_201311.rh_re)*100/(count(rh_201311.id)*24)),2),0) ".
				"FROM rh_201311 WHERE eq = hirarki.id AND thn=$thn) AS re ".
				",(SELECT hhh.urut FROM hirarki hhh WHERE hhh.id = (SELECT hh.parent FROM hirarki hh WHERE hirarki.parent = hh.id)) AS urut ".
				"FROM hirarki ".
				"LEFT JOIN rh_201311 ON hirarki.id = rh_201311.eq ".
				"LEFT JOIN equip ON hirarki.id = equip.unit_id AND equip.kode LIKE (SELECT kode FROM cat_equip WHERE cat_equip.id=$cat) ".
				"WHERE hirarki.flag=$cat ".
				"GROUP BY hirarki.id ORDER BY urut,init ASC;";
		//echo "sql: $sql<br/>";
		$query = $this->db->query($sql,array($thn,$cat));
		return $query->result();
	}
	
	function get_avre_ytd_eq($bln, $thn, $cat)	{//  count(id) AS jmleq 
		/*
		$sql =	"SELECT eq ".		
				",ROUND((sum(rh_av)*100/(count(id)*24)),2) AS av,ROUND((sum(rh_re)*100/(count(id)*24)),2) AS re ".
				"FROM rh_201311 WHERE thn=$thn AND bln<=$bln AND cat=$cat GROUP BY eq";
		//*/
		$sql =	"SELECT hirarki.id AS id ".
				",CONCAT(hirarki.init,'@',(SELECT hhh.kode FROM hirarki hhh WHERE hhh.id = (SELECT hh.parent FROM hirarki hh WHERE hirarki.parent = hh.id))) AS kode ".
				",CONCAT(hirarki.nama,', ',equip.nama,' @',(SELECT hhh.nama FROM hirarki hhh WHERE hhh.id = (SELECT hh.parent FROM hirarki hh WHERE hirarki.parent = hh.id))) AS nama ".
				",(SELECT ifnull(ROUND((sum(rh_201311.rh_av)*100/(count(rh_201311.id)*24)),2),0) ".
				"FROM rh_201311 WHERE eq = hirarki.id AND thn=$thn AND bln<=$bln) AS av ".
				",(SELECT ifnull(ROUND((sum(rh_201311.rh_re)*100/(count(rh_201311.id)*24)),2),0) ".
				"FROM rh_201311 WHERE eq = hirarki.id AND thn=$thn AND bln<=$bln) AS re ".
				",(SELECT hhh.urut FROM hirarki hhh WHERE hhh.id = (SELECT hh.parent FROM hirarki hh WHERE hirarki.parent = hh.id)) AS urut ".
				"FROM hirarki ".
				"LEFT JOIN rh_201311 ON hirarki.id = rh_201311.eq ".
				"LEFT JOIN equip ON hirarki.id = equip.unit_id AND equip.kode LIKE (SELECT kode FROM cat_equip WHERE cat_equip.id=$cat) ".
				"WHERE hirarki.flag=$cat ".
				"GROUP BY hirarki.id ORDER BY urut,init ASC;";
		//echo "sql: $sql<br/>";
		$query = $this->db->query($sql,array($thn,$bln,$cat));
		return $query->result();
	}
	
	function get_avre_2th($cat, $thn, $thnm1)	{
		$sql =	"SELECT bln AS b, DATE_FORMAT(tgl,'%b') AS m ".
				",ROUND(ifnull(sum(rh_av)*100/(SELECT DAY(LAST_DAY(tgl))*24*(select count(*) from hirarki where flag = $cat and thn=$thn)),0),2) AS av2014 ".
				",ROUND(ifnull(sum(rh_re)*100/(SELECT DAY(LAST_DAY(tgl))*24*(select count(*) from hirarki where flag = $cat and thn=$thn)),0),2) AS re2014 ".
				",ROUND(ifnull(sum(rh_av)*100/(SELECT DAY(LAST_DAY(tgl))*24*(select count(*) from hirarki where flag = $cat and thn=$thnm1)),0),2) AS av2013 ".
				",ROUND(ifnull(sum(rh_re)*100/(SELECT DAY(LAST_DAY(tgl))*24*(select count(*) from hirarki where flag = $cat and thn=$thnm1)),0),2) AS re2013 ".
				"FROM rh_201311 ".
				"WHERE cat=$cat and (thn='$thn' or thn='$thnm1') ".
				"GROUP BY bln ORDER BY bln ASC";
		$query = $this->db->query($sql);
		return $query->result();
	}
}

/* End of file option.php */
/* Location: ./application/models/option.php */
