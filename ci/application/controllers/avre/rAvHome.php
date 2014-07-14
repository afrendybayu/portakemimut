<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rAvHome extends CI_Controller {
	
	public function index()	{
				
		if (isset($_GET['wkt']) || isset($_GET['tp']))	{
			$th 	= date("Y");
			$bl 	= date("n");
			$avre 	= $_GET['tp'];
		} else {
			$th = date("Y");
			$bl = date("n");
			$avre = 'av';
		}

		//echo $th .' ' .$bl;
		
		//echo $avre;
		try {
			$s = "select cat, sum(rh_av) as av,sum(rh_re) as re,count(id) as jmleq from rh_201311 where thn=$th and bln=$bl group by cat";
			$q = $this->db->query($s);
			
			$arAvRe = array();
			if ($q->num_rows>0){
				foreach($q->result() as $row){
					$arAvRe['b'][$row->cat]['av'] = number_format(($row->av*100)/($row->jmleq*24),3);
					$arAvRe['b'][$row->cat]['re'] = number_format(($row->re*100)/($row->jmleq*24),3);
				}
			}
				
			// AWAL TAHUN SAMPAI SEKARANG
			$s = "select cat, sum(rh_av) as av,sum(rh_re) as re,count(id) as jmleq from rh_201311 where thn=$th group by cat;";
			$q = $this->db->query($s);
			
			if($q->num_rows>0){
				foreach ($q->result() as $row){
					$arAvRe['a'][$row->cat]['av'] = number_format(($row->av*100)/($row->jmleq*24),3);
					$arAvRe['a'][$row->cat]['re'] = number_format(($row->re*100)/($row->jmleq*24),3);
				}
			}
			
			$thm1 = $th-1;
			$s = "select cat, sum(rh) as av,sum(rh_re) as re,count(id) as jmleq from rh_201311 where thn=$thm1 group by cat;";
			$q = $this->db->query($s);
			
			if($q->num_rows>0){
				foreach ($q->result() as $row){
					$arAvRe['d'][$row->cat]['av'] = number_format(($row->av*100)/($row->jmleq*24),3);
					$arAvRe['d'][$row->cat]['re'] = number_format(($row->re*100)/($row->jmleq*24),3);
				}
			}
			//print_r ($arAvRe);
			
			$arAR = array();
	
			$obj  = new stdClass();
			$obj1 = new stdClass();
			$obj2 = new stdClass();
			
			if (strcmp($avre,"av")==0) /*jika av=av*/	{
				$obj1->th1 = isset($arAvRe['d'][5]['av'])?($arAvRe['d'][5]['av']):0;
				$obj1->avg = isset($arAvRe['a'][5]['av'])?($arAvRe['a'][5]['av']):0;
				$obj1->bln = isset($arAvRe['b'][5]['av'])?($arAvRe['b'][5]['av']):0;
				$obj1->tgt = '98';
				$obj1->m = "Gas Comp";
				array_push($arAR,$obj1);
				
				
				$obj->th1 = isset($arAvRe['d'][7]['av'])?($arAvRe['d'][7]['av']):0;
				$obj->avg = isset($arAvRe['a'][7]['av'])?($arAvRe['a'][7]['av']):0;
				$obj->bln = isset($arAvRe['b'][7]['av'])?($arAvRe['b'][7]['av']):0;
				$obj->tgt = '98';
				$obj->m = "Generator Set";
				array_push($arAR,$obj);
				
				$obj2->th1 = isset($arAvRe['d'][6]['av'])?($arAvRe['d'][6]['av']):0;
				$obj2->avg = isset($arAvRe['a'][6]['av'])?($arAvRe['a'][6]['av']):0;
				$obj2->bln = isset($arAvRe['b'][6]['av'])?($arAvRe['b'][6]['av']):0;
				$obj2->tgt = '98';
				$obj2->m = "Pump";
				array_push($arAR,$obj2);
			} else if (strcmp($avre,"re")==0)	{

				$obj1->th1 = isset($arAvRe['d'][5]['re'])?($arAvRe['d'][5]['re']):0;
				$obj1->avg = isset($arAvRe['a'][5]['re'])?($arAvRe['a'][5]['re']):0;
				$obj1->bln = isset($arAvRe['b'][5]['re'])?($arAvRe['b'][5]['re']):0;
				$obj1->th1 = ($arAvRe['d'][5]['re'])?:0;
				$obj1->avg = ($arAvRe['a'][5]['re'])?:0;
				$obj1->bln = ($arAvRe['b'][5]['re'])?:0;
				$obj1->tgt = '98';
				$obj1->m = "Gas Comp";
				array_push($arAR,$obj1);
				
				
				$obj->th1 = isset($arAvRe['d'][7]['re'])?($arAvRe['d'][7]['re']):0;
				$obj->avg = isset($arAvRe['a'][7]['re'])?($arAvRe['a'][7]['re']):0;
				$obj->bln = isset($arAvRe['b'][7]['re'])?($arAvRe['b'][7]['re']):0;

				$obj->th1 = ($arAvRe['d'][7]['re'])?:0;
				$obj->avg = ($arAvRe['a'][7]['re'])?:0;
				$obj->bln = ($arAvRe['b'][7]['re'])?:0;

				$obj->tgt = '98';
				$obj->m = "Generator Set";
				array_push($arAR,$obj);
				

				$obj2->th1 = isset($arAvRe['d'][6]['av'])?($arAvRe['d'][6]['av']):0;
				$obj2->avg = isset($arAvRe['a'][6]['av'])?($arAvRe['a'][6]['av']):0;
				$obj2->bln = isset($arAvRe['b'][6]['av'])?($arAvRe['b'][6]['av']):0;

				$obj2->th1 = ($arAvRe['d'][6]['av'])?:0;
				$obj2->avg = ($arAvRe['a'][6]['av'])?:0;
				$obj2->bln = ($arAvRe['b'][6]['av'])?:0;

				$obj2->tgt = '98';
				$obj2->m = "Pump";
				array_push($arAR,$obj2);
				
			}
			
			$jsonResult = array(
				'success' => true,
				'avhome' => $arAR
			);
			
			//print_r($arAR);
		}
		catch (Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);	
		}
		
		echo json_encode($jsonResult);
	
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
