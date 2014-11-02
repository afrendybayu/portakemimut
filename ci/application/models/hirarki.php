<?php

class Hirarki extends CI_Model {
	function __construct()	{
        parent::__construct();
    }

	/*function c_hirarki($lvl)    {
		$this->db->select('id,flag');
		$this->db->where('level',$lvl);
		$query = $this->db->get('hirarki');
		return $query->result();
		
	}*/

	function get_unit_group($gr)    {

		$sql =	"select h.id,h.nama,equip.nama as unit,h.init as init ".
				 ",(select hhh.kode from hirarki hhh where hhh.id = (select hh.parent from hirarki hh where h.parent = hh.id)) as hlok ".
				 ",(select hhh.nama from hirarki hhh where hhh.id = (select hh.parent from hirarki hh where h.parent = hh.id)) as lok ".
				 ",(select hhh.urut from hirarki hhh where hhh.id = (select hh.parent from hirarki hh where h.parent = hh.id)) as urut ".
				 "FROM hirarki h ".
				 "LEFT JOIN equip ON h.id = equip.unit_id and equip.kode like (select kode from cat_equip where id=$gr) ".
				 "where h.level = 3 and h.flag = $gr ".
				 "order by urut,nama asc";
		//echo "sql: $sql";
		
		$query = $this->db->query($sql);
		
		return $query->result();
    }
	
	function get_parent() {
		//*
		$this->db->select('id,nama,kode');
		//$this->db->where('level',1);
		$this->db->where('parent',0);
		$this->db->order_by('nama','asc');
		$query = $this->db->get('hirarki');
		return $query->result();
		//*/
		/*
		$sql = "select id,nama,kode from hirarki where parent=0 order by nama asc";
		$query = $this->db->query($sql);
		return $query->result();
		//*/
	}
	
	function get_parent_all(){
		$sql =	"SELECT 0 AS id, 'ALL' AS nama, 'ALL' AS kode UNION ".
				"(SELECT id, nama, kode FROM hirarki WHERE parent=0 ORDER BY nama ASC)";
		//echo "sql: $sql<br/>";
		$query = $this->db->query($sql);
		return $query->result();
	
	}
	
	function get_unit(){
		$sql = "select h3.id as id_unit, h1.nama as lokasi, h1.id as id_lokasi, h3.nama as unit 
				from hirarki h1
					inner join hirarki h2 on h1.id = h2.parent
					inner join hirarki h3 on h2.id = h3.parent;";
		$query = $this->db->query($sql);
		return $query->result();
	
	}
	
	function get_flag($unit){
		$this->db->select('flag');
		$this->db->where('id', $unit);
		$query = $this->db->get('hirarki');
		
		return $query->result();
	}
	
	function get_hirarki($parent){
		
		/*
		if ($parent==0)	{
			//$sql = "SELECT id,SUBSTRING(nama FROM LOCATE(' ',nama)) AS nama 
			//		FROM hirarki WHERE parent = $parent
			//		ORDER BY urut ASC";
		}
		else {
			$sql = "SELECT id,nama FROM hirarki WHERE parent = $parent
					ORDER BY nama ASC";
		}
		
		$sql =	"SELECT h.id,h.nama,IFNULL(h.kode,'') AS kode,h.parent,h.rhinit, IFNULL(h.urut,'') AS urut, 
				IFNULL(h.funcloc,'') AS funcloc,h.flag,IFNULL(GROUP_CONCAT(eq.id),'') AS eqid, 
				CASE WHEN eq.id>0 THEN 'u' ELSE 'h' END AS flag,'false' AS leaf 
				FROM hirarki h LEFT JOIN equip eq ON eq.unit_id = h.id 
				WHERE parent = $parent GROUP BY id
				ORDER BY urut ASC, nama ASC";	//
		//*/
		$sql =	"SELECT h.id,h.nama,IFNULL(h.kode,'') AS kode,h.parent,h.rhinit, IFNULL(h.urut,'') AS urut, 
				IFNULL(h.funcloc,'') AS funcloc,h.flag,IFNULL(GROUP_CONCAT(eq.id),'') AS eqid, 
				CASE WHEN eq.id>0 THEN 'u' ELSE 'h' END AS flag,
				CASE WHEN hh.id>0 THEN 'false' ELSE 'true' END AS leaf
				FROM hirarki h LEFT JOIN equip eq ON eq.unit_id = h.id 
				LEFT JOIN hirarki hh  ON hh.parent = h.id 
				WHERE h.parent = $parent GROUP BY h.id
				ORDER BY urut ASC, nama ASC";
		//echo "sql: $sql<br/>";
		$query = $this->db->query($sql);
		return $query;
		
		//$this->db->select('id, nama, level');
		//$this->db->where ('parent',$parent);
		//$this->db->order_by('nama', 'asc'); 
		//$query = $this->db->get('hirarki');
		
		//return $query;
	}
	
	function get_hirarki_equip($parent){
		/*
		$sql = "SELECT eq.id,eq.nama,eq.tag,ce.nama AS cat
				FROM equip  eq
				LEFT JOIN cat_equip ce ON ce.id = eq.cat
				WHERE unit_id = $parent
				ORDER BY nama ASC";
		//*/
		$sql =	"SELECT eq.id,CONCAT('[',eq.tag,'] ',eq.nama) AS nama,
				eq.tag,eq.unit_id AS parent, ce.id AS idcat,ce.nama AS cat,eq.kode,IFNULL(eq.rhinit,0) AS rhinit,
				'e' AS flag, 'true' AS leaf
				FROM equip  eq
					LEFT JOIN cat_equip ce ON ce.id = eq.cat
				WHERE unit_id = $parent
				ORDER BY nama ASC";
		//echo "sql: $sql<br/>";
		$query = $this->db->query($sql);
		return $query;
		/*
		$this->db->select('id, nama, tag');
		$this->db->where('unit_id',$parent);
		$this->db->order_by('nama','asc');
		$query = $this->db->get('equip');
		
		return $query;
		//*/
	}
	
	function create_hirarki_new(){
		$hir = json_decode(file_get_contents('php://input'));
		$sql = array(
					'nama' 		=> $hir->nama,
					'parent' 	=> $hir->parentId,
					'level'		=> $hir->level +1,
					
				);
		// $this->db->where('id',$ohin->id);
		$this->db->insert('hirarki', $sql);
	
	
	}

	function upd_hirarki($data,$id)	{
		$this->db->set($data);
		$this->db->where('id', $id);
		return $this->db->update('hirarki');
	}

}

/* End of file hirarki.php */
/* Location: ./application/models/hirarki.php */
