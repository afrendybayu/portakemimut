<?php

class Cost extends CI_Model {

	function get_ordercost($thn)    {

		$sql =	"SELECT objid AS otipe, objtype AS `desc`, count(*) AS jml ".
				",ROUND(sum(totescost),2) AS plstcost,ROUND(sum(intcost),2) AS plincost,ROUND(sum(totplancost),2) AS tplcost ".
				",ROUND(sum(totmatcost),2) AS taccost,ROUND(sum(intcost),2) AS acincost ".
				",ROUND(sum(totservcost),2) AS srvcost,ROUND(sum(actcost),2) AS acstcost ".
				"FROM sap WHERE totplancost>0 AND YEAR(planstart)=$thn and objid!='' GROUP BY otipe;";
		//echo "sql: $sql";
		
		$query = $this->db->query($sql);
		
		return $query->result();
    }
}

/* End of file waktudown.php */
/* Location: ./application/models/waktudown.php */
