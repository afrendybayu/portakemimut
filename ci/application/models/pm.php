<?php

class Pm extends CI_Model {

	function get_pm($id)    {

		$sql =	"SELECT pmlist.eqcat, (SELECT concat ('e',equip.id,'pm',pmlist.id)) as id,
				(select concat ('[',cat_equip.kode,'] ',pmdef.nama)) as nama
				from  pmlist, cat_equip,pmdef,equip
				where `eqcat` IN (equip.cat) AND unit_id=$id
				AND pmlist.eqcat = cat_equip.id
				AND pmdef.id= pmlist.pm
				AND equip.kode= cat_equip.kode
				order by eqcat asc, durasi asc";
		//echo "sql: $sql<br/>";
		$query = $this->db->query($sql);
		
		return $query->result();
    }
	
	function get_pmdef()  {
		$this->db->order_by('durasi', 'asc'); 
		$query = $this->db->get('pmdef');
		
		return $query->result();
    }
	
	function get_pmdefnotin($cat)    {

		$sql =	"SELECT * 
				FROM pmdef
				WHERE durasi NOT IN (
					SELECT pd.durasi
					FROM pmlist pl
					LEFT JOIN pmdef pd ON pl.pm = pd.id
					WHERE pl.eqcat = $cat
				) ORDER BY durasi ASC";
		$query = $this->db->query($sql);
		
		return $query->result();
    }
	
	function get_pmdefcat($cat)    {

		$sql =	"SELECT pl.id,pd.durasi,pd.nama,pd.kode
				FROM pmlist pl
				LEFT JOIN pmdef pd ON pl.pm = pd.id
				WHERE pl.eqcat = $cat
				ORDER BY pd.durasi";
		$query = $this->db->query($sql);
		
		return $query->result();
    }
    
    function get_pmlist_array()	{
		$this->db->select('pd.durasi,pl.eqcat');
		$this->db->join('pmdef pd', 'pd.id = pl.pm', 'left');
		$query = $this->db->get('pmlist pl');
		
		$pl = $query->result();
		$hsl = array();	$k=0;
		if (count($pl)>0)	{
			foreach($pl as $d)	{
				//print_r($d);	echo "<br/>";
				if ($k!=$d->eqcat)	{
					$hsl[$d->eqcat][] = $d->durasi;
				}
			}
		}
		/*
		//echo "fsdf<br/>";
		foreach($hsl as $r)	{
			print_r($r);	echo "<br/>";
		}
		//print_r($query->result());
		//return $query->result();
		//*/
		
		return $hsl;
	}
    
    function set_pmlist($data)	{
		$this->db->trans_start();
		$this->db->insert('pmlist', $data); 
		$insert_id = $this->db->insert_id();
		$this->db->trans_complete();
		return  $insert_id;
	}
	
	function del_pmlist($ids)	{
		$this->db->where_in('id', $ids);
		if ($this->db->delete('pmlist'))	{
			return $ids;
		}
		else {
			return array('id'=>'0');
		}
	}
}

/* End of file pm.php */
/* Location: ./application/models/pm.php */
