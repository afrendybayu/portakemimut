<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class RhSweep extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('hirarki');
		$this->load->model('runninghour');
		$this->load->model('equip');
    }
	public function index()	{
		$awal = $this->input->get('awal') ? $this->input->get('awal') : date('Y-m-d',mktime(0,0,0,8,date('d')-1,2014));
		// $akhir = $this->input->get('akhir') ? $this->input->get('akhir') : date('Y-m-d',mktime(0,0,0,8,date('d')-1,2014));//(mktime(0, 0, 0, date('m')  , date('d')+1, date('Y')));
		$level = 3;
		echo 'tgl awal ==> '.$awal;//.' dan tgl akhir ==> '.$akhir.'</br>'; 
		$query = $this->hirarki->c_hirarki($level);
		
		foreach($query as $row){
			$d_query = $this->runninghour->get_rhunit($row->id,$awal);
			if (count($d_query) == 0){
				$eq_query = $this->equip->get_equip_gconcat($row->id);
				foreach ($eq_query as $req){
					$d_input = array(
						'eq'=> $row->id , 
						'rh'=> 24,
						'tgl'=> $awal,
						'cat'=> $row->flag,
						'flag'=> $req->eq,
						'rh_av'=> 24,
						'rh_re'=> 24,
						'thn'=> date('Y',strtotime($awal)),
						'bln'=> date('m',strtotime($awal))
					);
					$this->runninghour->insert_rh($d_input);
					// print_r($d_input);
					// echo '</br>';
				}
			}
			else {
				 echo 'Data Telah terisi </br>';
			}//*/
		}
	}
}

?>
