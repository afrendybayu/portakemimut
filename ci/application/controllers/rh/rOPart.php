<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rOPart extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('opart');
	}
	
	public function index()	{
		
		try	{
			$id = $this->input->get('unit')?:'0';

			$s = "SELECT cat FROM equip where unit_id=? order by nama asc";
			//echo "sql: $s<br/>";
			
			$query = $this->db->query($s, $id);

			$cat = array();		//echo "jml:".$query->num_rows()."<br/>";
			if ($query->num_rows() > 0)	{
				foreach ($query->result() as $row)	{
					$cat[] = "cat = '{$row->cat}'";
				}
			}
			//print_r($cat); 
			//echo "dwde";


			$strcat = join(" or ", $cat);
			//print_r($cat); echo "<br/><br/>strcat: $strcat<br/><br/>";
			//*
			$s = "SELECT id,cat,nama FROM opart where $strcat order by cat asc, nama asc";
			$query = $this->db->query($s);
			
			$part = array();
			if ($query->num_rows() > 0)	{
				foreach ($query->result() as $row)	{
					$part[] = $row;
				}
			}
			//*/

			$jsonResult = array(
				'success' => true,
				'opart' => $part
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

	public function rOPdef()	{
		try{
			$hsl = $this->opart->get_opartdef_cat($cat);
			
			$jsonResult = array(
				'success' => true,
				'opdef' => $hsl
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
	
	public function rOPnotdef()	{
		try{
			$cat = $this->input->get('cat')?:'0';
			$hsl = $this->opart->get_opartdefnotin($cat);
			
			$jsonResult = array(
				'success' => true,
				'opdef' => $hsl
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
