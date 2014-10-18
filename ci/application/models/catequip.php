<?php

class Catequip extends CI_Model {

	function get_tipe($kode)	{
		$this->db->select('id,nama');
		$this->db->where('parent',0);
		$this->db->order_by('urut');
		
		if ($kode!='')	{
			$this->db->where('id',$kode);
		}
		
		$query = $this->db->get('cat_equip');
		
		return $query->result();
	}
	
	function get_tipe_id()	{
		$this->db->select('id');
		$this->db->where('parent',0);
		$this->db->order_by('urut');

		$query = $this->db->get('cat_equip',1,0);
		$hsl = $query->result();
		
		return $hsl[0]->id;
	}

	function get_tipe_kode($id)	{
		$this->db->select('kode');
		$this->db->where('parent',0);
		$this->db->order_by('urut');
		$this->db->where('id',$id);

		$query = $this->db->get('cat_equip');
		$hsl = $query->result();
		
		return $hsl[0]->kode;
	}
	
	function get_hirarki($parent){
		
		$sql = "SELECT ci.id,ci.nama,ci.kode,(select count(*) from cat_equip ce where ce.parent = ci.id) as jml
				FROM cat_equip ci
				where parent = $parent";
		//echo "sql: $sql<br/>";
		$query = $this->db->query($sql);
		return $query->result();
	}
}

/* End of file catequip.php */
/* Location: ./application/models/catequip.php */
