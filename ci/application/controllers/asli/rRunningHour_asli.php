<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rRunningHour extends CI_Controller {
	
	function __construct()    {
        parent::__construct();
        $this->load->database();
    }
	
	public function index()	{
		//$this->load->view('welcome_message');
		try	{
			$sql = array();
			$eq = 0; $jml = 0;
			$tisi = array();
			
			$tgl = $this->input->get('tgl')?:'0';
			$cat = $this->input->get('cat')?:5;
			//echo $tgl;
			//return;
			//$tgl = (isset($this->input->get('tgl',TRUE)))?str_replace("'",'',$this->db->escape($this->input->get('tgl',TRUE))):'0';
			//$tgl = (isset($_GET['tgl']))?str_replace("'",'',$this->db->escape($_GET['tgl'])):'0';
			//$tgl =
			//$tgl = (isset($_GET['tgl']))?($_GET['tgl']):'0';
			//$cat = (isset($_GET['cat']))?$this->db->escape($_GET['cat']):5;
			
			if ($tgl==null || $tgl=='0')	{
				$tgl=date("Y-m-d");	
			//	echo "tgl: $tgl<br/>";
			}
			//echo "tgl: $tgl, cat: $cat<br/>";
			
			/*
			list($y,$m,$t) = explode("-", $tgl);
			$m = (int) $m;
			$y = (int) $y;
			//$y = 2014;
			$t = (int) $t;
			
			//*/
			$m = date('n', strtotime($tgl));
			$y = date('Y', strtotime($tgl));
			$t = date('d', strtotime($tgl));
			//echo "y: $y, m: $m, t: $t<br/>";

			//$sql["tbl"][0] = "rh_".date("Ym", mktime(0, 0, 0, $m, $t, $y));
			$sql["bts"][0] = date("Y-m-d", mktime(0, 0, 0, $m, $t, $y)); 	
			//$sql["tbl"][1] = "rh_".date("Ym", mktime(0, 0, 0, $m, $t, $y)-(13*24));
			$sql["bts"][1] = date("Y-m-d", mktime(0, 0, 0, $m, $t-13, $y));
			
			//echo "tbl: {$sql["tbl"][0]}, bts: {$sql["bts"][0]}, tbl: {$sql["tbl"][1]}, bts: {$sql["bts"][1]}<br/>";
			//echo "tbl: {$sql["tbl"][0]}, bts0: {$sql["bts"][0]}, bts1: {$sql["bts"][1]}<br/>";
			
			$dum = array();
			for ($tgl=0; $tgl<14; $tgl++)	{
				//$dum["k".date("ymd", mktime(0, 0, 0, $m, $t-13+$tgl, $y))] = '00:00';
				$dum[$tgl] = "k".date("ymd", mktime(0, 0, 0, $m, $t-13+$tgl, $y));
			}
			
			$s = "select id,nama,flag as cat, parent as idparent,ket /*level*/ ".
				 "/*,(select h.parent from hirarki h where hh.parent = h.id) as parent*/ ".
				 ",(select hhh.nama from hirarki hhh where hhh.id = (select hh.parent from hirarki hh where h.parent = hh.id)) as hlok ".
				 ",(select hhh.urut from hirarki hhh where hhh.id = (select hh.parent from hirarki hh where h.parent = hh.id)) as urut ".
				 "from hirarki h where level = 3 and flag = ? ".
				 "order by urut asc, nama asc;";
			
			//echo "sql: $s<br/>";
			$query = $this->db->query($s, $cat);
			
			$fas = array();	$tisi = array();
			if ($query->num_rows() > 0)	{
				foreach ($query->result() as $row)	{
					//print_r($row); echo "<br/>";
					//*
					$fas[$row->id]['id'] = $row->id;
					$fas[$row->id]['eq'] = $row->nama;//." ".$row['tag'];
					$fas[$row->id]['cat'] = $row->cat;
					$fas[$row->id]['Lokasi'] = $row->hlok;
					//*/
				}
			}
			
			//$loop = ($sql["tbl"][0]!=$sql["tbl"][1])?2:1;
			$limit = '';
			if ($t>=14)	{
				$limit = " tgl>='{$sql["bts"][1]}' and";
			}
			
			//$s = "SELECT * FROM rh_201311 WHERE tgl BETWEEN '{$sql['bts'][1]}' AND '{$sql['bts'][0]}' ";
			$s = "SELECT * FROM rh_201311 WHERE tgl BETWEEN ? AND ? ";
			//echo "sql: $s<br/>";
			$query = $this->db->query($s, array($sql['bts'][1],$sql['bts'][0]) );
			//$query = $this->db->query($s);
			
			$time = '';
			if ($query->num_rows() > 0)	{
				//echo "jml:";
				foreach ($query->result() as $row)	{
					//print_r($row); echo "<br/>";
					//*
					if ($eq != $row->eq)	{
						//echo "-- ";
						$eq = $row->eq;
						//$isi[$eq] = $row;	
						$tisi[$eq]['id'] = $row->eq;
						$tisi[$eq]['tgl'] = $row->tgl;
						//$jml=$jml+1;
					}
					//echo "<br/>ada<br/><br/>";
					$time = strtotime($row->tgl);
					//echo "time: $time<br/>";
					$ii = ($row->rh);
					//$ii = format_rh_time($row->rh);
					$tisi[$eq]["k".date('ymd',$time)] = ($ii?:'-');
					//*/
				}
			} 
			/*
			else {
				$time = $time = strtotime('now');
			}
			//*/
			
			
			//*
			if (!isset($tisi[$eq]["k".date('ymd',($time))]))	{
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
					}
				}
			}
			//*/
			$isi = array();
			foreach ($fas as $data)	{
				array_push($isi, $data);
			}
			
			
			//print_r($arr);

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
		echo json_encode($jsonResult);
	}
}
