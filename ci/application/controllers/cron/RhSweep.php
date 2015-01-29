<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class RhSweep extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('runninghour');
		$this->load->model('equip');
		$this->load->model('hirarki');
    }
	public function index()	{
		$awal = $this->input->get('awal') ? $this->input->get('awal') : date('Y-m-d',mktime(0,0,0,date('m'),date('d')-1,date('Y')));
		$akhir = $this->input->get('akhir') ? $this->input->get('akhir') : date('Y-m-d',mktime(0,0,0,date('m'),date('d')-1,date('Y')));//(mktime(0, 0, 0, date('m')  , date('d')+1, date('Y')));

		$interval =(strtotime($akhir) - strtotime($awal))/(1*3600*24);
		
		try {
		
			for ($i=0; $i<=$interval; $i++){
				$tgl_mulai = date('Y-m-d',strtotime($awal.'+ '.$i.' days'));
				echo 'isi data RH di tanggal :'.$tgl_mulai.'<br>';
				$hsl = $this->equip->get_equip_gconcat();
				$rh  = $this->runninghour->get_rh_harian($tgl_mulai);
				//print_r($rh);
				
				//echo "get_rh_harian: ".count($rh)." <br/>"; 
				//echo "get_equip_gconcat: <br/>"; 
				//foreach ($hslprint_r($hsl); echo "<br/>";
				
				//print_r($hsl[0]);	echo "<br/>";
				//print_r($rh[$hsl[0]->unit_id]); echo "<br/>";
				$tambah = array();
				foreach($hsl as $row){
					//print_r($row);	echo "<br/>"; 
					//print_r($rh[$row->unit_id]); echo "<br/>";
					//$d_query = $this->runninghour->get_rhunit($row->unit_id,$tgl_mulai);
					// echo count($d_query);
					//if (count($d_query)== 0){
					if (!isset($rh[$row->unit_id]))	{
						//echo ' ini di '.$tgl_mulai.'</br>';
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
						
						array_push($tambah, $d_input);
						//*/
						/*
						$jsonResult = array(
							'success' => true,
							'rh' => $d_input
						);
						echo json_encode($jsonResult).'<br>';
						//*/
						
						
						
						$this->runninghour->insert_rh($d_input);
					}
					
					$this->hirarki->set_rhtot($row->unit_id);
				}	
			}
			
			$jsonResult = array(
				'success' => true,
				'rh' => $tambah
			);
			
		}
		catch (Exception $e)	{
			 $jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		echo json_encode($jsonResult);
	}
	
	function cSapu_Unit(){
		
		
		try{
			$s_unit = json_decode(file_get_contents('php://input'));
			
			//if (isset($s_unit->id_unit) ){
			$interval =floor((strtotime($s_unit->akhir) - strtotime($s_unit->awal))/(3600*24));
			$concat_eq = $this->equip->get_equip_unit_concat($s_unit->id_unit);
			foreach ( $concat_eq as $row){
				for ($i= 0; $i<=$interval; $i++){
					$tgl_mulai = date('Y-m-d',strtotime($s_unit->awal.'+ '.$i.' days'));
					$jml = $this->runninghour->rh_ada($s_unit->id_unit, $tgl_mulai);
					if ($jml == 0) {
						$d_input = array(
								'eq'=> $s_unit->id_unit , 
								'rh'=> 24,
								'tgl'=> $tgl_mulai,
								'cat'=> $s_unit->flag,
								'flag'=> $row->eq,
								'rh_av'=> 24,
								'rh_re'=> 24,
								'thn'=> date('Y',strtotime($tgl_mulai)),
								'bln'=> date('m',strtotime($tgl_mulai))
								);
						
						//$this->runninghour->insert_rh($d_input);
						$this->runninghour->insert_rh($d_input);
						}
					else {continue;	}
				}
			}
		//}
		
			
			//$this->hirarki->set_rhtot($row->unit_id);
			
			//if (!isset ($s_unit) ){
					//$input = 'Gagal melakukan operasi Sapu...';
				//}
			//else { $input = 'OK'; }
			
			//$jsonResult = array(
				//'success' => true,
				//'runhour' => $input
			//);
		}
		catch(Exception $e){
			 //$jsonResult = array(
				//'success' => false,
				//'message' => $e->getMessage()
			//);
		}
		//echo json_encode($jsonResult);
	}
	
}

?>
