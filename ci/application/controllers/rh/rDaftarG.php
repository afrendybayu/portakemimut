<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rDaftarG extends CI_Controller {
	
	public function index()	{
		
		try {
			$this->load->model('option');
			$this->load->model('waktudown');
			
			$yl = $this->option->cek_bulan_gagal();
			//echo "yl: $yl<br/>";
			
			if ($this->input->get('tw') && $this->input->get('tk'))	{
				$tglaw = $this->input->get('tw');
				$tglak = $this->input->get('tk');
				
				if (strtotime($tglak)>=strtotime("now"))	{
					//echo "1 akhir ngebut<br/>";
					$tglak = date('Y-m-d');
					if (strtotime($tglaw)>=strtotime("now"))	{
						//echo "1 awal ngebut<br/>";
						$tglaw = date('Y-m-01', strtotime("-$yl month"));
					}
					else {
						$tglaw = date('Y-m-d', strtotime($tglaw));
					}
					//echo "masuk sini<br/>";
				}
				else if (strtotime($tglaw)>=strtotime("now"))	{
					//echo "2 awal ngebut<br/>";
					$tglaw = date('Y-m-01', strtotime("-$yl month"));
					if (strtotime($tglak)>=strtotime("now"))	{
						$tglak = date('Y-m-d');
					}
					else {
						$tglak = date('Y-m-d', strtotime($tglak));
					}
				}
				else {
					//echo "normatif<br/>";
					$tglaw = date('Y-m-d', strtotime($tglaw));
					$tglak = date('Y-m-d', strtotime($tglak));
				}
				//echo "tgl aw: $tglaw, ak: $tglak<br/>";
			}
			else {
				$tglak = date('Y-m-d');
				$tglaw = date('Y-m-01', strtotime("-$yl month"));
			}
			
			if (strtotime($tglak)==strtotime($tglaw))	{
				$tglak = date('Y-m-d');
				$tglaw = date('Y-m-01', strtotime("-$yl month"));
			}
			//echo "----> awal: $tglaw, akhir: $tglak<br/>";
			$hsl = $this->waktudown->get_waktudown_list($tglaw, $tglak);
			
			
			$jsonResult = array(
				'success' => true,
				'gagal' => $hsl
			);
		}
		catch (Exception $e)	{
			 $jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		//$this->load->view('welcome_message');
		//$this->output->set_content_type('application/json');
		//$this->output->set_output(json_encode($jsonResult));
		echo json_encode($jsonResult);
	}
	
	public function indexx()	{
		
		try	{
			$yl = 2;		// TOTAL LIST 2 BULAN
			if ($this->input->get('tw') && $this->input->get('tk'))	{
				$tglaw = $this->input->get('tw');
				$tglak = $this->input->get('tk');
				
				if (strtotime($tglak)>=strtotime("now"))	{
					//echo "1 akhir ngebut<br/>";
					$tglak = date('Y-m-d');
					if (strtotime($tglaw)>=strtotime("now"))	{
						//echo "1 awal ngebut<br/>";
						$tglaw = date('Y-m-01', strtotime("-$yl month"));
					}
					else {
						$tglaw = date('Y-m-d', strtotime($tglaw));
					}
					//echo "masuk sini<br/>";
				}
				else if (strtotime($tglaw)>=strtotime("now"))	{
					//echo "2 awal ngebut<br/>";
					$tglaw = date('Y-m-01', strtotime("-$yl month"));
					if (strtotime($tglak)>=strtotime("now"))	{
						$tglak = date('Y-m-d');
					}
					else {
						$tglak = date('Y-m-d', strtotime($tglak));
					}
				}
				else {
					//echo "normatif<br/>";
					$tglaw = date('Y-m-d', strtotime($tglaw));
					$tglak = date('Y-m-d', strtotime($tglak));
				}
				//echo "tgl aw: $tglaw, ak: $tglak<br/>";
			}
			else {
				$tglak = date('Y-m-d');
				$tglaw = date('Y-m-01', strtotime("-$yl month"));
			}
			
			if (strtotime($tglak)==strtotime($tglaw))	{
				$tglak = date('Y-m-d');
				$tglaw = date('Y-m-01', strtotime("-$yl month"));
			}
			
			//$yl = 2;		// TOTAL LIST 2 BULAN
			//$tglaw = date('Y-m-01', strtotime("-$yl month"));
			//echo "----> awal: $tglaw, akhir: $tglak<br/>";

			$sql =  "SELECT waktudown.id,event as idevent,tipeev ".
					",(select pmdef.nama from pmdef where pmdef.id = (select pmlist.pm from pmlist where pmlist.id=tipeev)) as namapm ".
					",eqid,waktudown.unit_id,kode".
					",(select nama from failuremode where failuremode.id = event.fm) as fm".
					",downt,downj,upt,upj,startt,startj,endt,endj,waktudown.ket,exe ".
					",(select hirarki.nama from hirarki where hirarki.id ".
					"	= (select hirarki.parent from hirarki where hirarki.id ".
					"	= (select hirarki.parent from hirarki where hirarki.id = equip.unit_id))) as lok ".
					",listEvent.nama as event, equip.unit_id ".
					",(select nama from hirarki where hirarki.id = (select unit_id from equip where id = waktudown.eqid)) as nama ".
					"FROM waktudown ".
					"LEFT JOIN listEvent ON listEvent.id = waktudown.event ".
					"LEFT JOIN equip ON equip.id = waktudown.eqid ".
					"LEFT JOIN event ON event.down_id = waktudown.id ".
					"WHERE downt BETWEEN ? AND ? ".
					"order by downt desc, downj desc, id desc";
			//echo "sql: $sql, tglaw: $tglaw, tglak: $tglak<br/>";
			$query = $this->db->query($sql, array($tglaw,$tglak));
			
			$isi = array();	$jml=0;
			$dd = ''; $td = '';
			//echo "jml: {$query->num_rows()}<br/>";
			if ($query->num_rows() > 0)	{
				foreach ($query->result() as $row)	{
					//print_r($row); echo "<br/>";
					//echo "id: {$row->id}, event: {$row->idevent},pm: {$row->namapm}<br/>";
					if (($row->downt==$dd) && ($row->downj==$td)) {
						//echo "----------------->SAMA: $dd - $td <br/>";
						$isi[$jml]['id'] .= 'e'.$row->id;
						$ax = $row->idevent;
						if ($ax==2) {
							//echo "masuk 2 ".$row->namapm."<br/>";
							//if (isset($row->namapm) && isset($isi[$jml]['fm'])) {
							if (isset($row->namapm) ) {
								//echo "krsini <br/>";
								//*
								if (isset($isi[$jml]['fm']))	{
									$isi[$jml]['fm'] .= "&nbsp;&nbsp;";
								}
								//*/
								if (isset($isi[$jml]['fm']))
									$isi[$jml]['fm'] .= "[{$row->kode}: {$row->namapm}]";
								else
									$isi[$jml]['fm'] = "[{$row->kode}: {$row->namapm}]";
								$isi[$jml]['tipeev'] .= ",".'e'.$row->eqid.'pm'.$row->tipeev;
							}
							
						} else if (($ax==3) || ($ax==4)) {
							//echo "fm: {$row['fm']}<br/>";
							if (isset($row->fm) && ($row->fm!=""))	{
								if ( isset($isi[$jml]['fm']))	{
									$isi[$jml]['fm'] .= "&nbsp;&nbsp;[{$row->kode}: {$row->fm}]";
								}
								else 
									$isi[$jml]['fm'] = "[{$row->kode}: {$row->fm}]";
							}
						}
					} else {
						$jml++;
						$mdar = Array();
					//if (($row['downt']!=$dd) && ($row['downj']!=$td)) {
						$isi[$jml]['event'] = $row->event;
						$isi[$jml]['eqid'] = $row->unit_id;
						$isi[$jml]['id'] = 'e'.$row->id;
						$isi[$jml]['unit_id'] = $row->unit_id;
						$isi[$jml]['nama'] = $row->nama;
						$isi[$jml]['lok'] = $row->lok;
						$isi[$jml]['idevent'] = $row->idevent;
						$isi[$jml]['ket'] = $row->ket;
						$isi[$jml]['exe'] = $row->exe;
						$isi[$jml]['tipeev'] = 'e'.$row->eqid.'pm'.$row->tipeev;
						
						if ($row->idevent==1) { 		// standby
							$isi[$jml]['startt'] = '';		$isi[$jml]['startj'] = '';
							$isi[$jml]['endt'] = '';		$isi[$jml]['endj'] = '';
							$isi[$jml]['tipeev'] = '';
							$isi[$jml]['idevent'] = $row->idevent;
						} else if ($row->idevent==2) {	// PM
							$isi[$jml]['startt'] = date('d-m-Y',strtotime("{$row->startt} {$row->startj}"));
							$isi[$jml]['startj'] = date('H:i',	strtotime("{$row->startt} {$row->startj}"));
							$isi[$jml]['endt'] = date('d-m-Y',	strtotime("{$row->endt} {$row->endj}"));
							$isi[$jml]['endj'] = date('H:i',	strtotime("{$row->endt} {$row->endj}"));
							//echo "{$row->idevent} <br/>";//fm: {$row['namapm']}
							if (isset($row->namapm)) {
								//echo "---- ada fm<br/>";
								$isi[$jml]['fm'] = "[{$row->kode}: {$row->namapm}]";
							}
						} else {
							$isi[$jml]['startt'] = date('d-m-Y',strtotime("{$row->startt} {$row->startj}"));
							$isi[$jml]['startj'] = date('H:i',	strtotime("{$row->startt} {$row->startj}"));
							$isi[$jml]['endt'] = date('d-m-Y',	strtotime("{$row->endt} {$row->endj}"));
							$isi[$jml]['endj'] = date('H:i',	strtotime("{$row->endt} {$row->endj}"));
							
							//echo $row->kode." > ".$row->fm."----<br/>";
							if (isset($row->fm) && $row->fm!='') {
								$isi[$jml]['fm'] = "[{$row->kode}: {$row->fm}]";
								//array_push($tar,$row['fm']);
								//$mdar[$row['kode']] = $row['kode'];
								//array_push($mdar,$tar);
								//print_r($mdar);
								//echo $row['kode']." > ".$row['fm']."----<br/>";
							}
						}
						$isi[$jml]['downt'] = date('d-m-Y',strtotime("{$row->downt} {$row->downj}"));
						$isi[$jml]['downj'] = date('H:i',	strtotime("{$row->downt} {$row->downj}"));
						$isi[$jml]['upt'] = date('d-m-Y',	strtotime("{$row->upt} {$row->upj}"));
						$isi[$jml]['upj'] = date('H:i',	strtotime("{$row->upt} {$row->upj}"));
						
						$dd = $row->downt;	$td = $row->downj;
					//} else {
						//echo ($jml)." >> AWAL: $dd - $td<br/>";
					}
				}
			}
			
			//echo "<br/><br/>";print_r($isi);
			
			$hsl = array();
			foreach ($isi as $data)	{
				//print_r($data); echo "<br/>===========================<br/>";
				array_push($hsl, $data);
			}
			
			$jsonResult = array(
				'success' => true,
				'gagal' => $hsl
			);
		}
		catch (Exception $e)	{
			 $jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		//$this->load->view('welcome_message');
		//$this->output->set_content_type('application/json');
		$this->output->set_output(json_encode($jsonResult));
		//echo json_encode($jsonResult);
	}
}
