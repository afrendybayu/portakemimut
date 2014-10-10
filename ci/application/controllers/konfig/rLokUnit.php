<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rLokUnit extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('hirarki');
	}
	public function rHirarki()	{
		
		try {
			$parent_id = (isset($_GET['node']))?($_GET['node']):0;
			// echo $parent_id.'<br>';
			// echo $_GET['node'].'<br>';
			
			$arr = array(); $k=0;
			$hsl = $this->hirarki->get_hirarki($parent_id);
			if ($hsl->num_rows() > 0)	{
				foreach ($hsl->result() as $row)	{
					//print_r($row); echo "<br/>";
					$arr[$k]['id'] 		= $row->id;
					$arr[$k]['nama'] 	= $row->nama.' '.$row->id;
					// $arr[$k]['level'] 	= $row->level;
					$arr[$k]['leaf'] 	= 'false';
					$k++;
				}
			}
			
			else {
				$hsl1 = $this->hirarki->get_hirarki_equip($parent_id);
				foreach ($hsl1->result() as $row)	{
					$arr[$k]['id'] 		= $row->id;
					$arr[$k]['nama'] 	= '['.$row->tag.'] '.$row->nama .' '.$row->id;
					// $arr[$k]['level'] 	= '';
					$arr[$k]['leaf'] 	= 'true';
					$k++;
				}
			}
			$jsonResult = array(
				'success' => true,
				'lokunit' => $arr
			);
		}
		catch (Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);	
		}
		
		echo json_encode($jsonResult);
	
	}
	
	public function createHirarki(){
		try{
			// $params = json_decode(file_get_contents('php://input'));
			// $sql = insert into hirarki ('nama', 'parent', 'level') values ({$params->});
			$hsl = $this->hirarki->create_hirarki_new();
			// echo 'succeed';
			
		}
		catch (Exception $e){
			// ech`o 'failed';
		}
	
	}
	
	public function updateHirarki(){
		$params = json_decode(file_get_contents('php://input'));
		
		$sql = array(
					'nama' 		=> $params->nama,
					'parent' 	=> $params->parentId,
					'level'		=> $params->level +1,
					
				);
		$this->db->where('id',$params->id);
		$this->db->update('hirarki', $sql);
			
	}
	
}

/* End of file rLokUnit.php */
/* Location: ./application/controllers/konfig/rLokUnit.php */