<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class uDaftarG extends CI_Controller {
	
	public function index()	{
		
		try	{
			$params = json_decode(file_get_contents('php://input'));
			/*
			$params = new stdClass();
			$params->id = 'e137e138';
			$params->lok = '';
			$params->nama = '';
			$params->downt = '2014-08-22';
			$params->downj = '02:00' ;
			$params->upt = '2014-08-22';
			$params->upj = '02:15'; 
			$params->event = '1' ;		// 1: standby
			$params->idevent = ''; 
			$params->tipeev = '';
			$params->ket ='';
			$params->exe = '';
			
			//print_r($params); echo "<br/>";
			//*/
			if (!isset($params))	{
				throw new Exception("Data Tidak ada !!");
			}
			
			$edit = isset($params->edit)?$params->edit:0;
			//$eq = isset($params->eqid)?$params->eqid:"0";
			//echo "edit: $edit-----<br/>";
			$aw = bwaktu($params->downt, $params->downj);
			$ak = bwaktu($params->upt, $params->upj);
			$sw = isset($params->startt)?bwaktu($params->startt, $params->startj):0;
			$sk = isset($params->startt)?bwaktu($params->endt, $params->endj):0;
			//echo "aw: {$aw->t}, ak: {$ak->t}<br/>";

			if ($aw->t > $ak->t)	{
				throw new Exception("Waktu tidak sesuai !!<br/>Input Data Tidak disimpan");
			}
			
			$xid = $params->id; $idAr = array(); $catAr = array(); $idJml=0;
			$cc = isset($params->cat)?:0;
			$server = isset($params->server)?$params->server:0;
			$idid = 0;
			
			$this->load->model('waktudown');
			$this->load->model('option');
			$this->load->model('runninghour');
			$this->load->model('equip');
			
			$tole = $this->option->cek_tole_hari();
			
			if (intval($xid)==0) {
				//echo "xid: $xid<br/>";
				$level = substr($xid,0,1);
				$id = substr($xid,1);
				//echo "level: $level, id: $id<br/>";
				if ($level=='e')	{	// level equipment
					$idid = array_unique(array_filter(explode("e",$id)));	// id dari id
					$idJml = count($idid);
					$hsl = $this->waktudown->get_waktudown_edit($idid);
					$unit = $hsl[0]->unit_id;
					$eqeq = $hsl[0]->eqeq;
					//print_r($idid);
					//echo "<br/><br/>"; print_r($hsl); echo "<br/><br/><br/>";
					
					$bts = goleki_wayah($params->downt, $params->upt, $hsl[0]->downt, $hsl[0]->upt, $tole);
					//echo "jml: ".count($hsl);

				} else if ($level=='u')	{	// level unit
					$unit = $id;
					$hh = $this->equip->get_equip_concat($unit);					
					$eqeq = $hh[0]->eqeq;
					$idAr = explode("e",$eqeq);
					$catAr = explode("e",$hh[0]->cat);
					$idJml = count($idAr);

					$bts = array(
						'baw_a' => hari_dengan_tole($params->downt,-$tole),
						'baw_b' => hari_dengan_tole($params->downt,$tole),
						'bak_a' => hari_dengan_tole($params->upt,-$tole),
						'bak_b' => hari_dengan_tole($params->upt,$tole),
					);
				} else {
					//echo "masuk sini<br/>";
					exit;
				}
			}
			//return;
			//echo "<br/>idAr: ";print_r($idAr); echo "-------<br/><br/>";
			// CEK WAKTU range di database

			$wkt = $this->waktudown->get_waktudown($unit,$params->downt,$params->downj,$params->upt,$params->upj,0,
			//$wkt = $this->waktudown->get_waktudown($eq,$params->downt,$params->downj,$params->upt,$params->upj,0,
					$params->event, $edit, $idid, $bts['baw_a'], $bts['baw_b'], $bts['bak_a'], $bts['bak_b'] );
			//		hari_dengan_tole($params->downt,-$tole),hari_dengan_tole($params->downt,$tole),
			//		hari_dengan_tole($params->upt,-$tole),hari_dengan_tole($params->upt,$tole) );

			//echo "Cek waktu range: <br/>";	print_r($wkt); echo "<br/><br/>";
			
			$kw = kombinasi_waktu($wkt->dt, $wkt->dj, $wkt->ut, $wkt->uj);
			//echo "kombinasi waktu: ".count($kw)."<br/>"; print_r($kw);	echo "<br/>";
			
			if (count($kw)>0)	{
				for ($i=0; $i<count($kw); $i++)	{
					$taw1 = bwaktu($kw[$i][0],$kw[$i][1]);	//echo "taw1 : ".$taw1->t."<br/>";
					$taw2 = bwaktu($kw[$i][4],$kw[$i][5]);	//echo "taw2 : ".$taw2->t."<br/>";
					$tak1 = bwaktu($kw[$i][2],$kw[$i][3]);	//echo "tak1 : ".$tak1->t."<br/>";
					$tak2 = bwaktu($kw[$i][6],$kw[$i][7]);	//echo "tak2 : ".$tak2->t."<br/>";
					//echo "taw1 : ".$taw1->t.", taw2 : ".$taw2->t.", tak1 : ".$tak1->t.", tak2 : ".$tak2->t."<br/>";
					$crash = hitung_crash($tak1->t, $tak2->t, $taw1->t, $taw2->t);
					//echo "------------------crash: $crash<br/>";
					if ($crash>0)
						throw new Exception("Waktu Konflik dengan Kegagalan Lain selama $crash jam");
				}
			}
			//return;
			$ar=array();	$ar_av=array();	$ar_re=array();	$l=0; $m=0;
			for ($k=0; $k<count($wkt->dt); $k++)	{
				//echo "$k: ".$wkt->dt[$k].", event: ".$wkt->ev[$k]."<br/>";
				$ar = rh($wkt->dt[$k], $wkt->dj[$k], $wkt->ut[$k], $wkt->uj[$k]);
				if ($k==0)	{
					$hrh = $ar;
				}
				else {
					$hrh = hitung_hrh($hrh, $ar);		
					sort($hrh);
				}
				
				if ($wkt->ev[$k]==4) {		// Reliability
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
				//echo "<br/>hrh_re: "; print_r($hrh_re);
				
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
				//echo "<br/>hrh_av: "; print_r($hrh_av);
				//echo "jmlAr[$k]: ".sizeof($ar)."<br/>"; print_r($ar);  
				//echo "<br/>---------------------<br/>";
			}
			
			$rh = format_rh_float($hrh);
			$rh_av = isset($hrh_av)?format_rh_float($hrh_av):array();
			$rh_re = isset($hrh_re)?format_rh_float($hrh_re):array();
			/*
			echo "<br/>Format_rh RunnningHour: "; print_r($rh); echo "<br/>";
			echo "Format_rh Availability: "; print_r($rh_av); echo "<br/>";
			echo "Format_rh Reliability : "; print_r($rh_re); echo "<br/><br/>";
			//*/
			$k=0;	
			$t = bwaktu($params->downt)->t;
			$s = bwaktu($params->upt)->t;
			//echo "awal: $t, akhir: $s<br/>";
			//*
			if ($edit)	{		// koreksi batas waktu
				//echo $hsl[0]->downt." --- ".$hsl[0]->upt;
				//echo(bwaktu($hsl[0]->downt)->t);
				$t = (bwaktu($hsl[0]->downt)->t<$t)?bwaktu($hsl[0]->downt)->t:$t;
				$s = (bwaktu($hsl[0]->upt)->t>$s)?bwaktu($hsl[0]->upt)->t:$s;
			}
			//*/
			
			//return;
			// ----------------- ISI TABEL RUNNING HOUR -------------------
			//*
			do {
				$u = $t + (60*60*24*$k);
				//echo "t: $t, u: $u, s: $s ".date('d-m-Y', $u)."<br/>";
				$tglx = date('Y-m-d', $u);
				
				//echo "id: $id, tglx: $tglx<br/>";
				$adatgl = $this->runninghour->cek_tgl_rh_ada($unit, $tglx);	
				//print_r($adatgl);

				$dtrh = array(
					'eq'	=> $unit,
					'tgl'	=> $tglx,
					'rh'	=> isset($rh[$tglx])?$rh[$tglx]:24,
					'rh_av'	=> isset($rh_av[$tglx])?$rh_av[$tglx]:24,
					'rh_re' => isset($rh_re[$tglx])?$rh_re[$tglx]:24,
					'flag'	=> "e".$eqeq,
					'bln'	=> bwaktu($tglx)->bln,
					'thn'	=> bwaktu($tglx)->thn,
					'cat'	=> $params->cat
				);
				//*
				if ($adatgl->jml==0)	{
					//echo "insert_rh";
					$this->runninghour->insert_rh($dtrh);
				} else {
					if ($adatgl->jml==1) {
						//echo "upate_rh";
						$this->runninghour->update_rh($dtrh,$adatgl->id[0]->id);
					}
				}
				//*/
				$k++;
			} while($u<$s);
			//return;
			
			$pm = array();
			$jmlpm = count($params->tipeev)>0?count($params->tipeev):0;

			//$tipeev = array("e34pm1", "e33pm15");
			if ($jmlpm)	{
				//echo "jmlpm: $jmlpm, tipeev: {$params->tipeev}<br/>";
				for($i=0; $i<$jmlpm; $i++)	{
					//echo "PM: {$params->tipeev[$i]}<br/>";
					$pmx  = explode("pm", $params->tipeev[$i]);
					$ideq = explode("e", $pmx[0]);
					//echo "id: {$ideq[1]}<br/>";
					$pm[$i][0] = $ideq[1];
					$pm[$i][1] = $pmx[1];
					//*/
				}
				/*
				echo "pmx: "; print_r($pmx); echo "<br/>";
				echo "pm: "; print_r($pm); echo "<br/>";
				echo "eq: "; print_r($ideq); echo "<br/>";
				//*/
			}
			
			// ------------- ISI TABEL WAKTUDOWN ----------------- //
			$now = date("Y-m-d H:i:s");
			$hasil = array();	$insrt = 0;
			if ($level=='u') {
				//echo "waktudown unit insert<br/>";
				for($i=0; $i<$idJml; $i++)	{
						$data = array(
							'server' => $server,
							'eqid'	 => $idAr[$i],
							'unit_id'=> $id,
							'downt'	 => $params->downt,
							'downj'	 => $params->downj,
							'upt'	 => $params->upt,
							'upj'	 => $params->upj,
							'event'	 => $params->event,
							'ket'	 => $params->ket,
							'exe'	 => $params->exe,
							'nginput'=> $now
						);
						for($w=0; $w<$jmlpm; $w++)	{
							if ($idAr[$i]==$pm[$w][0])	break;
						}
						$repair = array(
							'tipeev' => isset($pm[$w][1])?$pm[$w][1]:'',
							'startt' => isset($params->startt)?$params->startt:date('Y-m-d'),
							'startj' => isset($params->startj)?$params->startj:date('H:i'),
							'endt'	 => isset($params->endt)?$params->endt:date('Y-m-d'),
							'endj'	 => isset($params->endj)?$params->endj:date('H:i')
						);
						$insrt += (int) $this->waktudown->insert_waktudown($params->event,$data,$repair);
				}
				if ($insrt>0)	{
					$hasil = $this->waktudown->get_waktudown_limit($insrt);
				}
			}
			else if ($level=='e')	{
				$idid = array_unique($idid);
				$arx = $this->waktudown->get_waktudown_equip($idid);

				//$idid = 0;
				$i = 0;
				//for ($i=0; $i<count($arx); $i++)	{
				foreach($idid as $idx)	{
					$data = array(
						'server' => $server,
						//'eqid'	 => $idAr[$i],
						'downt'	 => $params->downt,
						'downj'	 => $params->downj,
						'upt'	 => $params->upt,
						'upj'	 => $params->upj,
						'event'	 => $params->event,
						'ket'	 => $params->ket,
						'exe'	 => $params->exe,
						'nginput'=> $now
					);
					for($w=0; $w<$jmlpm; $w++)	{
						if ($idAr[$i]==$pm[$w][0])	break;
					}
					$repair = array(
						'tipeev' => ($params->event==2)?$pm[$w][1]:'-',
						'startt' => isset($params->startt)?$params->startt:date('Y-m-d'),
						'startj' => isset($params->startj)?$params->startj:date('H:i'),
						'endt'	 => isset($params->endt)?$params->endt:date('Y-m-d'),
						'endj'	 => isset($params->endj)?$params->endj:date('H:i')
					);
					//echo "event: {$params->event}, id: ".$idid[$i]."<br/>";
					//echo "id: ".$idid[$i]." ---- 350<br/>";
					//echo "repair: ";	print_r($repair); echo "<br/>";
					$insrt += (int) $this->waktudown->update_waktudown($params->event, $idx, $data, $repair);
					
					$i++;
				}
				if ($insrt>0)	{
					$hasil = $this->waktudown->get_waktudown_limit($insrt);
				}
			}
		
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
		
		
		//$hasil['json'] = $jsonResult;
		//$this->output->set_content_type('application/json');
		//$this->output->set_output(json_encode($jsonResult));
		echo json_encode($jsonResult);
		
	}
}

