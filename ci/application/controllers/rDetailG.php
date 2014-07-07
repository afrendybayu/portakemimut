<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rDetailG extends CI_Controller {
	
	public function index()	{
		//$this->load->view('welcome_message');
		try	{
			$id = $this->input->get('id')?:'0';
			
			$rid = explode("e", $id);
			//print_r(array_filter($rid));
			$rid = array_unique($rid);
			$id = implode(",",array_filter($rid));
			
			//echo "id: $id<br/>";

			$sql =	"SELECT waktudown.id,event as idevent,tipeev,eqid,kode,fm,tag ".
					",(select pmdef.nama from pmdef where pmdef.id = (select pmlist.pm from pmlist where pmlist.id=tipeev)) as namapm ".
					",down_id,exe,downt,downj,upt,upj,startt,startj,endt,endj ".
					",(select hirarki.nama from hirarki where hirarki.id ".
					"	= (select hirarki.parent from hirarki where hirarki.id ".
					"	= (select hirarki.parent from hirarki where hirarki.id = equip.unit_id))) as lok ".
					",listEvent.nama as event, equip.unit_id ".
					",(select nama from hirarki where hirarki.id = (select unit_id from equip where id = waktudown.eqid)) as nama ".
					"FROM waktudown ".
					"LEFT JOIN listEvent ON listEvent.id = waktudown.event ".
					"LEFT JOIN equip ON equip.id = waktudown.eqid ".
					"LEFT JOIN event ON event.down_id = waktudown.id ".
					"LEFT JOIN pmdef ON pmdef.id = waktudown.tipeev ".
					"where waktudown.id in ($id) order by downt desc, downj desc";
			
			//echo "sql: $sql<br/>";
			$query = $this->db->query($sql, $id);
			
			$jml = -1; $idd = -1; $idn = 'e';
			$isi = array(); $dd = ''; $td = '';	
			
			$mdar = Array(); $tar = Array(); $prop=array();
			//echo "jml: {$query->num_rows()}<br/>";
			if ($query->num_rows() > 0)	{
				//$row = $query->result();
				
				foreach ($query->result() as $row)	{
					//print_r($row); echo "<br/><br/>";
					
					if (isset($prop['tag']) && ($prop['tag']!=''))
						$prop['tag'] = '['.$row->kode.': '.$row->tag.'] '.$prop['tag'];
					else
						$prop['tag'] = '['.$row->kode.': '.$row->tag.'] ';	//.$prop['tag'];
					//echo '['.$row->kode.': '.$row->tag.'] ';
		
					if (($row->downt==$dd) && ($row->downj==$td)) {
						//echo "SAMA: $dd - $td ";
						$prop['id'] .= 'e'.$row->id;
						$ax = $row->idevent;
						if ($ax==2) {
							//echo "masuk 2 ".$row['namapm']."<br/>";
							if (isset($row->namapm) && ($row->namapm!="")) {
								if ( (isset($isi[$jml]['fm'])) && ($isi[$jml]['fm']!=""))
									$prop['event'] .= "&nbsp;&nbsp;";
								//$prop['fm'] .= "[{$row['kode']}: {$row['namapm']}]";
								$prop['event'] .= " [{$row->kode}: {$row->namapm}]";
							}
						} else if (($ax==3) || ($ax==4)) {
							//echo "fm: {$row['fm']}<br/>";
							/*
							if (isset($row->fm)) {
								if (strlen($isi[$jml]['fm'])>0)		{
									//$prop['event'] .= "&nbsp;&nbsp;";
								}
								//$prop['fm'] .= "[{$row['kode']}: {$row['namapm']}]";
								//$prop['event'] .= " [{$row['kode']}: {$row['namapm']}]";
							}
							//*/
						}
					}
					else {
						$jml++;
						$mdar = Array();

						$prop['id'] = 'e'.$row->id;
						$prop['func'] =  $row->nama." @".$row->lok;
						$prop['event'] = $row->event;
						//$prop['tag'] = '['.$row['kode'].': '.$row['tag'].'] ';
						//echo "id: {$prop['id']}, func: {$prop['func']}, ebent: {$prop['event']}<br/>";
						
						if ($row->idevent==1) { 		// standby

						} else if ($row->idevent==2) {	// PM

							$prop['start'] = date('d M Y H:i',strtotime("{$row->startt} {$row->startj}"));
							$prop['end']   = date('d M Y H:i',strtotime("{$row->endt} {$row->endj}"));
							//echo "fm: {$row['namapm']}<br/>";
							if (isset($row->namapm)) {
								//echo "---- ada fm<br/>";
								$prop['event'] .= " [{$row->kode}: {$row->namapm}]";
							}
						} else {
							$prop['start'] = date('d M Y H:i',strtotime("{$row->startt} {$row->startj}"));
							$prop['end']   = date('d M Y H:i',strtotime("{$row->endt} {$row->endj}"));
							//$prop['event'] .= " [{$row['kode']}: {$row['fm']}]";
						}
						
						$prop['down'] = date('d M Y H:i',strtotime("{$row->downt} {$row->downj}"));
						$prop['up']   = date('d M Y H:i',strtotime("{$row->upt} {$row->upj}"));

						$dd = $row->downt;	$td = $row->downj;
						$prop['tag'] = '['.$row->kode.': '.$row->tag.'] ';
						
						$prop['exe'] = $row->exe;
					}
				}
			}

			//print_r($prop);
			
			
/*
			$obj0 = new stdClass();
			$obj0->nama = "ID";
			$obj0->nilai = $prop['id'];
			array_push($isi,$obj0);
			//*/
			$obj1 = new stdClass();
			$obj1->nama = "TAG";
			$obj1->nilai = $prop['tag'];
			array_push($isi,$obj1);
			
			$obj2 = new stdClass();
			$obj2->nama = "Function Location";
			$obj2->nilai = $prop['func'];
			array_push($isi,$obj2);
			
			$obj3 = new stdClass();
			$obj3->nama = "Event";
			$obj3->nilai = $prop['event'];
			array_push($isi,$obj3);
			
			$obj4 = new stdClass();
			$obj4->nama = "Unit Down";
			$obj4->nilai = $prop['down'];
			array_push($isi,$obj4);
			
			if ($ax!=1)	{		// selain stanby
				$obj5 = new stdClass();
				$obj5->nama = "Start Repair";
				$obj5->nilai = $prop['start'];
				array_push($isi,$obj5);
			}
			
			$obj6 = new stdClass();
			$obj6->nama = "Unit Running";
			$obj6->nilai = $prop['up'];
			array_push($isi,$obj6);
			
			if ($ax!=1)	{		// selain stanby
				$obj7 = new stdClass();
				$obj7->nama = "Repair End";
				$obj7->nilai = $prop['end'];
				array_push($isi,$obj7);
			}
			
			if ($ax!=1)	{		// selain stanby
				$obj8 = new stdClass();
				$obj8->nama = "Executor";
				$obj8->nilai = $prop['exe'];
				array_push($isi,$obj8);
			}
			
			$jsonResult = array(
				'success' => true,
				'gagal' => $isi
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
