<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class uDaftarG extends CI_Controller {
	
	public function index()	{
		
		try	{
			$params = json_decode(file_get_contents('php://input'));
			/*
			$params = new stdClass();
			$params->id = 'u22';
			$params->lok = '';
			$params->nama = '';
			$params->downt = '2014-07-08';
			$params->downj = '10:30' ;
			$params->upt = '2014-07-09';
			$params->upj = '20:40'; 
			$params->event = '4' ;		// 1: standby
			$params->idevent = ''; 
			$params->tipeev = '';
			$params->ket ='';
			$params->exe = '';
			//*/
			$edit = isset($params->edit)?$params->edit:0;
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
			
			//echo "tipeev: $tipeev<br/>";
			$cc = isset($params->cat)?:0;
			$server = isset($params->server)?$params->server:0;
			$idid = 0;
			
			$this->load->model('waktudown');
			$this->load->model('option');
			$this->load->model('runninghour');
			
			if (intval($xid)==0) {
				//echo "xid: $xid<br/>";
				$level = substr($xid,0,1);
				$id = substr($xid,1);
				//echo "level: $level, id: $id<br/>";
				if ($level=='e')	{	// level equipment
					$idid = array_filter(explode("e",$id));	// id dari id
					//echo "idid: "; print_r($idid); echo "<br/><br/>";
					$sql = "SELECT eqid,unit_id,id from waktudown where id in (".implode(',',$idid).")";
					//echo "sql u: $sql<br/>";
					
					$query = $this->db->query($sql);
					//$aksi = array();
					if ($query->num_rows() > 0)	{
						foreach ($query->result() as $row)	{
							$idAr[$idJml]  = $row->eqid;
							$id = $row->unit_id;
							$idJml++;
						}
					}
					//echo "level e"; print_r($idAr);
				} else if ($level=='u')	{	// level unit
					$sql = "SELECT id,cat from equip where unit_id = $id";
					//echo "unit sql: $sql<br/>";

					$query = $this->db->query($sql);
					//$aksi = array();
					if ($query->num_rows() > 0)	{
						foreach ($query->result() as $row)	{
							$idAr[$idJml]  = $row->id;
							$catAr[$idJml] = $row->cat;
							$idJml++;
						}
					}
					//mysql_free_result($q);
					//print_r($idAr);
				} else {
					//echo "masuk sini<br/>";
					exit;
				}
			}
			//echo "<br/>idAr: ";print_r($idAr); echo "-------<br/><br/>";
			// CEK WAKTU range di database
			
			$tole = $this->option->cek_tole_hari();
			
			//*
			//print_r($idid);
			$wkt = $this->waktudown->get_waktudown($idAr[0],$params->downt,$params->downj,$params->upt,$params->upj,0,
					$params->event, $edit, $idid,
					hari_dengan_tole($params->downt,-$tole),hari_dengan_tole($params->downt,$tole),
					hari_dengan_tole($params->upt,-$tole),hari_dengan_tole($params->upt,$tole) );
			//*/
			//$wkt = cek_waktu_range($idAr[0], $params->downt, $params->downj, $params->upt, $params->upj,0, $params->event, $edit, $idid);

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
					//die();
					//if ($crash>0)	exit;
				}
			}
			
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

				/*
				echo "<br/>Format_hrh RunnningHour: "; print_r($hrh); echo "<br/>";
				echo "Format_hrh Availability: "; print_r($hrh_av); echo "<br/>";
				echo "Format_hrh Reliability : "; print_r($hrh_re); echo "<br/><br/>";
				//*/
			}
			
			$rh = format_rh_float($hrh);
			//echo "<br/>Format_rh RunnningHour: "; print_r($rh); echo "<br/>";
			//$rh_av = format_rh($hrh_av);
			$rh_av = isset($hrh_av)?format_rh_float($hrh_av):array(date('Y-m-d') => 24);
			//echo "Format_rh Availability: "; print_r($rh_av); echo "<br/>";
			//$rh_re = format_rh($hrh_re);
			$rh_re = isset($hrh_re)?format_rh_float($hrh_re):array(date('Y-m-d') => 24);
			//echo "Format_rh Reliability : "; print_r($rh_re); echo "<br/><br/>";
			
			$k=0;	
			// $params->downt = '2013-12-16';
			// $params->upt = '2013-12-17';
			$t = bwaktu($params->downt)->t;
			$s = bwaktu($params->upt)->t;
			
			//echo "<br/>jml tgl: ".count($tgl)."<br/>";
			//*
			do {
				$u = $t + (60*60*24*$k);
				//echo "t: $t, u: $u, s: $s ".date('d-m-Y', $u)."<br/>";
				$tglx = date('Y-m-d', $u);
				
				//echo "id: $id, tglx: $tglx<br/>";
				$adatgl = $this->runninghour->cek_tgl_rh_ada($id, $tglx);	
				//print_r($adatgl);
				//$jmlTgl = count($adatgl);
				
				if(!isset($rh_av[$tglx]))	{
					//echo "tgl: $tglx tidak ada, Av: 24:00<br/>";
					//$rh_av[$tglx] = "24:00";
					$rh_av[$tglx] = "24";
				}
				//*
				if(!isset($rh_re[$tglx]))	{
					//echo "tgl: $tglx tidak ada, Re: 24:00<br/>";
					//$rh_re[$tglx] = "24:00";
					$rh_re[$tglx] = "24";
				}
				
				$dtrh = array(
					'eq'	=> $id,
					'tgl'	=> $tglx,
					'rh'	=> $rh[$tglx],
					'rh_av'	=> $rh_av[$tglx],
					'rh_re' => $rh_re[$tglx],
					'flag'	=> "e".implode("e", $idAr),
					'bln'	=> bwaktu($tglx)->bln,
					'thn'	=> bwaktu($tglx)->thn,
					'cat'	=> $cc
				);
				//*
				if ($adatgl->jml==0)	{
					
					$this->runninghour->insert_rh($dtrh);
					/*
					$sql =	"INSERT INTO rh_201311 (eq,tgl,rh,rh_av, rh_re,flag,bln,thn,cat) VALUES ".
							"('{$id}','$tglx','{$rh[$tglx]}','{$rh_av[$tglx]}','{$rh_re[$tglx]}','e".implode("e", $idAr)."',".
							"'".bwaktu($tglx)->bln."','".bwaktu($tglx)->thn."','$cc')";
					echo "sql: $sql<br/>";
					$q = db_query($sql);
					echo "sql: $sql<br/>";
					//*/
				} else {
					if ($adatgl->jml==1) {
						$this->runninghour->update_rh($dtrh,$adatgl->id[0]->id);
						/*
						//$sql = "UPDATE rh_201311 SET rh='".$rh[$tglx]."' where id = ".$adatgl->id[0];
						$sql =  "UPDATE rh_201311 SET rh='{$rh[$tglx]}',rh_av='{$rh_av[$tglx]}',rh_re='{$rh_re[$tglx]}', ".
								"bln='".bwaktu($tglx)->bln."',thn='".bwaktu($tglx)->thn."' ".
								"where id = ".$adatgl->id[0]->id;
						$q = db_query($sql);
						//*/
					}
				}
				//*/
				$k++;
			} while($u<$s);
			
			$pm = array();
			//echo "tipeev: $tipeev,".strlen($tipeev)."<br/>";

			$jmlpm = count($params->tipeev)>0?count($params->tipeev):0;
			//echo "jmlpm: $jmlpm";
			//$tipeev = array("e34pm1", "e33pm15");
			for($i=0; $i<$jmlpm; $i++)	{
				//*
				$pmx  = explode("pm", $params->tipeev[$i]);
				//print_r($pmx); echo "<br/>";
				$ideq = explode("e", $pmx[0]);
				//echo "id: {$ideq[1]}<br/>";
				$pm[$i][0] = $ideq[1];
				$pm[$i][1] = $pmx[1];
				//*/
			}
			
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
							'tipeev' => $pm[$w][1],
							'startt' => isset($params->startt)?$params->startt:date('Y-m-d'),
							'startj' => isset($params->startj)?$params->startj:date('H:i'),
							'endt'	 => isset($params->endt)?$params->endt:date('Y-m-d'),
							'endj'	 => isset($params->endj)?$params->endj:date('H:i')
						);
						
						
						$insrt += (int) $this->waktudown->insert_waktudown($params->event,$data,$repair);
						
						/*
						// INPUT data EVENT down ke tabel waktudown
						if ($params->event==1) {		// standby
							
							$sql = "INSERT INTO waktudown (server,eqid,unit_id,downt,downj,upt,upj,event,ket,exe,nginput) ".
									"VALUES ('$server','{$idAr[$i]}','{$id}','{$params->downt}','{$params->downj}', '{$params->upt}', '{$params->upj}', ".
									"'{$params->event}','{$params->ket}','{$params->exe}','{$now}' )";							
						} else {
							for($w=0; $w<$jmlpm; $w++)	{
								if ($idAr[$i]==$pm[$w][0])	break;
							}
							$sql = "INSERT INTO waktudown (server,eqid,unit_id,downt,downj,upt,upj,startt,startj,endt,endj,".
									"event,tipeev,ket,exe,nginput) ".
									"VALUES ('$server','{$idAr[$i]}','{$id}','{$params->downt}','{$params->downj}', '{$params->upt}', '{$params->upj}', ".
									"'{$params->startt}','{$params->startj}', '{$params->endt}', '{$params->endj}',".
									"'{$params->event}','{$pm[$w][1]}','{$params->ket}','{$params->exe}','{$now}' )";
						}
						//echo "sql u: $sql<br/>";
						$q = db_query($sql);
						if (!$q)	{
							echo "DB Error, could not query the database\n";
							echo 'MySQL Error: ' . mysql_error();
							exit;
						} else {
							$sql = "SELECT id, eqid FROM waktudown order by id desc limit 0,1";
							//echo "sql u: $sql<br/>";
							
							$q = db_query($sql);
							$row = mysql_fetch_assoc($q);
							
							$x = new stdClass();
							$x->id = $row['id'];
							$x->eq = $row['eqid'];
							array_push($hasil, $x);
							
							mysql_free_result($q);
						}
						//*/
				}
				if ($insrt>0)	{
					$hasil = $this->waktudown->get_waktudown_limit($insrt);
				}
			}
			else if ($level=='e')	{
				$idid = array_unique($idid);
				$arx = $this->waktudown->get_waktudown_equip($idid);
				
				//print_r($hasil);
				/*
				//echo "idid: "; print_r($idid); echo "<br/>";
				$sql = "SELECT id,eqid AS eq, unit_id FROM waktudown WHERE id IN (".implode(',',$idid).")";
				echo "sql: $sql<br/><br/>";
					
				$q = db_query($sql);
				if (!$q)	{
					throw new Exception("DB Error, could not query the database");
					echo 'MySQL Error: ' . mysql_error();
					exit;
				}
					
				$arx = array();
				while ($row = mysql_fetch_assoc($q)) {
					$arx[] = $row;
				}
				//*/
				//echo "<br/><br/>--- sampai sini sodara2: jml: ".count($arx)."<br/><br/>";
				//echo "ar: "; print_r($arx); echo "<br/>";
				
				//$idid = 0;
				for ($i=0; $i<count($arx); $i++)	{
					$data = array(
						'server' => $server,
						'eqid'	 => $idAr[$i],
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
					$insrt += (int) $this->waktudown->update_waktudown($params->event, $idid[$i], $data, $repair);

					/*
					if ($params->event==1) {		// standby
						//echo " STAND BY";
						$sql = "UPDATE waktudown SET server=$server,eqid='{$idAr[$i]}',downt='{$params->downt}',downj='{$params->downj}',".
							"upt='{$params->upt}',upj='{$params->upj}',event='{$params->event}',ket='{$params->ket}', ".
							"exe='{$params->exe}',nginput='{$now}' ".
							"WHERE id='{$idid[$i]}'";
					} else {
						for($j=0; $j<count($pm); $j++)	{
							if ($pm[$j][0]==$idid[$i])
								break;
						}
						$sql = "UPDATE waktudown SET server=$server,eqid='{$arx[$i]['eq']}',downt='{$params->downt}',downj='{$params->downj}',".
							"upt='{$params->upt}',upj='{$params->upj}',startt='{$params->startt}',startj='{$params->startj}',".
							"endt='{$params->endt}',endj='{$params->endj}',".
							"event='{$params->event}',tipeev='".$pm[$i][1]."',ket='{$params->ket}',exe='{$params->exe}',nginput='{$now}' ".
							"WHERE id='{$arx[$i]['id']}'";
					}
					//echo "<br/>___edit__________sql: $sql";
					
					$q = db_query($sql);
					if (!$q)	{
						//echo "DB Error, could not query the database\n";
						throw new Exception("DB Error, could not query the database");
						echo 'MySQL Error: ' . mysql_error();
						exit;
					}
					//*/
				}
				if ($insrt>0)	{
					$hasil = $this->waktudown->get_waktudown_limit($insrt);
				}
			}
			$jsonResult = array(
				'success' => true,
				'tasks' => $hasil
				//'gagal' => $params
			);
		}
		catch (Exception $e)	{
			 $jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		
		$hasil['json'] = $jsonResult;
		$this->output->set_content_type('application/json');
		$this->output->set_output(json_encode($jsonResult));
		//echo json_encode($jsonResult);
		
	}
}

