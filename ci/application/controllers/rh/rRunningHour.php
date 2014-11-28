<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');



class rRunningHour extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('runninghour');
		$this->load->model('hirarki');
		$this->load->model('pm');
    }
    
	public function rExGrid()	{
		$sql = array();
		$eq = 0; $jml = 0;
		$tisi = array(); 
		$ww=30;	$w=$ww-1;
		
		
		try {
			$tgl = $this->input->get('tgl')?:date('Y-m-d'); 
			$cat = $this->input->get('cat')?:5;  	
			
			$m = date('n', strtotime($tgl)); //month 1-12 tanpa 0
			$y = date('Y', strtotime($tgl)); //year
			$t = date('d', strtotime($tgl)); //day 00-31
			
			
			$bts_0 = date("Y-m-d", mktime(0, 0, 0, $m, $t, $y));
			$bts_1 = date("Y-m-d", mktime(0, 0, 0, $m, $t-$w, $y));
			
			$pm = $this->pm->get_pmlist_array();
			//print_r($pm);
			
			$hir = $this->hirarki->get_excelgrid_hir($cat,$pm);
			
			$rh = $this->runninghour->get_rh_bulan(array($bts_1,$bts_0));
			print_r($rh);
			/*
			if (count($hir)>0)	{
			//foreach($hir->result() as $d)	{
				foreach($hir as $d)	{
			//	print_r($d); echo "<br/>";
				}
			}
			//*/
			
			$jsonResult = array(
				'success' => true,
				'message' => $hir
			);
		}
		catch (Exception $e)	{
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		echo json_encode($jsonResult);
	}
	
	public function index()	{
		//$this->load->helper('util');
		//echo test_method("ngetes");
		try	{
			$sql = array();
			$eq = 0; $jml = 0;
			$tisi = array(); 
			$ww=30;	$w=$ww-1; 
			//$tgl = $this->input->get('tgl')?:'0';
			$tgl = $this->input->get('tgl')?:date('Y-m-d'); 
			$cat = $this->input->get('cat')?:5;  	
			
			$m = date('n', strtotime($tgl)); //month 1-12 tanpa 0
			$y = date('Y', strtotime($tgl)); //year
			$t = date('d', strtotime($tgl)); //day 00-31
			
			$bts_0 = date("Y-m-d", mktime(0, 0, 0, $m, $t, $y));
			$bts_1 = date("Y-m-d", mktime(0, 0, 0, $m, $t-$w, $y));
			
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
					
					for ($u=0;$u<$ww; $u++)	{		 // inisialisasi nilai [-]
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
					for($i=$w;$i>=0; $i--)	{
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
	
	
	public function cariRH()	{
		/*
		 * SELECT  h3.id,h3.nama,h1.nama AS lok
,(CONCAT('[',(SELECT pd.nama FROM waktudown wd 
		LEFT JOIN pmdef pd ON pd.id = wd.tipeev
		where wd.downt = MAX(wd1.downt) AND wd.eqid = eq.id AND wd.event=2),
	' ',eq.kode,': ',MAX(wd1.downt),']')) AS pm
FROM hirarki h1
LEFT JOIN hirarki h2 ON h2.parent = h1.id
LEFT JOIN hirarki h3 ON h3.parent = h2.id
LEFT JOIN equip eq ON eq.unit_id = h3.id
LEFT JOIN waktudown wd1 ON h3.id = wd1.unit_id AND wd1.event=2
WHERE h1.parent=0 AND h3.flag=5 
	
GROUP BY h3.id
ORDER BY h1.urut ASC, h3.nama ASC,pm DESC;


SELECT  h3.id,h3.nama,h1.nama AS lok,MAX(wd.downt) AS downt,GROUP_CONCAT(DISTINCT eq.id) AS eqid,wd.tipeev,wd.id
,(SELECT GROUP_CONCAT(eq1.kode,' ',wd1.eqid, ' ',wd1.id, ' ', wd1.downt,'-->')
	FROM waktudown wd1 

	LEFT JOIN equip eq1 ON eq1.id = wd1.eqid
	WHERE wd1.downt = MAX(wd.downt) AND wd1.event=2  
		AND wd1.tipeev >0 
) AS gap
FROM hirarki h1
LEFT JOIN hirarki h2 ON h2.parent = h1.id
LEFT JOIN hirarki h3 ON h3.parent = h2.id
LEFT JOIN equip eq ON eq.unit_id = h3.id
LEFT JOIN waktudown wd ON eq.id = wd.eqid AND wd.event=2 AND wd.tipeev >0
LEFT JOIN pmlist pl ON pl.id = wd.tipeev
LEFT JOIN pmdef pd ON pd.id = pl.pm
WHERE h1.parent=0 AND h3.flag=5
GROUP BY h3.id,eq.id
ORDER BY h1.urut ASC, h3.nama ASC;

SELECT h3.id,h3.nama,h1.nama AS lok,MAX(wd.downt) AS dt,h3.rhinit
,GROUP_CONCAT(DISTINCT eq.id) AS eqid,GROUP_CONCAT(DISTINCT wd.tipeev) as tev
,(SELECT GROUP_CONCAT(wd1.id,' ',eq1.id,' ',pd1.nama,' ',eq1.kode,' ', wd1.downt)
	FROM waktudown wd1 
	LEFT JOIN pmlist pl1 ON pl1.id = wd1.tipeev
	LEFT JOIN pmdef pd1 ON pd1.id = pl1.pm
	LEFT JOIN equip eq1 ON eq1.id = wd1.eqid
	WHERE wd1.downt = MAX(wd.downt) AND wd1.event=2
		AND wd1.tipeev>0 AND wd1.eqid=eq.id
	
) AS gap
FROM hirarki h1
LEFT JOIN hirarki h2 ON h2.parent = h1.id
LEFT JOIN hirarki h3 ON h3.parent = h2.id
LEFT JOIN equip eq ON eq.unit_id = h3.id
LEFT JOIN waktudown wd ON eq.id = wd.eqid AND wd.event=2 AND wd.tipeev >0
WHERE h1.parent=0 AND h3.flag=5
GROUP BY h3.id,eq.id
ORDER BY h1.urut ASC, h3.nama ASC;
		//*/
	}
}



