<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rGroupUnit extends CI_Controller {
	
	public function index()		{
		$kal = array(1 => "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des", "YTD/Avg");
		$this->load->model("runninghour");
		$this->load->model("catequip");
		$this->load->model("hirarki");

		$gr = $this->input->get('gr')?:$this->catequip->get_tipe_id();
		if ($this->input->get('wkt'))	{
			list($bln,$thn) = cek_waktu_avre($this->input->get('wkt'));
		}
		else {
			$thn = date("Y");
			$bln = date("n");
		}
		//echo " $gr --- $thn --- $bln";
		
		try {
			//echo $this->catequip->get_tipe_kode($gr)."<br/>";
			//echo "jml: ".count($this->hirarki->get_unit_group($gr))."<br/>";
			//print_r($this->hirarki->get_unit_group($gr));
			
			if ($bln==0)	{
				$hsl = $this->runninghour->get_avre_sthn_eq($thn, $gr);
			}
			else if ($bln==13)	{
				$hsl = $this->runninghour->get_avre_ytd_eq($bln, $thn, $gr);
			}
			else {
				$hsl = $this->runninghour->get_avre_sbln_eq($bln, $thn, $gr);
			}
			//echo "<br/><br/>".count($hsl)."<br/>";
			//print_r($hsl);
			$jsonResult = array(
				'success' => true,
				'avGr' => $hsl
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
	
	public function indexxxx()	{
		
		$kal = array(1 => "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des", "YTD/Avg");
		if (isset($_GET['gr']))	{
			$gr = $_GET['gr'];
		} else {
			$gr = 5;
		}
		echo "$gr";
		$ytd = 0;
						
		if (isset($_GET['tgl']))	{
			$tgl = $_GET['tgl'];
			$atgl = explode(" ",$tgl);
			$n = count($atgl);
			//echo 'n:'. $n.'<br/>';
			if ($n==1)	{
				//$tgl = $atgl[0]."-12";
				$thn = $atgl[0];
			} else if ($n==2)	{
				
				//echo "in: ".in_array($atgl[0], $kal)."<br/>";
				if (in_array($atgl[0], $kal))	{
					$bln = array_search($atgl[0], $kal);
				}
				//echo "no: $no<br/>";
				
				if ($bln<13)	{
					$tgl = $atgl[1]."-".$no;
					//$bln = $atgl[0];
					//$bln = 
				} else {
					$ytd = 1;
				}
				$thn = $atgl[1];
			}
			
		} else {
			$thn = date("Y");
			$bln = date("n");
		}
		//echo "thn: $thn, bln: $bln, ytd: $ytd<br/>";
		
		try {
			//$skrg = date('Y-m-d');	$wkt = explode("-",date('Y-m'));
						
			$sqlawal = "select kode from cat_equip where parent=0 and id=$gr";
			$q = $this->db->query($sqlawal);
			
			if ($q->num_rows() > 0){
			   foreach ($q->result() as $row){
					$kode = $row->kode;
			   }
			}
			
			$data = array(); 
			$s = "select h.id,h.nama,equip.nama as unit,h.init as init ".
				 ",(select hhh.kode from hirarki hhh where hhh.id = (select hh.parent from hirarki hh where h.parent = hh.id)) as hlok ".
				 ",(select hhh.nama from hirarki hhh where hhh.id = (select hh.parent from hirarki hh where h.parent = hh.id)) as lok ".
				 ",(select hhh.urut from hirarki hhh where hhh.id = (select hh.parent from hirarki hh where h.parent = hh.id)) as urut ".
				 "FROM hirarki h ".
				 "LEFT JOIN equip ON h.id = equip.unit_id and equip.kode like '%$kode%' ".
				 "where h.level = 3 and h.flag = $gr ".
				 "order by urut,nama asc;";
			//echo "sql: $s<br/>";
			$q = $this->db->query($s);
			if ($q->num_rows() > 0)
			{
			   foreach ($q->result() as $row)
			   {
					$data[$row->id]['id'] 		= $row->id;
					$data[$row->id]['kode'] 	= $row->init."@".$row->hlok;
					$data[$row->id]['nama'] 	= "{$row->nama}, {$row->unit} @{$row->lok}";
					$data[$row->id]['urut'] 	= $row->urut;
			   }
			}
						
			if (isset($bln) && $bln<13)	{
				$s = "select eq, sum(rh_av) as av,sum(rh_re) as re,count(id) as jml from rh_201311 ".
					 "where cat=$gr and thn=$thn and bln=$bln group by eq;";
			} else {
				$s = "select eq, sum(rh_av) as av,sum(rh_re) as re,count(id) as jml from rh_201311 ".
					 "where cat=$gr and thn=$thn group by eq;";
			}
			
			$q1 = $this->db->query($s);
			if ($q1->num_rows() > 0)
			{
			   foreach ($q1->result() as $row)
			   {
					$data[$row->eq]['av'] = number_format(($row->av*100)/(24*$row->jml), 3);
					$data[$row->eq]['re'] = number_format(($row->re*100)/(24*$row->jml), 3);
			   }
			}
			
			$arGroup = array();
			foreach ($data as $d){
				array_push($arGroup,$d);
			}
			
			$jsonResult = array(
				'success' => true,
				'avGr' => $arGroup
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
