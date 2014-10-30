<?php

class Mode extends CI_Model {

	function get_mode_eq($unit)	{
		$sql =	"SELECT md.id, eqcat AS cat, md.nama
				FROM modelist ml
				INNER JOIN modedef md ON md.id = ml.mode
				INNER JOIN equip eq ON eq.unit_id = $unit
				WHERE eq.cat = ml.eqcat
				ORDER BY nama ASC";
		$query = $this->db->query($sql);
		
		return $query->result();
		;
	}

	function get_modedefnotin($cat)    {

		$sql =	"SELECT * 
				FROM modedef
				WHERE kode NOT IN (
					SELECT md.kode
					FROM modelist ml
					LEFT JOIN modedef md ON ml.mode = md.id
					WHERE ml.eqcat = $cat
				) ORDER BY nama ASC";
		$query = $this->db->query($sql);
		
		return $query->result();
    }
	
	function get_modedefcat($cat)    {

		$sql =	"SELECT ml.id,md.nama,md.kode 
				FROM modelist ml 
				LEFT JOIN modedef md ON ml.mode = md.id 
				WHERE ml.eqcat = $cat ORDER BY md.nama";
		$query = $this->db->query($sql);
		
		return $query->result();
    }
    
    function set_modelist($data)	{
		$this->db->trans_start();
		$this->db->insert('modelist', $data); 
		$insert_id = $this->db->insert_id();
		$this->db->trans_complete();
		return  $insert_id;
	}
	
	function del_modelist($ids)	{
		$this->db->where_in('id', $ids);
		if ($this->db->delete('modelist'))	{
			return $ids;
		}
		else {
			return array('id'=>'0');
		}
	}
}

/* End of file pm.php */
/* Location: ./application/models/pm.php */
