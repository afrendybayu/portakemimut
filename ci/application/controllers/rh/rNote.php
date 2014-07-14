<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rNote extends CI_Controller {
	
	public function index()	{
		
		try	{
			$id = $this->input->get('id')?:'0';
			
			$rid = explode("e", $id);
			//print_r(array_filter($rid));
			$id = implode(",",array_filter($rid));

			$s =  "select waktudown.id, waktudown.eqid, equip.kode, ".
					"(select concat ('[',equip.tag,'] ',equip.nama)) as nama,waktudown.ket ".
					"from waktudown ".
					"LEFT JOIN equip ON waktudown.eqid = equip.id ".
					"where waktudown.id in (?);";
			
			$query = $this->db->query($s, $id);
			
			$isi = array();	$jml=0;
			if ($query->num_rows() > 0)	{
				foreach ($query->result() as $row)	{
					$isi[$jml]['ket'] = $row->ket;
					$isi[$jml]['nama'] = $row->nama;
					//print_r($row); echo "<br/>";
					$jml++;
				}
			}
			
			$ket = array();	$jml = 0;
			for($i=0; $i<count($isi); $i++)	{
				if ($i>0)	{
					for($j=0; $j<$jml; $j++)	{
						//print_r($ket); echo "<br/><br/>";
						//echo "strlen[$j]: ".strlen($ket[$j]['ket']).", strlen[$jml]: ".strlen($ket[$j]['ket'])."<br/>";
						if (strlen($ket[$j]['ket'])!=strlen($ket[$j]['ket'])) {
							$ket[$jml]['eq'] = $isi[$i]['nama'];
							$ket[$jml]['ket'] = $isi[$i]['ket'];
						} else {
							//echo "SAMA <br/>";
						}
					}
				}
				else  {
					$ket[$jml]['eq'] = $isi[$i]['nama'];
					$ket[$jml]['ket'] = $isi[$i]['ket'];
					$jml++;	
				}
			}

			//print_r($ket);
			if (count($ket)==1)	{
				$hsl = $ket[0];
			}
			
			$jsonResult = array(
				'success' => true,
				'note' => $hsl
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
