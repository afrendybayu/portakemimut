<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rAvReUnit extends CI_Controller {
	
	public function index()	{
		$kal = array(1 => "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des", "YTD/Avg");
		
		if (isset($_GET['eq']))	{
			$eq = $_GET['eq'];
		} else {
			$eq = 0;
		}
		
		$thn = date("Y");
		$bln = date("n");
		$thnm1 = $thn-1;
		
		
		try {
			$arAvRe = array();
			for ($i=0; $i<12; $i++)	{
				//$z = blnthn($i+1,$thnm1);
				$arAvRe[$i]['av'.$thnm1] = 0;
				$arAvRe[$i]['re'.$thnm1] = 0;
				$arAvRe[$i]['av'.$thn] = 0;
				$arAvRe[$i]['re'.$thn] = 0;
				$arAvRe[$i]['b'] = $i+1;
				//$arAvRe[$i]['m'] = nmbulan($i,1);
				$arAvRe[$i]['m'] = $kal[$i+1];
			}
			
			//print_r($arAvRe);
			
			$nowB = date('n');
			$nowT = date('Y');
			$nowD = date('j')+1;
			
			$s = "SELECT bln,thn,(SELECT DAY(LAST_DAY(tgl))*24) as jml, sum(rh_av) AS av,sum(rh_re) AS re FROM rh_201311 ".
				 "WHERE eq='$eq' and (thn='$thn' or thn='$thnm1') GROUP BY bln,thn ORDER BY thn, bln ASC";
			//echo "sql: $s<br/>";
			$q = $this->db->query($s);
			
			if ($q->num_rows>0){
				foreach ($q->result() as $row){
					if (($nowB==$row->bln) && ($nowT==$row->thn))	{
						//echo "bln: $nowB, === ".$row['bln']." nowT: $nowT === ".$row['thn']."<br/>";
						$arAvRe[intval($row->bln)-1]['av'.$row->thn] = number_format(($row->av*100)/($nowD*24),2);
						$arAvRe[intval($row->bln)-1]['re'.$row->thn] = number_format(($row->av*100)/($nowD*24),2);
					} else {
						$arAvRe[intval($row->bln)-1]['av'.$row->thn] = number_format(($row->av*100)/$row->jml,2);
						$arAvRe[intval($row->bln)-1]['re'.$row->thn] = number_format(($row->av*100)/$row->jml,2);
					}
				}
			}
			
			$jsonResult = array(
				'success' => true,
				'avre' => $arAvRe
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

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */