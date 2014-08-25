<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rHistori extends CI_Controller {
	
	public function getHistori()	{

		try {
			$thn = $this->input->get('tgl')?:date('Y');
			$this->load->model('sap');

			$hsl = array();
			$hsl = $this->sap->get_histori($thn);
			
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

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
