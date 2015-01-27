<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Model1 extends CI_Model {
	function ohexcel_overhaul(){
		$q = $this->db->get('overhaul');
		return $q->result_array();
	}
	function ohexcel_hirarki(){
		$q = $this->db->get('hirarki');
		return $q->result_array();
	}
	function ohexcel_options(){
		$q = $this->db->get('options');
		return $q->result_array();
	}
	function proc_overhaul(){
		$q = $this->db->query('call ohexcel_overhaul()');
		return $q->result_array();
	}
}
