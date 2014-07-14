<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');



class rRunningHour extends CI_Controller {
	
	public function index()	{
		//$this->load->helper('util');
		//echo test_method("ngetes");
		try	{
			$sql = array();
			$eq = 0; $jml = 0;
			$tisi = array(); 
			//$tgl = $this->input->get('tgl')?:'0';
			$tgl = $this->input->get('tgl')?:date('Y-m-d'); 
			$cat = $this->input->get('cat')?:5;  	
			
			$m = date('n', strtotime($tgl)); //month 1-12 tanpa 0
			$y = date('Y', strtotime($tgl)); //year
			$t = date('d', strtotime($tgl)); //day 00-31
			
			$bts_0 = date("Y-m-d", mktime(0, 0, 0, $m, $t, $y));
			$bts_1 = date("Y-m-d", mktime(0, 0, 0, $m, $t-13, $y));
			
			$s = "SELECT h3.id, h3.nama, h3.flag as cat, h1.nama as hlok, h1.urut as urut FROM hirarki AS h1
					LEFT JOIN hirarki AS h2 ON h2.parent = h1.id
					LEFT JOIN hirarki AS h3 ON h3.parent = h2.id
					WHERE h1.parent =0 and h3.flag = ? order by h1.urut asc, h3.nama asc;"; 
			
			$query = $this->db->query($s, $cat);
			
			$fas = array();	$tisi = array();
			if ($query->num_rows() > 0)	{
				foreach ($query->result() as $row)	{
					$fas[$row->id]['id'] = $row->id;
					$fas[$row->id]['eq'] = $row->nama;//." ".$row['tag'];
					$fas[$row->id]['cat'] = $row->cat;
					$fas[$row->id]['Lokasi'] = $row->hlok;
					
					for ($u=0;$u<14; $u++)	{		 // inisialisasi nilai [-]
						$fas[$row->id]["k".date('ymd', mktime(0, 0, 0, $m, $t-$u, $y))] = '-';
					}
				}
			}
			
			
			$s = "SELECT * FROM rh_201311 WHERE tgl BETWEEN ? AND ? ";
			$query = $this->db->query($s, array($bts_1,$bts_0));
			//$query = $this->db->query($s, array($sql['bts'][1],$sql['bts'][0]) );
			
			$time = time();
			if ($query->num_rows() > 0)	{
				foreach ($query->result() as $row)	{
					if ($eq != $row->eq){
						$eq = $row->eq;
						//$isi[$eq] = $row;	
						$tisi[$eq]['id'] = $row->eq;
						$tisi[$eq]['tgl'] = $row->tgl;
						//$jml=$jml+1;
					}
					$time = strtotime($row->tgl); 
					//$ii = ($row->rh);
					$ii = format_rh_time($row->rh);
					
					$tisi[$eq]["k".date('ymd',$time)] = ($ii?:'-');
				}
				
			} 
			
			if (!isset($tisi[$eq]["k".date('ymd',$time)]))	{
				foreach ($fas as $a)	{
					//echo " -->".$a['id']."<br/>";
					for($i=13;$i>=0; $i--)	{
						//echo "eq: ".$a['id']." ".date("ymd", mktime(0, 0, 0, $m, $t-$i, $y))."<br/>";
						$fas[$a['id']]["k".date("ymd", mktime(0, 0, 0, $m, $t-$i, $y))] = '-';
					}
				}
				
			} else {
				//echo "tembus <br/>";
				foreach ($tisi as $data)	{
					//if ($fas[$data['id']]!=null)	{
					if(@isset($fas[$data['id']]))	{
						$fas[$data['id']] = @array_merge($fas[$data['id']],$data);
						//print_r($data); echo "<br/>";
					}
				}
			}

			$isi = array();
			foreach ($fas as $data)	{
				array_push($isi, $data);
			}
			//print_r ($isi);

			$jsonResult = array(
				'success' => true,
				'runninghour' => $isi
			);
		}
		catch (Exception $e)	{
			 $jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		//$this->load->view('welcome_message');
		//echo json_encode($jsonResult);
		$this->output->set_content_type('application/json');
		$this->output->set_output(json_encode($jsonResult));
		//$this->output->enable_profiler(TRUE);
	}
	
}



