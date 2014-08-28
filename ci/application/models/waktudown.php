<?php

class Waktudown extends CI_Model {

	function get_waktudown_edit($id)	{
		/*
		$this->db->select('id,downt,downj,upt,upj,eqid,unit_id,id');
		$this->db->where_in('id',$id);
		$this->db->group_by(array('downt', 'downj', 'upt', 'upj');
		$query = $this->db->get('waktudown');
		//*/
		$ids = @implode(',',$id);
		$sql =	"select group_concat(id separator ',') as id,group_concat(eqid separator 'e') as eqeq, ".
				"unit_id, downt, downj, upt, upj ".
				"from waktudown where id in ($ids) ".
				"group by downt,downj,upt,upj";
		//echo "sql: $ids : $sql<br/><br/>";
		
		$query = $this->db->query($sql);
		//print_r($query->result()); echo "<br/><br/>";
		return $query->result();
	}

	function get_waktudown($id,$downt,$downj,$upt,$upj,$flag=0,$event,$edit,$idid,$da,$db,$ua,$ub)    {
		/*
		$sql =	"SELECT id,downt AS dt,downj AS dj,upt AS ut, upj AS uj,event AS ev FROM waktudown WHERE eqid='{$id}' ".
				"AND (downt BETWEEN '$da' AND '$db' OR upt BETWEEN '$ua' AND '$ub') ";
		//*/		
		$sql =	"SELECT id,downt AS dt,downj AS dj,upt AS ut, upj AS uj,event AS ev FROM waktudown WHERE unit_id='{$id}' ".
				"AND (downt BETWEEN '$da' AND '$db' OR upt BETWEEN '$ua' AND '$ub') ";
		if ($edit) $sql .= "AND id NOT IN (".implode(',',$idid).")";
		$sql .=	" group by downt, downj, upt,upj ";
		
		//echo "sql: $sql<br/>";
		$query = $this->db->query($sql);
		
		/*
		//$aksi = array();
		if ($query->num_rows() > 0)	{
			foreach ($query->result() as $row)	{
				print_r($row); echo "<br/>";
			}
		}
		//*/

		$ii=0;
		//echo "<br/><br/>hasil waktudown "; print_r($query->result()); echo "<br/>";
		foreach ($query->result() as $row) {
			$dt[$ii]  = $row->dt;	$dj[$ii]  = $row->dj;
			$ut[$ii]  = $row->ut;	$uj[$ii]  = $row->uj;
			$ev[$ii]  = $row->ev;
			$ii++;
			//echo "i: $ii<br/>";
		}
		
		
		if ($flag==0)	{	// flag = 0 jika 
			//echo "<br/>masuk ke flag 0<br/>";
			$dt[$ii]  = $downt;		$dj[$ii]  = $downj;
			$ut[$ii]  = $upt;		$uj[$ii]  = $upj;
			$ev[$ii]  = $event;
		}
		
		$w = new stdClass();
		if (isset($dt))	{
			$w->dt=$dt;		 
			$w->dj=$dj;
			$w->ut=$ut;		 
			$w->uj=$uj;
			$w->ev=$ev;
		}
		//print_r($w);
		return $w;
    }
    
