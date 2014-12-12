<?php

class Event extends CI_Model {

	function get_listevent()	{
		$this->db->select('id,nama');
		$query = $this->db->get('listevent');
		
		return $query->result();
	}
	
	function get_event($idAr)	{
		/*
		$sql =	"SELECT event.id,down_id AS iddown,eq AS ideql, (SELECT CONCAT (equip.kode,' ',equip.tag)) AS eql,equip.cat ".
				",opart AS idopart, opart.nama AS opart,fm AS idmode, failuremode.nama AS 'mode' ".
				",cause AS idcause, cause.nama AS 'cause',aksi AS idaksi, aksi.nama AS 'aksi' ".
				"FROM event ".
				"LEFT JOIN equip ON event.eq = equip.id ".
				"LEFT JOIN opart ON event.opart = opart.id ".
				"LEFT JOIN aksi ON event.aksi = aksi.id ".
				"LEFT JOIN cause ON event.cause = cause.id ".
				"LEFT JOIN failuremode ON event.fm = failuremode.id ".
				"WHERE down_id IN ($idAr)";
		//*/
		$sql =	"SELECT ev.id, ev.down_id AS iddown, ev.eq AS ideql, ev.opart AS idopart, ev.fm, ev.cause AS idcause, ev.aksi AS idaksi
				,CONCAT(eq.kode,' ',eq.tag) AS eql,ak.nama AS aksi, md.nama AS `mode`, ca.nama AS cause,od.nama AS opart
				FROM event ev
				LEFT JOIN opartdef od ON od.id = ev.opart
				LEFT JOIN equip eq ON eq.id = ev.eq
				LEFT JOIN aksi ak ON ak.id = ev.aksi
				LEFT JOIN cause ca ON ca.id = ev.cause
				LEFT JOIN modedef md ON md.id = ev.fm
				WHERE down_id IN ($idAr)";
		
		//echo "sql: $sql<br/>";
		$query = $this->db->query($sql,$idAr);
		//print_r($query->result());
		return $query->result();
	}
	
	function update_event($data,$id)		{
		$this->db->set($data);
		$this->db->where('id', $id);
		return $this->db->update('event');
	}
	
	function delete_event($id)	{
		
		$this->db->where('id', $id);
		if ($this->db->delete('event'))	{
			return array('id' => $id);
		}
		return array('id' => -1);
	}
	
	function insert_event($data)		{
		$this->db->set($data);
		return $this->db->insert('event');
	}
}

/* End of file option.php */
/* Location: ./application/models/option.php */
