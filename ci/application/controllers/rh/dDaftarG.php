<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class dDaftarG extends CI_Controller {
	
	public function index()	{
		try	{
			$params = json_decode(file_get_contents('php://input'));

			$id = isset($params->id)?$params->id:"e0";
			$eq = isset($params->eqid)?$params->eqid:"0";
			$ids = array_filter(explode("e",$id));
			
			//$this->load->model('waktudown');
			
			$hasil = $this->waktudown->delete_waktudown($ids);
			$tole = $this->option->cek_tole_hari();
			
			$edit = 0; $idid = 0;
			$wkt = $this->waktudown->get_waktudown($eq,$params->downt,$params->downj,$params->upt,$params->upj,1,
					$params->event, $edit, $idid,
					hari_dengan_tole($params->downt,-$tole),hari_dengan_tole($params->downt,$tole),
					hari_dengan_tole($params->upt,-$tole),hari_dengan_tole($params->upt,$tole) );
			
			//$wktrange = cek_waktu_range($idwd,$wkt[0]['tgl'],$wkt[0]['jam'],$wkt[1]['tgl'],$wkt[1]['jam'], 1);
			$wkt_unik = $wkt->dt;
			$kw = kombinasi_waktu($wkt->dt, $wkt->dj, $wkt->ut, $wkt->uj);
			echo "kombinasi: "; print_r($kw);	echo "<br/>";
			
			$ar=array();	$ar_av=array();	$ar_re=array();	$l=0; $m=0;
			for ($k=0; $k<count($wkt_unik); $k++)	{
				echo "$k".count($wkt_unik).": ".$wktrange->dt[$k].", event: ".$wktrange->ev[$k]."<br/>";
				$ar = rh($wktrange->dt[$k], $wktrange->dj[$k], $wktrange->ut[$k], $wktrange->uj[$k]);
				//echo "jmlAr[$k]: ".sizeof($ar)."<br/>"; print_r($ar);  

				if ($k==0)	$hrh = $ar;
				else {
					$hrh = hitung_hrh($hrh, $ar);
					sort($hrh);
				}
				
				if ($wktrange->ev[$k]==4) {		// Reliability: 4: Breakdown
					$ar_re = rh($wktrange->dt[$k], $wktrange->dj[$k], $wktrange->ut[$k], $wktrange->uj[$k]);
					if ($l==0)	{
						$hrh_re = $ar_re;
					}
					else {
						$hrh_re = hitung_hrh($hrh_re, $ar_re);	
						sort($hrh_re);
					}
					$l++;
				}
				if (($wktrange->ev[$k])>1) {		// Availability
					$ar_av = rh($wktrange->dt[$k], $wktrange->dj[$k], $wktrange->ut[$k], $wktrange->uj[$k]);
					if ($m==0)	{
						$hrh_av = $ar_av;
					}
					else {
						$hrh_av = hitung_hrh($hrh_av, $ar_av);	
						sort($hrh_av);
					}
					$m++;
				}
				
				/*
				echo "rh: <br/>"; print_r($hrh); echo "<br/>";
				echo "Format_rh Availability: <br/>"; print_r($hrh_av); echo "<br/>";
				echo "Format_rh reliability : <br/>"; print_r($hrh_re); echo "<br/>";
				//*/
			}
			
			$rh = format_rh($hrh);
			echo "rh: <br/>"; print_r($rh); echo "<br/>";
			$rh_av = format_rh($hrh_av);
			//echo "Format_rh Availability: <br/>"; print_r($rh_av); echo "<br/>";
			$rh_re = format_rh($hrh_re);
			//echo "Format_rh reliability : <br/>"; print_r($rh_re); echo "<br/>";
			
			
			$t = bwaktu($wkt[0]['tgl'])->t;
			$s = bwaktu($wkt[1]['tgl'])->t;
			
			$k=0;
			do {
				$u = $t + (60*60*24*$k);
				$tglx = date('Y-m-d', $u);
				$adatgl = cek_tgl_rh_ada($unit, $tglx);
				//echo "tgl: ";

				if (!isset($rh[$tglx]))	{
					$rh[$tglx] = 24;		//'24:00';
					//echo $tglx.": ".$rh[$tglx].",";
				}
				if (!isset($rh_av[$tglx]))	{
					$rh_av[$tglx] = 24;		//'24:00';
					//echo $tglx.": ".$rh[$tglx].",";
				}
				if (!isset($rh_re[$tglx]))	{
					$rh_re[$tglx] = 24;		//'24:00';
					//echo $tglx.": ".$rh[$tglx].",";
				}
				
				if (count($kw)==0)	{	// hanya ada 1 event
				//	$rh['$tglx']
				}
				//echo "t: $t, u: $u, s: $s ".date('d-m-Y', $u)."<br/>";
				if ($adatgl->jml==1)	{
					$dtrh = array(
						'eq'	=> $eq,
						'tgl'	=> $tglx,
						'rh'	=> $rh[$tglx],
						'rh_av'	=> $rh_av[$tglx],
						'rh_re' => $rh_re[$tglx],
						'flag'	=> "e".implode("e", $idAr),
						'bln'	=> bwaktu($tglx)->bln,
						'thn'	=> bwaktu($tglx)->thn,
						//'cat'	=> $cc
					);
					
					$this->runninghour->insert_rh($dtrh);
					
					/*
					$sql = "UPDATE rh_201311 SET rh='{$rh[$tglx]}',rh_av='{$rh_av[$tglx]}',rh_re='{$rh_re[$tglx]}' where id = ".$adatgl->id[0];
					//echo "sql: $sql<br/>";
					$q = db_query($sql);
					//*/
				}
				$k++;
			} while($u<$s);
			
			
			$jsonResult = array(
				'success' => true,
				'tasks' => $hasil
			);
		}
		catch (Exception $e)	{
			 $jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		
		$hsl = array();
		$hsl['json'] = $jsonResult;
		$this->output->set_content_type('application/json');
		$this->output->set_output(json_encode($jsonResult));
		//echo json_encode($jsonResult);
		
	}
}

