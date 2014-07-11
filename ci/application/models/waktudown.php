<?php

class waktudown extends CI_Model {
	//function get_event($id,$downt,$downj,$upt,$upj,$flag=0,$event,$edit,$idid,$da,$db,$ua,$ub)    {
	function cek_tole_hari()	{
		$query = $this->db->select('nilai');
		$query = $this->db->where('nama','tole_hari');
		$query = $this->db->get('options');
		
		$hsl = $query->result();
		return $hsl[0]->nilai;
	}	
	
	function get_event($id,$downt,$downj,$upt,$upj,$flag=0,$event,$edit,$idid,$da,$db,$ua,$ub)    {
		echo "id: $id, down: $downt, $downj,<br/>up: $upt,$upj,<br/>flag: $flag,<br/>event: $event,edit: $edit<br/>,".
			 "$idid, da: $da, db: $db, ua: $ua, ub: $ub<br/>";
		//return $id;
		//*
        $query = $this->db->select('id,downt,downj,upt,upj,event');
        $query = $this->db->where('eqid',$id);
        $query = $this->db->where("downt BETWEEN $da AND $db");
        $query = $this->db->or_where("upt BETWEEN $ua AND $ub");
		//if ($edit)		$query = $this->db->where_not_in('id',implode(',',$idid));
		$query = $this->db->get('waktudown');

        return $query->result();
        //*/
    }
    
    
}

/* End of file waktudown.php */
/* Location: ./application/models/waktudown.php */