    function get_waktudown_list($tglaw, $tglak)	{
		/*
		$sql =	"SELECT waktudown.id,event as idevent,tipeev ".
				",(select concat('[',kode,': ',(select pmdef.nama from pmdef where pmdef.id ".
				"= (select pmlist.pm from pmlist where pmlist.id=tipeev)),']')) as namapm ".
				",eqid,waktudown.unit_id ".
				",(select group_concat((select concat('[',kode,': ',(select nama from failuremode where failuremode.id = event.fm),']')) separator ' ') ) as fm ".
				",downt,downj,upt,upj,startt,startj,endt,endj,waktudown.ket,exe ".
				",(select hirarki.nama from hirarki where hirarki.id = (select hirarki.parent from hirarki where hirarki.id ".
					"= (select hirarki.parent from hirarki where hirarki.id = equip.unit_id))) as lok ".
				",listEvent.nama as event, equip.unit_id ".
				",(select nama from hirarki where hirarki.id = (select unit_id from equip where id = waktudown.eqid)) as nama ".
				"FROM waktudown LEFT JOIN listEvent ON listEvent.id = waktudown.event ".
				"LEFT JOIN equip ON equip.id = waktudown.eqid ".
				"LEFT JOIN event ON event.down_id = waktudown.id ".
				"WHERE downt BETWEEN ? AND ? group by id order by downt desc, downj desc, id desc";
		//*/
		/*
		$sql =	"SELECT (select group_concat((select concat('e',waktudown.id)) separator '')) as id,event as idevent,tipeev ".
				",(select concat('[',kode,': ',(select pmdef.nama from pmdef where pmdef.id ".
				"= (select pmlist.pm from pmlist where pmlist.id=tipeev)),']')) as namapm ".
				",waktudown.unit_id as eqid ".
				",(select group_concat((select concat('[',kode,': ',(select nama from failuremode where failuremode.id = event.fm),']')) separator ' ') ) as fm ".
				",downt,(select date_format(downj,'%H:%i')) as downj".
				",upt,(select date_format(upj,'%H:%i')) as upj".
				",startt,(select date_format(startj,'%H:%i')) as startj".
				",endt,(select date_format(endj,'%H:%i')) as endj,waktudown.ket,exe ".
				",(select hirarki.nama from hirarki where hirarki.id = (select hirarki.parent from hirarki where hirarki.id ".
					"= (select hirarki.parent from hirarki where hirarki.id = equip.unit_id))) as lok ".
				",listEvent.nama as event, equip.unit_id ".
				",(select nama from hirarki where hirarki.id = (select unit_id from equip where id = waktudown.eqid)) as nama ".
				"FROM waktudown LEFT JOIN listEvent ON listEvent.id = waktudown.event ".
				"LEFT JOIN equip ON equip.id = waktudown.eqid ".
				"LEFT JOIN event ON event.down_id = waktudown.id ".
				"WHERE downt BETWEEN ? AND ? group by downt,downj,upt,upj order by downt desc, downj desc, id desc";
		//*/
		$sql =	"SELECT (select group_concat((select concat('e',waktudown.id)) separator '')) as id, ".
				"waktudown.unit_id as eqid ,event as idevent,group_concat(if(tipeev=0,'',concat('e',eqid,'pm',tipeev))) as tipeev ".
				",concat(ifnull((select group_concat('[',kode,': ',(select pmdef.nama from pmdef where pmdef.id ".
				"= (select pmlist.pm from pmlist where pmlist.id=tipeev)),']')),'') ".
				",ifnull((select group_concat((select concat('[',kode,': ',(select nama from failuremode where failuremode.id = event.fm),']')) ".
				"separator ' ') ),'') ) as fm ".
				",downt,(select date_format(downj,'%H:%i')) as downj,upt,(select date_format(upj,'%H:%i')) as upj ".
				",startt,(select date_format(startj,'%H:%i')) as startj,endt,(select date_format(endj,'%H:%i')) as endj,waktudown.ket,exe ".
				",(select hirarki.nama from hirarki where hirarki.id = (select hirarki.parent from hirarki where hirarki.id ".
				"= (select hirarki.parent from hirarki where hirarki.id = equip.unit_id))) as lok ,listEvent.nama as event, equip.unit_id ".
				",(select nama from hirarki where hirarki.id = (select unit_id from equip where id = waktudown.eqid)) as nama ".
				"FROM waktudown LEFT JOIN listEvent ON listEvent.id = waktudown.event ".
				"LEFT JOIN equip ON equip.id = waktudown.eqid ".
				"LEFT JOIN event ON event.down_id = waktudown.id WHERE downt BETWEEN ? AND ? ".
				"group by downt,downj,upt,upj order by downt desc, downj desc, id desc ";
		//echo "sql: $sql <br/>tglaw: $tglaw, tglak: $tglak<br/>";
		$query = $this->db->query($sql, array($tglaw,$tglak));
		
		$isi = array();	$jml=-1;
		if ($query->num_rows() > 0)	{
			$dd = ''; $td = '';
			
			/*
			//echo "=====> jml: $jml<br/>";
			foreach ($query->result() as $row)	{
				//echo "->idevent: {$row->idevent}<br/>";
				if (($row->downt==$dd) && ($row->downj==$td)) {
					$isi[$jml]['id'] .= 'e'.$row->id;
					$ax = $row->idevent;
					if ($ax==2) {
							
					}
					else if (($ax==3) || ($ax==4)) {
							//echo "fm: {$row['fm']}<br/>";
						if (isset($row->fm) && ($row->fm!=""))	{
							if ( isset($isi[$jml]['fm']))	{
								$isi[$jml]['fm'] .= "&nbsp;&nbsp;{$row->fm}";
							}
							else 
								$isi[$jml]['fm'] = "{$row->fm}";
						}
					}
				}
				else {
					$jml++;
					$isi[$jml]['id'] = 'e'.$row->id;
					$isi[$jml]['downt'] = date('d-m-Y',strtotime("{$row->downt} {$row->downj}"));
					$isi[$jml]['downj'] = date('H:i',	strtotime("{$row->downt} {$row->downj}"));
					$isi[$jml]['upt'] = date('d-m-Y',	strtotime("{$row->upt} {$row->upj}"));
					$isi[$jml]['upj'] = date('H:i',	strtotime("{$row->upt} {$row->upj}"));
					
					//$isi[$jml]['event'] = $row->event;
					//$isi[$jml]['eqid'] = $row->unit_id;
					$isi[$jml]['idevent'] = $row->idevent;
					
					$isi[$jml]['unit_id'] = $row->unit_id;
					$isi[$jml]['nama'] = $row->nama;
					$isi[$jml]['lok'] = $row->lok;
					
					$isi[$jml]['ket'] = $row->ket;
					$isi[$jml]['exe'] = $row->exe;

					$dd = $row->downt;	$td = $row->downj;
					
					
					if ($row->idevent==1) { 		// standby
					
					}
					else if ($row->idevent==2) {	// PM
					
					}
					else {
						//echo "----> masuk sini: {$row->idevent}<br/>";
						$isi[$jml]['startt'] = date('d-m-Y',strtotime("{$row->startt} {$row->startj}"));
						$isi[$jml]['startj'] = date('H:i',	strtotime("{$row->startt} {$row->startj}"));
						$isi[$jml]['endt'] = date('d-m-Y',	strtotime("{$row->endt} {$row->endj}"));
						$isi[$jml]['endj'] = date('H:i',	strtotime("{$row->endt} {$row->endj}"));
						
						if (isset($row->fm) && $row->fm!='') {
							$isi[$jml]['fm'] = "{$row->fm}";
						}
					}
					
				}
				//echo "=====> jml: $jml<br/>";
			}
			//*/
			
			/*
			foreach ($query->result() as $row)	{
				$isi[$jml]['downt'] = date('d-m-Y',strtotime("{$row->downt} {$row->downj}"));
				$isi[$jml]['downj'] = date('H:i',	strtotime("{$row->downt} {$row->downj}"));
				$isi[$jml]['upt'] = date('d-m-Y',	strtotime("{$row->upt} {$row->upj}"));
				$isi[$jml]['upj'] = date('H:i',	strtotime("{$row->upt} {$row->upj}"));
				$isi[$jml]['startt'] = date('d-m-Y',strtotime("{$row->startt} {$row->startj}"));
				$isi[$jml]['startj'] = date('H:i',	strtotime("{$row->startt} {$row->startj}"));
				$isi[$jml]['endt'] = date('d-m-Y',	strtotime("{$row->endt} {$row->endj}"));
				$isi[$jml]['endj'] = date('H:i',	strtotime("{$row->endt} {$row->endj}"));
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
				//$isi[$jml]['fm'] = $row->fm?:'--';
				//print_r($row);
				//echo "<br/><br/>";
				$jml++;
			}
			//*/
			
			/*
			foreach ($query->result() as $row)	{
				if (($row->downt==$dd) && ($row->downj==$td)) {
					$isi[$jml]['id'] .= 'e'.$row->id;
					$ax = $row->idevent;
					if ($ax==2) {
							
					}
					else if (($ax==3) || ($ax==4)) {
							//echo "fm: {$row['fm']}<br/>";
						if (isset($row->fm) && ($row->fm!=""))	{
							if ( isset($isi[$jml]['fm']))	{
								$isi[$jml]['fm'] .= "&nbsp;&nbsp;{$row->fm}";
							}
							else 
								$isi[$jml]['fm'] = "{$row->fm}";
						}
					}
				}
				else {
					$jml++;
					$mdar = Array();

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
							//$isi[$jml]['fm'] = "[{$row->kode}: {$row->namapm}]";
							$isi[$jml]['fm'] = "{$row->namapm}";
						}
					} else {
						$isi[$jml]['startt'] = date('d-m-Y',strtotime("{$row->startt} {$row->startj}"));
						$isi[$jml]['startj'] = date('H:i',	strtotime("{$row->startt} {$row->startj}"));
						$isi[$jml]['endt'] = date('d-m-Y',	strtotime("{$row->endt} {$row->endj}"));
						$isi[$jml]['endj'] = date('H:i',	strtotime("{$row->endt} {$row->endj}"));
							
							//echo $row->kode." > ".$row->fm."----<br/>";
						if (isset($row->fm) && $row->fm!='') {
							$isi[$jml]['fm'] = "{$row->fm}";
						}
					}
					$isi[$jml]['downt'] = date('d-m-Y',strtotime("{$row->downt} {$row->downj}"));
					$isi[$jml]['downj'] = date('H:i',	strtotime("{$row->downt} {$row->downj}"));
					$isi[$jml]['upt'] = date('d-m-Y',	strtotime("{$row->upt} {$row->upj}"));
					$isi[$jml]['upj'] = date('H:i',	strtotime("{$row->upt} {$row->upj}"));
					
					$dd = $row->downt;	$td = $row->downj;
				}
			}
			//*/
			$hsl = array();
			foreach ($isi as $data)	{
				//print_r($data); echo "<br/>===========================<br/>";
				array_push($hsl, $data);
			}
			
			return $query->result();
			//return $query->num_rows();
			return $hsl;
		}
		
		return 0;
	}
    
