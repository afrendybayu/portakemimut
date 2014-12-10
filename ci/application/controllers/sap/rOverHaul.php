<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rOverHaul extends CI_Controller {
	function __construct() {
        parent::__construct();
		$this->load->model('overhaul');
		$this->load->model('option');
	}
	
	
	public function index()	{
		echo "index overhaul";
	}
	
	public function ohTahun()	{
		try {
			$thn = $this->input->get('thn')?:date('Y');
			$hsl = $this->overhaul->ohTahun($thn);
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
			$hsl = $this->overhaul->get_ohlist($thn);
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
		try {
			//$ohtb = json_decode(file_get_contents('php://input'));
			$hsl = $this->overhaul->update_ohlist();
			
		} catch(Exception $e) {
			$hsl = 'gagal';
		}
	}
	
	public function rExcOH(){
		try {
			$thn = $this->input->get('t')?:date('Y');
			
			$jabat = $this->option->get_oh_report();
			
			$sheet = $this->excel->getActiveSheet();
			ohexcel_judul($sheet);
			ohexcel_table($sheet,$thn);
			ohexcel_head($sheet);
			ohexcel_font($sheet);
			ohexcel_size($sheet);
			ohexcel_bg($sheet);
			ohexcel_border($sheet);
			ohexcel_image($sheet);
			
			$oh = $this->overhaul->proc_overhaul($thn);
			//print_r($oh);
			
			
			//print_r($jabat);
			
			$nx = ohexcel_data_overhaul($sheet,$oh);
			
			
			ohexcel_jabat($sheet,$nx,$jabat);
			
			//*
			$filename="overhaul$thn.xls"; //save our workbook as this file name
			//header('Content-Type: application/vnd.ms-excel'); //mime type
			header('Content-Disposition: attachment;filename="'.$filename.'"'); //tell browser what's the file name
			header('Cache-Control: max-age=0'); //no cache
						
			//save it to Excel5 format (excel 2003 .XLS file), change this to 'Excel2007' (and adjust the filename extension, also the header mime type)
			//if you want to save it as .XLSX Excel 2007 format
			//$objWriter = PHPExcel_IOFactory::createWriter($this->excel, 'Excel5');  
			$objWriter = PHPExcel_IOFactory::createWriter($this->excel, 'Excel2007');  
			//force user to download the Excel file without writing it to server's HD
			$objWriter->save('php://output');
			
			$jsonResult = array(
				'success' => true,
				'fNama'	=> $filename
			);
			//*/
		} catch(Exception $e) {
			$jsonResult = array(
				'success' => false,
				'message' => $e->getMessage()
			);
		}
		echo json_encode($jsonResult);
	}

}

/* End of file rOverHaul.php */
/* Location: ./application/controllers/rOverHaul.php */
