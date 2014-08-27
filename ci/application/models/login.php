<?php
class Login extends CI_Model {
 
    function __construct()
    {
        parent::__construct();
		
    }

	function getLogAuth()
    {
        //$this->db->select('id_ship, modem_id');
		$query = $this->db->get('user');
        return $query;
	}
	
	function ValidLogin($user,$pass){
			
		$this->db->select('nama,akses');
		$this->db->where('userid', $user);
        $this->db->where('pass', $pass);
        $query = $this->db->get('user');
		
		return $query;
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