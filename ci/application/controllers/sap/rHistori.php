<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rHistori extends CI_Controller {
	//*
	function __construct() {
        parent::__construct();
		$this->load->model('sap');
	}
	//*/
	public function index()	{
		echo "tes";
	}
	
	public function getHistori()	{

		try {
			$thn = $this->input->get('tgl')?:date('Y');
			$lok = $this->input->get('loc')?:"_";
			$otp = $this->input->get('otp')?:"_";
			$mwc = $this->input->get('mwc')?:"_";
			
			//echo "$lok $otp $mwc<br/>";
			//$this->load->model('sap');

			$hsl = array();
			$hsl = $this->sap->get_histori($thn,$lok,$otp,$mwc);
			
			//print_r($hsl); echo "<br/><br/>";

			$ada = 0;	$hasil = array();
			for($i=0; $i<12; $i++)	{
				for ($j=0; $j<count($hsl); $j++)	{
					if (isset($hsl[$j]->nbln))	{
						//echo "i: $i, hsl: {$hsl[$j]->nbln}<br/>";
						if ($hsl[$j]->nbln==$i) {
							$ada = 1;
							//echo "ada ---> break<br/>";
							break;
						}
					}
				}
				//*
				if (!$ada)	{
					$obj = new stdClass();
					$obj->bulan = nmMonth($i,1);
					$obj->nbln = $i;
					$obj->teco = 0;
					$obj->open = 0;
					$obj->jml = 0;
					$obj->persen = 0.00;
					array_push($hasil, $obj);
				}
				else {
					array_push($hasil, $hsl[$j]);
				}
				$ada = 0;
			}
			
			//print_r($hsl);
			
			$jsonResult = array(
				'success' => true,
				'saphistori' => $hasil
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

	public function getThnSap()	{
		//*
		try {
			$this->load->model('sap');
			//*
			$jsonResult = array(
				'success' => true,
				'sapthn' => $this->sap->get_tahun()
			);
			//*/
		}	
		catch (Exception $e)	{
			//*
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);	
			//*/
		}
		//*/
		echo json_encode($jsonResult);
	}

	public function getMwcSap()	{
		//*
		try {
			/*
			$hsl = array();
			$obj = new stdClass();
			$obj->mwc = "ALL";
			array_push($hsl, $obj);
			
			$mwc = $this->sap->get_mwc();
			$jml = count($mwc);
			for($i=0; $i<$jml; $i++)	{
				array_push($hsl, $mwc[$i]);
			}
			//*/
			//print_r($hsl);
			$jsonResult = array(
				'success' => true,
				//'sapmwc' => $hsl
				'sapmwc' => $this->sap->get_mwc()
			);
		}	
		catch (Exception $e)	{
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);	
		}
		//*/
		echo json_encode($jsonResult);
	}
	
	public function getOTypeSap()	{
		//*
		try {
			/*
			$hsl = array();
			$obj = new stdClass();
			$obj->otype ="ALL";
			array_push($hsl, $obj);
			
			$otype = $this->sap->get_ordertype();
			$jml = count($otype);
			for($i=0; $i<$jml; $i++)	{
				array_push($hsl, $otype[$i]);
			}
			//print_r($hsl);
			//*/
			$jsonResult = array(
				'success' => true,
				//'sapotype' => $hsl
				'sapotype' => $this->sap->get_ordertype()
			);
			//*/
		}	
		catch (Exception $e)	{
			//*
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);	
			//*/
		}
		//*/
		echo json_encode($jsonResult);
	}
	
	public function getLocSap()	{
		try {
			$this->load->model("hirarki");
			/*
			$hsl = array();
			$obj = new stdClass();
			$obj->nama = $obj->kode = "ALL";
			$obj->id = 0;
			
			array_push($hsl, $obj);
			
			$loc = $this->hirarki->get_parent();
			$jml = count($loc);
			
			for($i=0; $i<$jml; $i++)	{
				array_push($hsl, $loc[$i]);
			}
			//print_r($hsl);
			//*/
			$jsonResult = array(
				'success' => true,
				//'saploc' => $hsl
				'saploc' => $this->hirarki->get_parent_all()
			);
			//*/
		}	
		catch (Exception $e)	{
			//*
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);	
			//*/
		}
		echo json_encode($jsonResult);
	}
}

/* End of file rHistori.php */
/* Location: ./application/controllers/rHistori.php */
