<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rWOjml extends CI_Controller {
	public function tesTgl()	{
		echo "tesTgl 29/04/2014 00:00<br/>";
		$a = fDT("29/04/2014 00:00"); echo "<br/>";
		echo "isi A: "; print_r($a);
		echo date('Y-m-d');
	}
	
	public function index()	{
		try {
			$this->load->model('sap');
			
			$hsl = $this->sap->jml_sap();
			for($i=0; $i<count($hsl); $i++)	{
				//print_r($hsl);
				if ($i==0)	echo "----Jml record Sap: ".$hsl[$i]->sap."<br/>";
				if ($i==1)	echo "Jml record SapFmea: ".$hsl[$i]->sap;
			}
		}
		catch (Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);	
		}
	}
	
	public function nWO()	{

		try {
			$thn = $this->input->get('thn')?:date('Y');
			$mwc = $this->input->get('mwc')?:'-';
			
			if ($mwc === 'ALL')	$mwc = '-';
			//$lok = $this->input->get('loc')>=0)?$this->input->get('loc'):-1;
			
			if ($this->input->get('loc') || $this->input->get('loc')>=0)	{
				//echo "lok: $lok --> lok: $lok<br/>";
				$lok = $this->input->get('loc');
				if ($lok === 'ALL')	$lok = -1;
			} 
			else {
				$lok = -1;
			}
			//if ($lok === 'ALL')	$lok = -1;
			//echo "lok: $lok --> lok: $lok<br/>";
			$this->load->model('sap');
			
			$hsl = $this->sap->get_jmlWO($thn,$mwc,$lok);
			//print_r($hsl);
			
			$sap = array();
			foreach ($hsl as $row) {
				//print_r($row);
				//echo $row->kode;
				//*
				if (strcmp($row->kode,"EP01")==0)	{
					$row->nama = 'EP01 Corrective Order';
					$row->color = '#2f7ed8';
				}
				if (strcmp($row->kode,"EP02")==0)	{
					$row->nama = 'EP02 Breakdown Order';
					$row->color = '#0d233a';
				}
				if (strcmp($row->kode,"EP03")==0)	{
					$row->nama = 'EP03 Scheduled Order';
					$row->color = '#8bbc21';
				}
				if (strcmp($row->kode,"EP04")==0)	{
					$row->nama = 'EP04 General Order';
					$row->color = '#910000';
				}
				if (strcmp($row->kode,"EP05")==0)	{
					$row->nama = 'EP05 Modification Order';
					$row->color = '#ffa81f';
				}
				
				//if (strcmp($row['kode'],"EP05")!=0)	{
					$sap[] = $row;
				//*/
			}
			
			$jsonResult = array(
				'success' => true,
				'sap' => $sap
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
	
	public function WoOpen()	{
		try {
			$group = $this->input->get('gr')?:'0';
			$thn = $this->input->get('thn')?:date('Y');
			$taw = $this->input->get('baw')?:1;
			$tak = $this->input->get('bak')?:12;
			//$lok = ($this->input->get('loc')>=0)?$this->input->get('loc'):"_";
			$otp = $this->input->get('otp')?:"_";
			$mwc = $this->input->get('mwc')?:"_";
			
			
			if ($this->input->get('loc') || $this->input->get('loc')>=0)	{
				$lok = $this->input->get('loc');
				if ($lok === 'ALL')	$lok = -1;
			} 
			else {
				$lok = -1;
			}
			//if ($lok === 'ALL')	$lok = -1;
			//echo "lok: $lok<br/>";
			$this->load->model('sap');
			$hsl = $this->sap->get_selisih_WO($thn, $lok, $otp, $mwc);
			
			//echo "group: $group, jml: ".count($hsl)."<br/>";
			//print_r($hsl); echo "<br/>";
			
			if (isset($hsl))	{
				for ($i=0; $i<count($hsl); $i++)	{
					if ($hsl[$i]->flak==$group)	{
						$sap = new stdClass();
						//echo "sampe sini<br/>";
						$sap->jml = $hsl[$i]->jml;
						$sap->persen = $hsl[$i]->persen;
						break;
					}
				}
			}
			if (!isset($sap))	{
				$sap = new stdClass();
				$sap->jml = 0;
				$sap->persen = 0;
			}
			$sap->teks = "Jumlah: ".$sap->jml.", %-to-Total: ".$sap->persen." %";
			
			$jsonResult = array(
				'success' => true,
				'sap' => $sap
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
}

/* End of file rWOjml.php */
/* Location: ./application/controllers/rWOjml.php */
