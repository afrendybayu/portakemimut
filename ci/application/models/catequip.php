<?php

class Catequip extends CI_Model {

	function get_tipe($kode)	{
		$this->db->select('id,nama, nama as text');
		$this->db->where('parent',0);
		$this->db->order_by('urut');
		
		if ($kode!='')	{
			$this->db->where('id',$kode);
		}
		
		$query = $this->db->get('cat_equip');
		
		return $query->result();
	}
	
	function upd_cathir($data,$id)	{
		$this->db->set($data);
		$this->db->where('id', $id);
		return $this->db->update('cat_equip');
	}
	
	function set_cathir($data)	{
		$this->db->trans_start();
		$this->db->insert('cat_equip', $data); 
		$insert_id = $this->db->insert_id();
		$this->db->trans_complete();
		return  $insert_id;
	}
	
	function del_cathir($ids)	{
		//*
		$sql = "SELECT COUNT(*) AS jml FROM equip WHERE cat='$ids'";
		//echo "sql: $sql<br/>";
		$query = $this->db->query($sql);
		$hsl = $query->result();
		//print_r($hsl);
		//echo "jml: ".$hsl[0]->jml;
		
		if ($hsl[0]->jml==0)	{
			//echo "masuk sini";
			//*
			$this->db->where_in('id', $ids);
			if ($this->db->delete('cat_equip'))	{
				return array('id'=>$ids,'jml'=>$hsl[0]->jml);
			}
			else {
				return array('id'=>'0');
			}
			//*/
			//return array('id'=>$ids);
		}
		else {
			//echo "ada isinya";
			return array('jml'=>$hsl[0]->jml);
		}
		//*/
	}
	
	function del_cathireq($data,$id)	{
		$this->db->where('id',$id);
		$this->db->update('equip',$data);
	}
	
	function get_tipe1_cat($id)	{
		$this->db->select('id,nama,kode,ket');
		$this->db->where('id', $id);
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
	
	function get_tipeunit_id()	{
		$this->db->select('id');
		//$this->db->where('parent',0);
		$this->db->order_by('urut');

		$query = $this->db->get('unitlist',1,0);
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
	
	function get_hirarki($parent,$all){
		
		$sall = "";
		if ($all==="y")	{
			$sall = "SELECT -1 AS id,'ALL' AS text,'ALL' as tipe,'ALL' as ket,0 AS parent,0 As jml,'false' AS leaf UNION ";
		}
		
		$sql = "$sall SELECT ci.id,ci.nama AS text,ci.kode AS tipe, ci.ket,parent
				,(select count(*) from cat_equip ce where ce.parent = ci.id) as jml
				,(SELECT CASE WHEN jml>0 THEN 'false' ELSE 'true' END) AS leaf
				FROM cat_equip ci
				where parent = $parent";
		//echo "sql: $sql<br/>";
		$query = $this->db->query($sql);
		//echo "jml: {$query->num_rows()}<br/>";
		//return $query->result();
		return $query->result();
	}
}

/* End of file catequip.php */
/* Location: ./application/models/catequip.php */

