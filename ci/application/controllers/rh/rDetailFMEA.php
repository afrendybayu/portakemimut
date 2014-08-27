<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rDetailFMEA extends CI_Controller {
	
	public function index()	{
		
		try	{
			$id = $this->input->get('down')?:'0';
			
			$rid = explode("e", $id);
			//print_r(array_filter($rid));
			$id = implode(",",array_filter($rid));
			/*
			$sql =  "SELECT distinct event.id,down_id, eq, (select concat ('[',equip.tag,'] ',equip.nama))as enama, ".
					"opart,opart.nama as opnama, fm, 'failuremode.nama' as fnama, ".
					"cause,cause.nama as cnama,aksi, aksi.nama as anama ".
					"FROM event ".
					"LEFT JOIN equip ON event.eq = equip.id ".
					"LEFT JOIN opart ON event.opart = opart.id  ".
					"LEFT JOIN failuremode ON event.fm like failuremode.kode ".
					"LEFT JOIN cause ON event.cause like cause.id ".
					"LEFT JOIN aksi ON event.cause like aksi.id ".
					"where down_id in ($id) order by enama asc;";
			//*/
			$sql =  "SELECT distinct event.id,down_id, eq, (select concat ('[',equip.tag,'] ',equip.nama))as enama, ".
					"opart,opart.nama as opnama, fm, failuremode.nama as fnama, ".
					"cause,cause.nama as cnama,aksi, aksi.nama as anama ".
					"FROM event ".
					"LEFT JOIN equip ON event.eq = equip.id ".
					"LEFT JOIN opart ON event.opart = opart.id  ".
					"LEFT JOIN failuremode ON event.fm like failuremode.id ".
					"LEFT JOIN cause ON event.cause like cause.id ".
					"LEFT JOIN aksi ON event.aksi like aksi.id ".
					"where down_id in ($id) order by enama asc;";
			
			$query = $this->db->query($sql, $id);
			
			$isi = array();	$jml=0;
			if ($query->num_rows() > 0)	{
				foreach ($query->result() as $row)	{
					$isi[$jml]['eql'] = $row->enama;
					$isi[$jml]['opart'] = $row->opnama;
					$isi[$jml]['mode'] = $row->fnama;
					$isi[$jml]['cause'] = $row->cnama;
					$isi[$jml]['aksi'] = $row->anama;
					$jml++;
				}
			}
			
			$hsl = array();
			foreach ($isi as $data)	{
				//print_r($data); echo "<br/>";
				array_push($hsl, $data);
			}
			
			$jsonResult = array(
				'success' => true,
				'detail' => $hsl
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
