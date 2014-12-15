<?php

class Ulist extends CI_Model {

	function get_ulist_all()	{
		$this->db->select('id,nama,kode,urut');
		$this->db->order_by('urut', 'ASC');
		$query = $this->db->get('unitlist');
		
		return $query->result();
	}
	
	function get_ulist($id)	{
		$this->db->select('id,nama,kode,urut,ket');
		//$this->db->order_by('urut', 'ASC');
		$this->db->where('id', $id);
		$query = $this->db->get('unitlist');
		
		return $query->result();
	}

	function update_equip($data,$id)	{
		$this->db->set($data);
		$this->db->where('id', $id);
		return $this->db->update('equip');
	}
	
	function ins_equip($data)	{
		$this->db->trans_start();
		$this->db->insert('equip', $data); 
		$insert_id = $this->db->insert_id();
		$this->db->trans_complete();
		return  $insert_id;
		/*
		$this->db->set($data);
		return $this->db->insert('hirarki');
		//*/
	}
	
	function del_equip($ids)	{
		$this->db->where_in('id', $ids);
		$this->db->delete('equip');
		
		return $ids;
	}
}


/* End of file option.php */
/* Location: ./application/models/option.php */
