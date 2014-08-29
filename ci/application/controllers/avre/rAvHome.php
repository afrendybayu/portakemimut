<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rAvHome extends CI_Controller {
	
	public function index()		{
		/*
		//$avre 	= isset($this->input->get('tp'))?$this->input->get('tp'):'av';
		$wkt = strtotime("Thu Aug 28 2014 00:00:00 GMT+0700 (WIB)");
		$thn = date('Y',$wkt);
		$bln = date('n',$wkt);
		//echo "Y: $thn, m: $bln<br/>";
		//*/
		$avre = $this->input->get('tp')?:'av';
		//echo "$avre";
		if ($this->input->get('wkt'))	{
			$w = $this->input->get('wkt');
			//echo "--> $w ";
			if ($w==="")	{
				$thn = date("Y");
				$thnm1 = $thn-1;
				$bln = date("n");
			}
			else {
				$wkt = strtotime($w);
				$thn = date('Y',$wkt);
				$bln = date('n',$wkt);
				$thnm1 = $thn-1;
			}
		}
		else {
			//echo "$avre";
			$thn = date("Y");
			$thnm1 = $thn-1;
			$bln = date("n");
		}
		
		//echo "Y: $thn, m: $bln<br/>";
		try {
			
			$this->load->model("runninghour");
			$this->load->model("catequip");
			
			$arUnit = $this->catequip->get_tipe('');
			$nUnit = isset($arUnit)?count($arUnit):0;
			//echo "n: $nUnit";
			$arAvRe = array();
			
			if ($nUnit==0)	{
				throw new Exception("Konfigurasi Unit Tidak ada !!");
			}

			//echo "bln: $bln, thn: $thn, thnm1: $thnm1<br/>";
			$arUnitB  = $this->runninghour->get_avre_sbln($bln, $thn);
			$arUnitT  = $this->runninghour->get_avre_ytd($bln, $thn);
			$arUnitT1 = $this->runninghour->get_avre_sthn($thnm1);
			/*
			echo "arUnit: <br/>"; print_r($arUnit); echo "<br/>";
			echo "arUnitB: <br/>"; print_r($arUnitB); echo "<br/>";
			echo "arUnitT: <br/>"; print_r($arUnitT); echo "<br/>";
			echo "arUnitT1: <br/>"; print_r($arUnitT1); echo "<br/><br/><br/>";
			//*/
			for ($i=0; $i<$nUnit; $i++)	{
				$obj  = new stdClass();
				if (strcmp($avre,"av")==0) 	{
					$obj->m	  = $arUnit[$i]->nama;
					for ($j=0; $j<count($arUnitB); $j++)	{
						if ($arUnit[$i]->id == $arUnitB[$j]->cat)	{
							$obj->bln = $arUnitB[$j]->av; break;
						}
					}
					$obj->bln = isset($obj->bln)?$obj->bln:0;
					for ($j=0; $j<count($arUnitT); $j++)	{
						if ($arUnit[$i]->id == $arUnitT[$j]->cat)	{
							$obj->avg = $arUnitT[$j]->av; break;
						}
					}
					$obj->avg = isset($obj->avg)?$obj->avg:0;
					for ($j=0; $j<count($arUnitT1); $j++)	{
						if ($arUnit1[$i]->id == $arUnitT1[$j]->cat)	{
							$obj->th1 = $arUnitT1[$j]->av; break;
						}
					}
					$obj->th1 = isset($obj->th1)?$obj->th1:0;
					//$obj->tgt = '98';
				}
				else if (strcmp($avre,"re")==0)	{
					$obj->m	  = $arUnit[$i]->nama;
					for ($j=0; $j<count($arUnitB); $j++)	{
						if ($arUnit[$i]->id == $arUnitB[$j]->cat)	{
							$obj->bln = $arUnitB[$j]->re; break;
						}
					}
					$obj->bln = isset($obj->bln)?$obj->bln:0;
					for ($j=0; $j<count($arUnitT); $j++)	{
						if ($arUnit[$i]->id == $arUnitT[$j]->cat)	{
							$obj->avg = $arUnitT[$j]->re; break;
						}
					}
					$obj->avg = isset($obj->avg)?$obj->avg:0;
					for ($j=0; $j<count($arUnitT1); $j++)	{
						if ($arUnit1[$i]->id == $arUnitT1[$j]->cat)	{
							$obj->th1 = $arUnitT1[$j]->re; break;
						}
					}
					$obj->th1 = isset($obj->th1)?$obj->th1:0;
				}
				//print_r($obj);
				array_push($arAvRe,$obj);
				//echo "<br/>"; print_r($arAvRe);
				//echo "<br/><br/>";
			}
			//print_r($arAvRe);
			
			$jsonResult = array(
				'success' => true,
				'avhome' => $arAvRe
			);
		}
		catch (Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);	
		}
		//*/
		echo json_encode($jsonResult);
		
		
	}
	
	public function indexxxx()	{
				
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
			//echo "sql: $s<br/>";
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
				$obj1->th1 = isset($arAvRe['d'][5]['re'])?($arAvRe['d'][5]['re']):0;
				$obj1->avg = isset($arAvRe['a'][5]['re'])?($arAvRe['a'][5]['re']):0;
				$obj1->bln = isset($arAvRe['b'][5]['re'])?($arAvRe['b'][5]['re']):0;
				$obj1->tgt = '98';
				$obj1->m = "Gas Comp";
				array_push($arAR,$obj1);
				
				
				$obj->th1 = isset($arAvRe['d'][7]['re'])?($arAvRe['d'][7]['re']):0;
				$obj->avg = isset($arAvRe['a'][7]['re'])?($arAvRe['a'][7]['re']):0;
				$obj->bln = isset($arAvRe['b'][7]['re'])?($arAvRe['b'][7]['re']):0;

				$obj->th1 = isset($arAvRe['d'][7]['re'])?($arAvRe['d'][7]['re']):0;
				$obj->avg = isset($arAvRe['a'][7]['re'])?($arAvRe['a'][7]['re']):0;
				$obj->bln = isset($arAvRe['b'][7]['re'])?($arAvRe['b'][7]['re']):0;

				$obj->tgt = '98';
				$obj->m = "Generator Set";
				array_push($arAR,$obj);
				

				$obj2->th1 = isset($arAvRe['d'][6]['av'])?($arAvRe['d'][6]['av']):0;
				$obj2->avg = isset($arAvRe['a'][6]['av'])?($arAvRe['a'][6]['av']):0;
				$obj2->bln = isset($arAvRe['b'][6]['av'])?($arAvRe['b'][6]['av']):0;

				$obj2->th1 = isset($arAvRe['d'][6]['av'])?($arAvRe['d'][6]['av']):0;
				$obj2->avg = isset($arAvRe['a'][6]['av'])?($arAvRe['a'][6]['av']):0;
				$obj2->bln = isset($arAvRe['b'][6]['av'])?($arAvRe['b'][6]['av']):0;

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
