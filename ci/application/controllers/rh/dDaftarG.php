<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class dDaftarG extends CI_Controller {
	
	public function index()	{
		try	{
			$params = json_decode(file_get_contents('php://input'));
			/*
			$params = new stdClass();
			$params->eqid = '21';
			$params->lok = '';
			$params->nama = '';
			$params->downt = '2014-08-22';
			$params->downj = '00:15' ;
			$params->upt = '2014-08-22';
			$params->upj = '00:30'; 
			$params->event = '1' ;
			$params->id = "e131e132";
			print_r($params); echo "<br/>";
			//*/
			if (!isset($params))	{
				throw new Exception("Data Tidak ada !!");
			}
			
			$id = isset($params->id)?$params->id:"e0";
			$eq = isset($params->eqid)?$params->eqid:0;
			$ids = array_filter(explode("e",$id));
						
			$this->load->model('waktudown');
			$this->load->model('runninghour');
			$this->load->model('option');
			
			//$hasil = $this->waktudown->delete_waktudown($ids);
			$tole = $this->option->cek_tole_hari();
			//echo "eq: $eq, tole: $tole, ids: "; print_r($ids); echo "<br/>";
			
			$edit = 1; $idid = $ids;
			$wkt = $this->waktudown->get_waktudown($eq,$params->downt,$params->downj,$params->upt,$params->upj,1,
					$params->event, $edit, $idid,
					hari_dengan_tole($params->downt,-$tole),hari_dengan_tole($params->downt,$tole),
					hari_dengan_tole($params->upt,-$tole),hari_dengan_tole($params->upt,$tole) );
			
			//echo "wkt: "; print_r($wkt); echo "<br/>";
			//return;
			//$wktrange = cek_waktu_range($idwd,$wkt[0]['tgl'],$wkt[0]['jam'],$wkt[1]['tgl'],$wkt[1]['jam'], 1);
			//echo "jml: ".count($wkt)."<br/>";
			if (isset($wkt->dt))	{
				$wkt_unik = $wkt->dt;
				$jmlw = count($wkt->dt);
				$kw = kombinasi_waktu($wkt->dt, $wkt->dj, $wkt->ut, $wkt->uj);
				//echo "kombinasi: "; print_r($kw);	echo "<br/>";
			}
			else {
				$jmlw = 0;
			}
			//echo "jml: $jmlw<br/>";
			
			$ar=array();	$ar_av=array();	$ar_re=array();	$l=0; $m=0;
			for ($k=0; $k<$jmlw; $k++)	{
			//	echo "$k $jmlw : ".$wkt->dt[$k].", event: ".$wkt->ev[$k]."<br/>";
				$ar = rh($wkt->dt[$k], $wkt->dj[$k], $wkt->ut[$k], $wkt->uj[$k]);
				//echo "jmlAr[$k]: ".sizeof($ar)."<br/>"; print_r($ar);  

				if ($k==0)	$hrh = $ar;
				else {
					$hrh = hitung_hrh($hrh, $ar);
					sort($hrh);
				}
				
				if ($wkt->ev[$k]==4) {		// Reliability: 4: Breakdown
					$ar_re = rh($wkt->dt[$k], $wkt->dj[$k], $wkt->ut[$k], $wkt->uj[$k]);
					if ($l==0)	{
						$hrh_re = $ar_re;
					}
					else {
						$hrh_re = hitung_hrh($hrh_re, $ar_re);	
						sort($hrh_re);
					}
					$l++;
				}
				if (($wkt->ev[$k])>1) {		// Availability
					$ar_av = rh($wkt->dt[$k], $wkt->dj[$k], $wkt->ut[$k], $wkt->uj[$k]);
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
			
			
			if ($jmlw>0)	{
				$rh = format_rh($hrh,"");
				$rh_av = isset($hrh_av)?format_rh($hrh_av, $hrh):array();
				$rh_re = isset($hrh_re)?format_rh($hrh_re, $hrh):array();
				
				//$t = isset($wkt[0])?bwaktu($wkt[0]['tgl'])->t:strtotime($params->downt);
				//$s = isset($wkt[1])?bwaktu($wkt[1]['tgl'])->t:strtotime($params->upt);
				/*
				echo "Format rh: <br/>"; print_r($rh); echo "<br/>";
				echo "Format_rh Availability: <br/>"; print_r($rh_av); echo "<br/>";
				echo "Format_rh reliability : <br/>"; print_r($rh_re); echo "<br/>";
				//*/
			}
			//echo "waktu: ".$wkt[0];	//.", bwaktu: ".bwaktu($wkt[0]['tgl']);	//.",strd: ".strtotime($params->downt);
			//echo "waktu: ".strtotime($params->downt);
			$t = isset($t)?$t:strtotime($params->downt);
			$s = isset($s)?$s:strtotime($params->upt);

			//return;
			
			$t = strtotime($params->downt)<$t?strtotime($params->downt):$t;
			$s = strtotime($params->upt)>$s?strtotime($params->upt):$s;
			
			
			$k=0;
			do {
				$u = $t + (60*60*24*$k);
				$tglx = date('Y-m-d', $u);
				//echo "eq: $eq, u: $u, tgl: $tglx<br/>";
				$adatgl = $this->runninghour->cek_tgl_rh_ada($eq, $tglx);
				//echo "tgl[$tglx]: $adatgl<br/>";

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

				$dtrh = array(
					'eq'	=> $eq,
					'tgl'	=> $tglx,
					'rh'	=> $rh[$tglx],
					'rh_av'	=> $rh_av[$tglx],
					'rh_re' => $rh_re[$tglx]
				);
				
				if ($adatgl->jml==1)	{
					$this->runninghour->update_rh($dtrh, $adatgl->id[0]->id);
				} 
				else {
					
					$this->runninghour->insert_rh($dtrh);
				}
				$k++;
			} while($u<$s);
			
			$hasil = $this->waktudown->delete_waktudown($ids);
			//print_r($hasil);
			
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

