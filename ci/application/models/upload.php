<?php

class Upload extends CI_Model {

	function insert_bpm3($data)    {

		$sql =	"SELECT ordertype AS kode,pmtype,count(*) AS wo ".
				",ROUND((100*count(*)/(select count(*) from sap )),2) as persen ".
				"FROM sap GROUP BY ordertype ORDER BY ordertype ASC,pmtype ASC";
		$query = $this->db->query($sql);
		
		return $query->result();
    }

}

/* End of file upload.php */
/* Location: ./application/models/upload.php */
