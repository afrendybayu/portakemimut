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
		if ($interval < 0) {
			
			echo 'Gagal melakukan Input Running Hour';
			
		}
		else {
			
			foreach ($this->hirarki->get_equip_hir() as $row){
				//echo $row->id.' --> '.$row->nama.'==>'.$row->cat.'<br>';
				for ($i=0; $i<=$interval; $i++){
					$tgl_mulai = date('Y-m-d',strtotime($awal.'+ '.$i.' days'));
					//echo $tgl_mulai.'<br>';
					//echo '<br>';
					foreach ($this->equip->get_equip_unit_concat($row->id) as $eq_gb){
						//echo $eq_gb->eq.'<br>';
						$d_input = array(
							'eq'=> $row->id , 
							'rh'=> 24,
							'tgl'=> $tgl_mulai,
							'cat'=> $row->cat,
							'flag'=> $eq_gb->eq,
							'rh_av'=> 24,
							'rh_re'=> 24,
							'thn'=> date('Y',strtotime($tgl_mulai)),
							'bln'=> date('m',strtotime($tgl_mulai))
							); 
						//print_r($d_input);
						//echo '<br>';
						if ($this->runninghour->rh_ada($row->id, $tgl_mulai) == 0) $this->runninghour->insert_rh($d_input);
						else  continue  ;
					}
				}
				$this->hirarki->set_rhtot($row->id);
			}
			echo 'Sukses Input Running Hour';
		}
	}
	
	function cSapu_Unit(){
		try{
			$s_unit = json_decode(file_get_contents('php://input'));
			if (!isset($s_unit))	{
				throw new Exception("Data Tidak ada !!");
			}
			
			$interval =floor((strtotime($s_unit->akhir) - strtotime($s_unit->awal))/(3600*24));
			$concat_eq = $this->equip->get_equip_unit_concat($s_unit->id_unit);
			$tambah = array();
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
						
						$this->runninghour->insert_rh($d_input);
						array_push($tambah, $d_input);
						
						}
					else {continue;	}
				}
			}
			
			$jsonResult = array(
				'success' => true,
				'sapu' => $tambah
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
	
	//function Sapu_all(){
		//$awal = $this->input->get('awal') ? $this->input->get('awal') : date('Y-m-d',mktime(0,0,0,date('m'),date('d')-1,date('Y')));
		//$akhir = $this->input->get('akhir') ? $this->input->get('akhir') : date('Y-m-d',mktime(0,0,0,date('m'),date('d')-1,date('Y')));//(mktime(0, 0, 0, date('m')  , date('d')+1, date('Y')));
		//$interval =(strtotime($akhir) - strtotime($awal))/(1*3600*24);
		//if ($interval < 0) {
			
			//echo 'Gagal melakukan Input Running Hour';
			
		//}
		//else {
			
			//foreach ($this->hirarki->get_equip_hir() as $row){
				////echo $row->id.' --> '.$row->nama.'==>'.$row->cat.'<br>';
				//for ($i=0; $i<=$interval; $i++){
					//$tgl_mulai = date('Y-m-d',strtotime($awal.'+ '.$i.' days'));
					////echo $tgl_mulai.'<br>';
					////echo '<br>';
					//foreach ($this->equip->get_equip_unit_concat($row->id) as $eq_gb){
						////echo $eq_gb->eq.'<br>';
						//$d_input = array(
							//'eq'=> $row->id , 
							//'rh'=> 24,
							//'tgl'=> $tgl_mulai,
							//'cat'=> $row->cat,
							//'flag'=> $eq_gb->eq,
							//'rh_av'=> 24,
							//'rh_re'=> 24,
							//'thn'=> date('Y',strtotime($tgl_mulai)),
							//'bln'=> date('m',strtotime($tgl_mulai))
							//); 
						////print_r($d_input);
						////echo '<br>';
						//if ($this->runninghour->rh_ada($row->id, $tgl_mulai) == 0) $this->runninghour->insert_rh($d_input);
						//else  continue  ;
					//}
				//}
				//$this->hirarki->set_rhtot($row->id);
			//}
			//echo 'Sukses Input Running Hour';
		//}
	//}
	
}


