<?php

class Hirarki extends CI_Model {
	function __construct()	{
        parent::__construct();
    }

	function c_hirarki($lvl)    {
		$this->db->select('id,flag');
		$this->db->where('level',$lvl);
		$query = $this->db->get('hirarki');
		return $query->result();
		
	}

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
	
	function get_unitlokasi($unit){
		$sql = "select  h1.nama as lokasi, h3.nama as unit, concat('l',h1.id,'u', h3.id ) as lok_unit from hirarki h1
				left join hirarki h2 on h1.id = h2.parent
				left join hirarki h3 on h2.id = h3.parent
				where h1.parent = 0 and h1.id = $unit";
		$query = $this->db->query($sql);
		return $query->result();
	
	}
}

/* End of file hirarki.php */
/* Location: ./application/models/hirarki.php */
