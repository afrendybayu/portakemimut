<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class RhSweep extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('runninghour');
		$this->load->model('equip');
    }
	public function index()	{
		$awal = $this->input->get('awal') ? $this->input->get('awal') : date('Y-m-d',mktime(0,0,0,date('m'),date('d')-1,date('Y')));
		$akhir = $this->input->get('akhir') ? $this->input->get('akhir') : date('Y-m-d',mktime(0,0,0,date('m'),date('d')-1,date('Y')));//(mktime(0, 0, 0, date('m')  , date('d')+1, date('Y')));

		$interval =(strtotime($akhir) - strtotime($awal))/(3600*24);
		
		for ($i=0; $i<=$interval; $i++){
			$tgl_mulai = date('Y-m-d',strtotime($awal.'+ '.$i.' days'));
			echo 'isi data RH di tanggal :'.$tgl_mulai.'<br>';
			$hsl = $this->equip->get_equip_gconcat();
			
			foreach($hsl as $row){
				$d_query = $this->runninghour->get_rhunit($row->unit_id,$tgl_mulai);
				// echo count($d_query);
				if (count($d_query)== 0){
					// echo ' ini di '.$tgl_mulai.'</br>';
					//*
					$d_input = array(
						'eq'=> $row->unit_id , 
						'rh'=> 24,
						'tgl'=> $tgl_mulai,
						'cat'=> $row->flag,
						'flag'=> $row->eq,
						'rh_av'=> 24,
						'rh_re'=> 24,
						'thn'=> date('Y',strtotime($tgl_mulai)),
						'bln'=> date('m',strtotime($tgl_mulai))
					);
					
					//*/
					$jsonResult = array(
						'success' => true,
						'rh' => $d_input
					);
					echo json_encode($jsonResult).'<br>';
					//*/
					$this->runninghour->insert_rh($d_input);
				}
			}	
		}
	}
}

?>
