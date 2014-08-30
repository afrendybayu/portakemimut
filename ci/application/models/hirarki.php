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
		$this->db->select('id,nama,kode');
		$this->db->where('level',1);
		$query = $this->db->get('hirarki');
		return $query->result();
	}
}

/* End of file hirarki.php */
/* Location: ./application/models/hirarki.php */
