<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rUnit extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('ulist');
	}
	
	function index()	{
		echo "res";
	}
	
	public function rUnitL()	{
		//*
		try {
			
			$jsonResult = array(
				'success' => true,
				'ulist' => $this->ulist->get_ulist_all()
			);
		}
		catch (Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);	
		}
		//*/
		echo json_encode($jsonResult);
	
	}

	/*
	public function cHirarki() {
		$par = json_decode(file_get_contents('php://input'));

		try {
			if (!isset($par))	{
				throw new Exception("Input Data Tidak Ada");
			}
			
			if ($par->sil=="e")	{
				$data = array(
					'nama' => $par->nama,
					'unit_id' => $par->parent,
					'kode' => $par->kode,
					'tag' => $par->tag,
					//'cat' => $par->cat,
					'rhinit' => $par->rhinit,
					//'urut' => $par->urut,
					'ket' => $par->ket
					
				);
				$hsl = $this->equip->ins_equip($data);
			}
			else if ($par->sil=="u")	{
				$data = array(
					'nama' => $par->nama,
					'parent' => $par->parent,
					'kode' => $par->kode,
					'funcloc' => $par->funcloc,
					'rhinit' => $par->rhinit,
					'urut' => $par->urut,
					'ket' => $par->ket
				);
				$hsl = $this->hirarki->ins_hirarki($data);
			}
			else {
				$data = array(
					'nama' => $par->nama,
					'parent' => $par->parent,
					'kode' => $par->kode,
					'funcloc' => $par->funcloc,
					'rhinit' => $par->rhinit,
					'urut' => $par->urut,
					'ket' => $par->ket
				);
				$hsl = $this->hirarki->ins_hirarki($data);
			}
			// $sql = insert into hirarki ('nama', 'parent', 'level') values ({$params->});
			//$hsl = $this->hirarki->create_hirarki_new();
			// echo 'succeed';
			$jsonResult = array(
				'success' => true,
				'hir' => array('id' => $hsl)
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

	public function uHirarki() {
		$par = json_decode(file_get_contents('php://input'));

		try {
			if (!isset($par))	{
				throw new Exception("Input Data Tidak Ada");
			}
			
			if (is_array($par))	{
				$hsl = array();
				foreach ($par as $d)	{
					//print_r($d); echo "<br/>";
						//*
					$n = explode("] ",$d->nama);
					if ($d->sil=="e")	{
						//$n = explode("] ",$d->nama);
						$data = array(
							'nama'	=> isset($n[1])?$n[1]:"",
							'kode'	=> $d->kode,
							'tag'	=> $d->tag,
							'unit_id' => $d->parent,
							'cat'	=> $d->idcat,
							'rhinit' => $d->rhinit
						);
						$this->equip->update_equip($data,$d->id);
						//array_push($hsl, array('id'=>$d->id));
					}
					else if ($par->sil=="u")	{
						$data = array(
							'nama' => isset($n[1])?$n[1]:"",
							'parent' => $d->parent,
							'kode' => $d->kode,
							'rhinit' => $d->rhinit,
							'funcloc' => $d->funcloc,
							//'flag' => $d->flag,
							'urut' => $d->urut
						);
						$this->hirarki->upd_hirarki($data,$d->id);
					}

					else 	{
						//$n = explode("] ",$d->nama);
						$data = array(
							'nama' => isset($n[1])?$n[1]:"",
							'parent' => $d->parent,
							'kode' => $d->kode,
							'urut' => $d->urut
						);
						$this->hirarki->upd_hirarki($data,$d->id);
						
					}
					array_push($hsl, array('id'=>$d->id));

				}
			}
			else {
				if ($par->sil=="e")	{
					$data = array(
						'nama'	=> $par->nama,
						'kode'	=> $par->kode,
						'tag'	=> $par->tag,
						'unit_id' => $par->parent,
						'cat'	=> $par->idcat,
						'rhinit' => $par->rhinit
					);
					$this->equip->update_equip($data,$par->id);

				}
				else if ($par->sil=="u")	{
					$data = array(
						'nama' => $par->nama,
						'parent' => $par->parent,
						'kode' => $par->kode,
						'rhinit' => $par->rhinit,
						'funcloc' => $par->funcloc,
						//'flag' => $par->flag,
						'urut' => $par->urut
					);
					$this->hirarki->upd_hirarki($data,$par->id);
				}
				else {
					$data = array(
						'nama' => $par->nama,
						'parent' => $par->parent,
						'kode' => $par->kode,
						'urut' => $par->urut
					);
					$this->hirarki->upd_hirarki($data,$par->id);
				}
				$hsl = array('id' => $par->id);
			}
			
			$jsonResult = array(
				'success' => true,
				'hir' => $hsl
			);
		}
		catch (Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		echo json_encode($jsonResult);
	}
	
	public function dHirarki()	{
		$par = json_decode(file_get_contents('php://input'));

		try {
			if (!isset($par))	{
				throw new Exception("Input Data Tidak Ada");
			}
			if ($par->sil=="e")
				$id = $this->equip->del_equip($par->id);
			else
				$id = $this->hirarki->del_hirarki($par->id);
			
			$jsonResult = array(
				'success' => true,
				'hir' => array('id' => $id)
			);
		}
		catch (Exception $e){
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		echo json_encode($jsonResult);
	}
	//*/

}

/* End of file rUnit.php */
/* Location: ./application/controllers/konfig/rUnit.php */
