<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rCatEquip extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('catequip');
	}
	public function rHirarki()	{
		
		try {
			$parent_id = $this->input->get('node')?:'0';
			//echo $parent_id.'<br>';
			// echo $_GET['node'].'<br>';
			
			$arr = array(); $k=0;
			$hsl = $this->catequip->get_hirarki($parent_id);
			//echo "jml: ".$hsl->num_rows();
			//print_r($hsl);
			//if ($hsl->num_rows() > 0)	{
				foreach ($hsl as $row)	{
					//print_r($row); echo "<br/>";
					$arr[$k]['id'] 		= $row->id;
					$arr[$k]['text'] 	= $row->nama;	//.' '.$row->id;
					$arr[$k]['tipe'] 	= $row->kode;
					if ($row->jml>0)
						$arr[$k]['leaf'] 	= 'false';
					else
						$arr[$k]['leaf'] 	= 'true';
					$k++;
				}
			//}

			$jsonResult = array(
				'success' => true,
				'cateq' => $arr
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
		/*
		$sql = array(
					'nama' 		=> $params->nama,
					'parent' 	=> $params->parentId,
					'level'		=> $params->level +1,
					
				);
		$this->db->where('id',$params->id);
		$this->db->update('hirarki', $sql);
			*/
	}
	
}

/* End of file rLokUnit.php */
/* Location: ./application/controllers/konfig/rLokUnit.php */