    function insert_waktudown($event, $data, $data_ex)	{
		if ($event==1)	{
			$this->db->set($data);
		}
		else {
			$this->db->set(array_merge($data, $data_ex));
		}
		return $this->db->insert('waktudown');
	}
	
	function get_waktudown_limit($n)	{
		$this->db->select('id,eqid AS eq');
		$this->db->order_by('id', 'desc'); 
		$query = $this->db->get('waktudown',$n,0);
		
		//print_r($query->result());
		return $query->result();
	}
	
	function get_waktudown_equip($idid)	{
		//$names = array('Frank', 'Todd', 'James');
		//$this->db->where_in('username', $names);
		//print_r($idid);
		
		
		$query = $this->db->select('id,eqid AS eq, unit_id');
		$query = $this->db->where_in('id',$idid);
		$query = $this->db->get('waktudown');
		
		return $query->result();
	}
	
	function update_waktudown($event, $id, $data, $data_ex)	{
		if ($event==1)	{
			$this->db->set($data);
		}
		else {
			$this->db->set(array_merge($data, $data_ex));
		}
		$this->db->where('id', $id);
		return $this->db->update('waktudown');
	}

	function delete_waktudown($ids)	{
		
		$this->db->where_in('id', $ids);
		if ($this->db->delete('waktudown'))	{
		//*
			$hsl = array();
			foreach($ids as $id)	{
				array_push($hsl, array('id' => $id));
			}
			return $hsl;
		//*/
		}
		else {
			return array('id'=>'0');
		}
		
	}
}

/* End of file waktudown.php */
/* Location: ./application/models/waktudown.php */
