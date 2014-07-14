<?php

class Waktudown extends CI_Model {

	function get_waktudown($id,$downt,$downj,$upt,$upj,$flag=0,$event,$edit,$idid,$da,$db,$ua,$ub)    {
		//echo "id: $id, down: $downt, $downj,<br/>up: $upt,$upj,<br/>flag: $flag,<br/>event: $event,edit: $edit<br/>,".
		//	 "$idid, da: $da, db: $db, ua: $ua, ub: $ub<br/>";
		
		$query = $this->db->select('id,downt AS dt,downj AS dj,upt AS ut,upj AS uj,event AS ev');
		$query = $this->db->where('eqid',$id);
		$query = $this->db->where("downt BETWEEN '$da' AND '$db'");
		$query = $this->db->where("upt BETWEEN '$ua' AND '$ub'");
		if ($edit)		$query = $this->db->where_not_in('id',implode(',',$idid));
		$query = $this->db->get('waktudown');
		/*
		$sql =	"SELECT id,downt,downj,upt,upj,event FROM waktudown WHERE eqid='{$id}' ".
				"AND (downt BETWEEN '$da' AND '$db' OR upt BETWEEN '$ua' AND '$ub') ";
		//if ($edit) $sql .= "AND id NOT IN (".implode(',',$idid).")";
		$query = $this->db->query($sql);
					//$aksi = array();
		if ($query->num_rows() > 0)	{
			foreach ($query->result() as $row)	{
				print_r($row); echo "<br/>";
			}
		}
		//*/

		$ii=0;
		foreach ($query->result() as $row) {
			$dt[$ii]  = $row->dt;	$dj[$ii]  = $row->dj;
			$ut[$ii]  = $row->ut;	$uj[$ii]  = $row->uj;
			$ev[$ii]  = $row->ev;
			$ii++;
		}
		
		
		if ($flag==0)	{	// flag = 0 jika 
			$dt[]  = $downt;	$dj[]  = $downj;
			$ut[]  = $upt;		$uj[]  = $upj;
			$ev[]  = $event;
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
}

/* End of file waktudown.php */
/* Location: ./application/models/waktudown.php */
