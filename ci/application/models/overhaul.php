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
		
		try {
			/*
			$sql = array(
				'tglplan' 		=> $ohin->tglplan,
				'durasiplan' 	=> $ohin->durasiplan,
				'equip'			=> $ohin->id_equip,
				'ohcat'			=> $ohin->oh,
				'wo'			=> $ohin->wo
			);
			$hsl = $this->db->insert('ohlist', $sql);
			//*/
			//$this->db->trans_start(TRUE);
			
			$sql = "INSERT IGNORE INTO ohlist (tglplan,durasiplan,equip,ohcat,wo) 
					VALUES ('{$ohin->tglplan}','{$ohin->durasiplan}',
					'{$ohin->id_equip}','{$ohin->oh}','{$ohin->wo}')";
			//echo "sql: $sql<br/>";
			$query = $this->db->query($sql);
			
			if (!$query) {
			  // if query returns null
				$msg = $this->db->_error_message();
				$num = $this->db->_error_number();

				echo "Error(".$num.") ".$msg;
				
				//$this->load->view('customers_edit_view',$data);
			} 
			
			if ($this->db->_error_message())	{
				echo "ERRRRRORRRR ".$this->db->_error_number();
			}
			
			$hsl = 0;
		}
		catch(Exception $e) {
			$hsl = -1;
		}
		
		return $hsl;
	
	}
	
	function get_ohlist($thn){
		/*
		$sql = "select ol.id,ol.wo, h3.nama lokasi, h1.nama unit, eq.id id_equip,
				concat(od.nama,' [',od.ket,'] ',eq.kode,' ',eq.tag,' ',h1.init,' ',h3.nama) equip,
				od.nama oh, ol.tglplan, ol.durasiplan, ol.ket
					from ohlist ol
						inner join equip eq on ol.equip = eq.id
						inner join pmdef od on ol.ohcat = od.durasi
						inner join hirarki h1 on eq.unit_id = h1.id
						inner join hirarki h2 on h1.parent = h2.id
						inner join hirarki h3 on h2.parent = h3.id
					where year(ol.tglplan) = $thn
					order by ol.tglplan desc";
		//*/
		$sql = "SELECT ol.id,ol.wo, SUBSTRING(h3.nama FROM LOCATE(' ',h3.nama)) lokasi, h1.nama unit, eq.id id_equip,
				concat(od.nama,' ',eq.kode,' ',eq.tag) equip,
				od.nama oh, ol.tglplan, ol.durasiplan, ol.ket
					FROM ohlist ol
						INNER JOIN equip eq ON ol.equip = eq.id
						INNER JOIN pmdef od ON ol.ohcat = od.durasi
						INNER JOIN hirarki h1 ON eq.unit_id = h1.id
						INNER JOIN hirarki h2 ON h1.parent = h2.id
						INNER JOIN hirarki h3 ON h2.parent = h3.id
					WHERE YEAR(ol.tglplan) = $thn
					ORDER BY ol.tglplan DESC";
		$query = $this->db->query($sql);
		return $query->result();
	}
	
	function update_ohlist(){
		$ohin = json_decode(file_get_contents('php://input'));
		$sql = array(
					'tglplan' 		=> $ohin->tglplan,
					'durasiplan' 	=> $ohin->durasiplan,
					'equip'			=> $ohin->id_equip,
					'ohcat'			=> $ohin->oh,
					'wo'			=> $ohin->wo,
					'ket'			=> $ohin->ket
					
				);
		$this->db->where('id',$ohin->id);
		$this->db->update('ohlist', $sql);
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
		
	function proc_overhaul($thn){
		$q = $this->db->query("call ohexcel_overhaul($thn)");
		return $q->result_array();
	}
}
?>
