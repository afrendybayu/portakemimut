<?php

class Waktudown extends CI_Model {

	function get_waktudown($id,$downt,$downj,$upt,$upj,$flag=0,$event,$edit,$idid,$da,$db,$ua,$ub)    {
		/*
		$query = $this->db->select('id,downt AS dt,downj AS dj,upt AS ut,upj AS uj,event AS ev');
		$query = $this->db->where('eqid',$id);
		$query = $this->db->where("(downt BETWEEN '$da' AND '$db' OR upt BETWEEN '$ua' AND '$ub')");
		//$query = $this->db->where("downt BETWEEN '$da' AND '$db'");
		//$query = $this->db->where("upt BETWEEN '$ua' AND '$ub'");
		if ($edit)		$query = $this->db->where_not_in('id',implode(',',$idid));
		$query = $this->db->get('waktudown');
		//*/
		//*
		$sql =	"SELECT id,downt AS dt,downj AS dj,upt AS ut, upj AS uj,event AS ev FROM waktudown WHERE eqid='{$id}' ".
				"AND (downt BETWEEN '$da' AND '$db' OR upt BETWEEN '$ua' AND '$ub') ";
		if ($edit) $sql .= "AND id NOT IN (".implode(',',$idid).")";
		$query = $this->db->query($sql);
		
		/*
		//$aksi = array();
		if ($query->num_rows() > 0)	{
			foreach ($query->result() as $row)	{
				print_r($row); echo "<br/>";
			}
		}
		//*/

		$ii=0;
		//echo "<br/><br/>hasil waktudown "; print_r($query->result()); echo "<br/>";
		foreach ($query->result() as $row) {
			$dt[$ii]  = $row->dt;	$dj[$ii]  = $row->dj;
			$ut[$ii]  = $row->ut;	$uj[$ii]  = $row->uj;
			$ev[$ii]  = $row->ev;
			$ii++;
			//echo "i: $ii<br/>";
		}
		
		
		if ($flag==0)	{	// flag = 0 jika 
			//echo "<br/>masuk ke flag 0<br/>";
			$dt[$ii]  = $downt;		$dj[$ii]  = $downj;
			$ut[$ii]  = $upt;		$uj[$ii]  = $upj;
			$ev[$ii]  = $event;
		}
		
		$w->dt=$dt;		 $w->dj = $dj;
		$w->ut=$ut;		 $w->uj = $uj;
		$w->ev=$ev;
		//print_r($w);
		return $w;
    }
    
    function insert_waktudown($event, $data, $data_ex)	{
		if ($event==1)	{
			$this->db->set($data);
		}
		else {
			$this->db->set(array_merge($data, $data_ex));
		}
		return $this->db->insert('waktudown');
	}
	
	function get_waktudown_limit($n)	{
		$query = $this->db->select('id,eqid AS eq');
		$query = $this->db->get('waktudown',$n,0);
		
		//print_r($query->result());
		return $query->result();
	}
	
	function get_waktudown_equip($idid)	{
		//$names = array('Frank', 'Todd', 'James');
		//$this->db->where_in('username', $names);
		//print_r($idid);
		
		
		$query = $this->db->select('id,eqid AS eq, unit_id');
		$query = $this->db->where_in('id',$idid);
		$query = $this->db->get('waktudown');
		
		return $query->result();
	}
	
	function update_waktudown($event, $id, $data, $data_ex)	{
		if ($event==1)	{
			$this->db->set($data);
		}
		else {
			$this->db->set(array_merge($data, $data_ex));
		}
		$this->db->where('id', $id);
		return $this->db->update('waktudown');
	}

	function delete_waktudown($ids)	{
		
		$this->db->where_in('id', $ids);
		if ($this->db->delete('waktudown'))	{
		//*
			$hsl = array();
			foreach($ids as $id)	{
				array_push($hsl, array('id' => $id));
			}
			return $hsl;
		//*/
		}
		else {
			return array('id'=>'0');
		}
		
	}
}

/* End of file waktudown.php */
/* Location: ./application/models/waktudown.php */
