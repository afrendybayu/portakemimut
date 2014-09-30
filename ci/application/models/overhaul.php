<?php
class Overhaul extends CI_Model {
 
    function __construct()    {
        parent::__construct();
		
    }

	
	function ohTahun($thn)	{

		/*
		$sql = "select o.unit, h.nama, 'wwe' as lok from overhaul o
				LEFT JOIN hirarki h on o.unit = h.id where thn=$thn";
		//*/
		$sql = "call overhaul(?)";
		//echo "sql: $sql<br/>";
		$query = $this->db->query($sql, $thn);
		return $query->result();
	}
	
	function ohEquip(){
		$sql = "select e.id id_eq, concat(pd.ket,' ',e.kode,' ',e.tag,' ',h.init,' ',h2.nama) eq, h.id id_unit, oh.id id_oh
					from equip e inner join hirarki h on e.unit_id = h.id
						inner join hirarki h1 on h.parent = h1.id
						inner join hirarki h2 on h1.parent = h2.id
						inner join pmlist pl on pl.eqcat = e.cat
						inner join pmdef pd on pd.id = pl.pm
						inner join ohdef oh on oh.nama = pd.ket
					where pd.ket is not null";
		$query = $this->db->query($sql);
		return $query->result();
	
	}
	
	function set_ohlist(){
		$ohin = json_decode(file_get_contents('php://input'));
		$sql = array(
					'tglplan' 		=> $ohin->tglplan,
					'durasiplan' 	=> $ohin->durasiplan,
					'equip'			=> $ohin->id_equip,
					'ohcat'			=> $ohin->oh,
					'wo'			=> $ohin->wo
				);
		return $this->db->insert('ohlist', $sql);
	
	}
	
	function get_ohlist(){
		$sql = "select ol.id,ol.wo, concat(od.nama,' ',eq.kode,' ',eq.tag,' ',h1.init,' ',h3.nama) equip, ol.tglplan, ol.durasiplan
					from ohlist ol
						inner join equip eq on ol.equip = eq.id
						inner join ohdef od on ol.ohcat = od.id 
						inner join hirarki h1 on eq.unit_id = h1.id
						inner join hirarki h2 on h1.parent = h2.id
						inner join hirarki h3 on h2.parent = h3.id
					where year(ol.tglplan) = year(now())
					order by ol.tglplan desc";
		$query = $this->db->query($sql);
		return $query->result();
	}
	/*
	function jmlDataTime($waktu,$kapal){
		$sql = "select data_time from data where data_time = ? and id_ship= ? ";
		$query = $this->db->query($sql, array($waktu , $kapal));
		return $query;
	}
	
	function parsingRef($ship){
		$sql = "SELECT id_tu FROM parsing_ref where id_ship = ? and urutan_data_monita > 1 order by urutan_data_monita ";
		$query = $this->db->query($sql, array($ship));
		return $query;
	}
	*/
		

}
?>
