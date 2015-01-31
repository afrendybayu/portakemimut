<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rOverHaul extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('overhaul');
		$this->load->model('option');
		$this->load->model('catequip');
	}
	
	
	public function index()	{
		echo "index overhaul";
	}
	
	public function ohTahun()	{
		try {
			$thn = $this->input->get('thn')?:date('Y');
			//$lok = $this->input->get('lok')?:"ALL";
			$cat = $this->input->get('cat')?:0;
			
			if  (strlen($this->input->get('lok'))>0)	{
				if ($this->input->get('lok')==="ALL")	$lok = -1;
				else $lok = $this->input->get('lok');
				//echo "lewat sini $lok<br/>";
			}
			else {
				$lok = -1;
			}
			/*
			if (($lok === "ALL") || ($lok===-1))	{
				$lok = -1;
			}
			//*/
			//echo "$thn, lok: $lok, cat: $cat<br/>";
			
			$hsl = $this->overhaul->ohTahun($thn,$lok,$cat);
			//print_r($hsl);
			$jsonResult = array(
				'success' => true,
				'overhaul' => $hsl
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
	
	public function cbEquip()	{
		try {
			$hsl = $this->overhaul->ohEquip();
			//print_r($hsl);
			$jsonResult = array(
				'success' => true,
				'cbequip' => $hsl
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
	
	public function createOH(){
		try {
			$hsl = $this->overhaul->set_ohlist();
			//echo "createOH INSERT IGNORE";

			$jsonResult = array(
				'success' => true,
				'cOH' => $hsl
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
	public function readOH(){
		try {
			$thn = $this->input->get('thn')?:date('Y');
			//$lok = $this->input->get('lok')?:"ALL";
			$cat = $this->input->get('cat')?:0;
			
			if  (strlen($this->input->get('lok'))>0)	{
				if ($this->input->get('lok')==="ALL")	$lok = -1;
				else $lok = $this->input->get('lok');
				//echo "lewat sini $lok<br/>";
			}
			else {
				$lok = -1;
			}
			/*
			if (($lok === "ALL") || ($lok===-1))	{
				$lok = -1;
			}
			//*/
			$hsl = $this->overhaul->get_ohlist($thn,$lok,$cat);
			//echo "jml: ".count($hsl)."<br/>";
			/*
			foreach($hsl as $a)	{
				print_r($a); echo "<br/>";
			}
			//*/
			//print_r($hsl);
			
			$jsonResult = array(
				'success' => true,
				'overhaulin' => $hsl
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
	
	public function removeOH(){
		try {
			$ohtb = json_decode(file_get_contents('php://input'));
			
			$this->db->where('id', $ohtb->id);
			$this->db->delete('ohlist');
						
		} catch(Exception $e) {
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
	
	}
	public function updateOH(){
		$par = json_decode(file_get_contents('php://input'));
		try {
			if (!isset($par))	{
				throw new Exception("Input Data Tidak Ada");
			}
			
			$hsl = $this->overhaul->update_ohlist($par);
			
		} catch(Exception $e) {
			$hsl = 'gagal';
		}
	}
	
	public function rExcOH()	{
		try {
			
			$thn = $this->input->get('t')?:date('Y');
			//$lok = $this->input->get('l')?:-1;
			$cat = $this->input->get('c')?:-1;

			if (($cat === "ALL") || ($cat===-1))	{
				$cat = -1;
			}
			
			if  (strlen($this->input->get('l'))>0)	{
				if ($this->input->get('l')==="ALL")	$lok = -1;
				else $lok = $this->input->get('l');
				//echo "lewat sini $lok<br/>";
			}
			else {
				$lok = -1;
			}
			
			$jabat = $this->option->get_oh_report();
			
			$u = $this->catequip->get_tipe1_cat($cat);
			if (count($u)>0)
				$jdl = ($cat>0)?$u[0]->ket:"ALL EQUIPMENT";
			else $jdl = "ALL EQUIPMENT";
			$fn="overhaul_gabung_$thn.xls";
			
			$sheet = $this->excel->getActiveSheet();
			//*
			ohexcel_judul_gabung($sheet,$jdl);
			ohexcel_table_gabung($sheet,$thn,$jdl);
			ohexcel_head_gabung($sheet);
			//ohexcel_head($sheet);
			ohexcel_font_gabung($sheet);
			ohexcel_size_gabung($sheet);
			ohexcel_bg_gabung($sheet);
			ohexcel_border_gabung($sheet);
			ohexcel_image_gabung($sheet);
			//*/
			$oh = $this->overhaul->proc_overhaul($thn,$lok,$cat);
			//return;
			//print_r($oh);
			
			$nx = ohexcel_data_overhaul_gabung($sheet,$oh);
			//$nx = 15;
			ohexcel_jabat_gabung($sheet,$nx,$jabat);
			//return;
			//*
			// Redirect output to a client’s web browser (Excel2007)
			header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
			header('Content-Disposition: attachment;filename="'.$fn.'"');
			header('Cache-Control: max-age=0');
			// If you're serving to IE 9, then the following may be needed
			header('Cache-Control: max-age=1');

			// If you're serving to IE over SSL, then the following may be needed
			header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
			header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
			header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
			header ('Pragma: public'); // HTTP/1.0

			$objWriter = PHPExcel_IOFactory::createWriter($this->excel, 'Excel2007');
			$objWriter->save('php://output');
			//*/
			
			$jsonResult = array(
				'success' => true,
				'fNama'	=> $fn
			);
		}
		catch(Exception $e) {
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		//echo json_encode($jsonResult);
		/*
		$sheet = $this->excel->getActiveSheet();
		$filename="overhaul.xls"; //save our workbook as this file name
		//header('Content-Type: application/vnd.ms-excel'); //mime type
		header('Content-Disposition: attachment;filename="'.$filename.'"'); //tell browser what's the file name
		header('Cache-Control: max-age=0'); //no cache

		//save it to Excel5 format (excel 2003 .XLS file), change this to 'Excel2007' (and adjust the filename extension, also the header mime type)
		//if you want to save it as .XLSX Excel 2007 format
		//$objWriter = PHPExcel_IOFactory::createWriter($this->excel, 'Excel5');  
		$objWriter = PHPExcel_IOFactory::createWriter($this->excel, 'Excel2007');  
			//force user to download the Excel file without writing it to server's HD
		$objWriter->save('php://output');
		//*/
	}
	
	public function rExcPOH()	{
		try {
						
			$thn = $this->input->get('t')?:date('Y');
			//$lok = $this->input->get('l')?:-1;
			$cat = $this->input->get('c')?:-1;

			if (($cat === "ALL") || ($cat===-1))	{
				$cat = -1;
			}
			
			if  (strlen($this->input->get('l'))>0)	{
				if ($this->input->get('l')==="ALL")	$lok = -1;
				else $lok = $this->input->get('l');
				//echo "lewat sini $lok<br/>";
			}
			else {
				$lok = -1;
			}
			
			$jabat = $this->option->get_oh_report();
			
			$u = $this->catequip->get_tipe1_cat($cat);
			if (count($u)>0)
				$jdl = ($cat>0)?$u[0]->ket:"ALL EQUIPMENT";
			else $jdl = "ALL EQUIPMENT";
			$fn="overhaul_pisah_$thn.xls";
			
			$sheet = $this->excel->getActiveSheet();
			//*
			ohexcel_judul($sheet,$jdl);
			ohexcel_table($sheet,$thn,$jdl);
			ohexcel_head($sheet);
			ohexcel_font($sheet);
			ohexcel_size($sheet);
			ohexcel_bg($sheet);
			ohexcel_border($sheet);
			ohexcel_image($sheet);
			//*/
			$oh = $this->overhaul->proc_overhaul_pisah($thn,$lok,$cat);
			//return;
			//print_r($oh);
			
			$nx = ohexcel_data_overhaul($sheet,$oh);
			//$nx = 15;
			ohexcel_jabat($sheet,$nx,$jabat);
			//return;
			//*
			// Redirect output to a client’s web browser (Excel2007)
			header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
			header('Content-Disposition: attachment;filename="'.$fn.'"');
			header('Cache-Control: max-age=0');
			// If you're serving to IE 9, then the following may be needed
			header('Cache-Control: max-age=1');

			// If you're serving to IE over SSL, then the following may be needed
			header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
			header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
			header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
			header ('Pragma: public'); // HTTP/1.0

			$objWriter = PHPExcel_IOFactory::createWriter($this->excel, 'Excel2007');
			$objWriter->save('php://output');
			//*/
			
			$jsonResult = array(
				'success' => true,
				'fNama'	=> $fn
			);
		}
		catch(Exception $e) {
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		//echo json_encode($jsonResult);
		/*
		$sheet = $this->excel->getActiveSheet();
		$filename="overhaul.xls"; //save our workbook as this file name
		//header('Content-Type: application/vnd.ms-excel'); //mime type
		header('Content-Disposition: attachment;filename="'.$filename.'"'); //tell browser what's the file name
		header('Cache-Control: max-age=0'); //no cache

		//save it to Excel5 format (excel 2003 .XLS file), change this to 'Excel2007' (and adjust the filename extension, also the header mime type)
		//if you want to save it as .XLSX Excel 2007 format
		//$objWriter = PHPExcel_IOFactory::createWriter($this->excel, 'Excel5');  
		$objWriter = PHPExcel_IOFactory::createWriter($this->excel, 'Excel2007');  
			//force user to download the Excel file without writing it to server's HD
		$objWriter->save('php://output');
		//*/
	}

}

/* End of file rOverHaul.php */
/* Location: ./application/controllers/rOverHaul.php */
