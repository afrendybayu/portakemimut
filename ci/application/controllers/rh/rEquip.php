<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rEquip extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('equip');
	}
	
	
	public function index()	{
		
		try	{
			$id = $this->input->get('unit')?:'0';
			
			$s = "SELECT id AS idt,(SELECT CONCAT(kode,' ',tag)) AS nama,cat ".
				 "FROM equip WHERE unit_id=? ORDER BY nama ASC";
			
			$query = $this->db->query($s, $id);
			
			
			$isi = array();	//$jml=0;
			if ($query->num_rows() > 0)	{
				foreach ($query->result() as $row)	{
					//print_r($row); echo "<br/>";
					$isi[] = $row;
					//$isi[$jml]['nama'] = $row->kode." ".$row->tag;
					//$jml++;
				}
			}

			$jsonResult = array(
				'success' => true,
				'equip' => $isi
			);
		}
		catch (Exception $e)	{
			 $jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		//$this->load->view('welcome_message');
		echo json_encode($jsonResult);
	}

	public function rEqcat()	{
		try{
			$cat = $this->input->get('cat')?:'';
			$hsl = $this->equip->get_equipcat($cat);
			
			$jsonResult = array(
				'success' => true,
				'eqlist' => $hsl
			);
		}
		catch(Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		echo json_encode($jsonResult);
	}

}
