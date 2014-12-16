<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');




if(!function_exists("ohexcel_judul")){
	function ohexcel_judul($sheet,$unit){
		$sheet->setCellValue('A1','PT MEDCO E&P INDONESIA')->mergeCells('A1:BD1')->getStyle('A1')->getAlignment()->applyFromArray(
    	array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
			'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER));
		$sheet->setCellValue('A2', "PLANNING PREVENTIVE MAINTENCANCE ".strtoupper($unit))->mergeCells('A2:BD2')->getStyle('A2')->getAlignment()->applyFromArray(
    	array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
			'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER));
	}
}

if(!function_exists("ohexcel_table")){
	function ohexcel_table($sheet,$thn,$unit){
		$t = "Year : $thn";
		$sheet->setCellValue('A3', 'Area : SSE Block')->mergeCells('A3:B3');
		$sheet->setCellValue('AY3', $t)->mergeCells('AY3:BD3')->getStyle('AY3')->getAlignment()->applyFromArray(
		    array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_RIGHT,));
		$sheet->setCellValue('A4', 'Custodian')->mergeCells('A4:D4');
		$sheet->setCellValue('A5', 'Production Departement')->mergeCells('A5:D5');
		$sheet->setCellValue('A6', 'Location : SSE Block')->mergeCells('A6:D6');
		$sheet->setCellValue('E4', 'Equipment Name :')->mergeCells('E4:AB4');
		$sheet->setCellValue('E5', $unit)->mergeCells('E5:AB5');
		$sheet->setCellValue('AC4', 'Dated Issued :')->mergeCells('AC4:AV4');
		$sheet->setCellValue('AW4', 'Page')->mergeCells('AW4:BD4')->getStyle('AW4')->getAlignment()->applyFromArray(
		    array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
		    	'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER));
		/*
		$sheet->setCellValue('AW5','1 of 1')->mergeCells("AW5:BD6")->getStyle('AW5')->getAlignment()->applyFromArray(
		    array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
		    	'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER));
		//*/
	}
}

if(!function_exists("ohexcel_head")){
	function ohexcel_head($sheet){
		$sheet->setCellValue('A8','NO')->mergeCells("A8:A10");
		$sheet->setCellValue('B8','LOCATION')->mergeCells("B8:B10");
		$sheet->setCellValue('C8','DESCRIPTION')->mergeCells("C8:D8");
		$sheet->setCellValue('C9','ACTIVITY')->mergeCells("C9:C10");
		$sheet->setCellValue('D9','ORDER NO')->mergeCells("D9:D10");
		$sheet->setCellValue('E8','PLANNING')->mergeCells("E8:F8");
		$sheet->setCellValue('E9','DATE')->mergeCells("E9:E10");
		$sheet->setCellValue('F9','PLAN DURATION OR SHUTDOWN (DAYS)')->mergeCells("F9:F10")->getStyle('F9')->getAlignment()->setWrapText(true);;
		$sheet->setCellValue('G8','ACTUAL')->mergeCells("G8:H8");
		$sheet->setCellValue('G9','DATE')->mergeCells("G9:G10");
		$sheet->setCellValue('H9','PLAN DURATION OR SHUTDOWN (DAYS)')->mergeCells("H9:H10")->getStyle('H9')->getAlignment()->setWrapText(true);;

		$sheet->setCellValue('I8','JANUARY')->mergeCells("I8:L8");
		$sheet->setCellValue('M8','FEBRUARY')->mergeCells("M8:P8");
		$sheet->setCellValue('Q8','MARCH')->mergeCells("Q8:T8");
		$sheet->setCellValue('U8','APRIL')->mergeCells("U8:X8");
		$sheet->setCellValue('Y8','MAY')->mergeCells("Y8:AB8");
		$sheet->setCellValue('AC8','JUNE')->mergeCells("AC8:AF8");
		$sheet->setCellValue('AG8','JULY')->mergeCells("AG8:AJ8");
		$sheet->setCellValue('AK8','AUGUST')->mergeCells("AK8:AN8");
		$sheet->setCellValue('AO8','SEPTEMBER')->mergeCells("AO8:AR8");
		$sheet->setCellValue('AS8','OCTOBER')->mergeCells("AS8:AV8");
		$sheet->setCellValue('AW8','NOVEMBER')->mergeCells("AW8:AZ8");
		$sheet->setCellValue('BA8','DECEMBER')->mergeCells("BA8:BD8");

		$sheet->setCellValue('I9','PLAN')->mergeCells("I9:L9");
		$sheet->setCellValue('M9','PLAN')->mergeCells("M9:P9");
		$sheet->setCellValue('Q9','PLAN')->mergeCells("Q9:T9");
		$sheet->setCellValue('U9','PLAN')->mergeCells("U9:X9");
		$sheet->setCellValue('Y9','PLAN')->mergeCells("Y9:AB9");
		$sheet->setCellValue('AC9','PLAN')->mergeCells("AC9:AF9");
		$sheet->setCellValue('AG9','PLAN')->mergeCells("AG9:AJ9");
		$sheet->setCellValue('AK9','PLAN')->mergeCells("AK9:AN9");
		$sheet->setCellValue('AO9','PLAN')->mergeCells("AO9:AR9");
		$sheet->setCellValue('AS9','PLAN')->mergeCells("AS9:AV9");
		$sheet->setCellValue('AW9','PLAN')->mergeCells("AW9:AZ9");
		$sheet->setCellValue('BA9','PLAN')->mergeCells("BA9:BD9");

		$sheet->setCellValue('I10','1');
		$sheet->setCellValue('M10','1');
		$sheet->setCellValue('Q10','1');
		$sheet->setCellValue('U10','1');
		$sheet->setCellValue('Y10','1');
		$sheet->setCellValue('AC10','1');
		$sheet->setCellValue('AG10','1');
		$sheet->setCellValue('AK10','1');
		$sheet->setCellValue('AO10','1');
		$sheet->setCellValue('AS10','1');
		$sheet->setCellValue('AW10','1');
		$sheet->setCellValue('BA10','1');
		$sheet->setCellValue('J10','2');
		$sheet->setCellValue('N10','2');
		$sheet->setCellValue('R10','2');
		$sheet->setCellValue('V10','2');
		$sheet->setCellValue('Z10','2');
		$sheet->setCellValue('AD10','2');
		$sheet->setCellValue('AH10','2');
		$sheet->setCellValue('AL10','2');
		$sheet->setCellValue('AP10','2');
		$sheet->setCellValue('AT10','2');
		$sheet->setCellValue('AX10','2');
		$sheet->setCellValue('BB10','2');

		$sheet->setCellValue('K10','3');
		$sheet->setCellValue('O10','3');
		$sheet->setCellValue('S10','3');
		$sheet->setCellValue('W10','3');
		$sheet->setCellValue('AA10','3');
		$sheet->setCellValue('AE10','3');
		$sheet->setCellValue('AI10','3');
		$sheet->setCellValue('AM10','3');
		$sheet->setCellValue('AQ10','3');
		$sheet->setCellValue('AU10','3');
		$sheet->setCellValue('AY10','3');
		$sheet->setCellValue('BC10','3');

		$sheet->setCellValue('L10','4');
		$sheet->setCellValue('P10','4');
		$sheet->setCellValue('T10','4');
		$sheet->setCellValue('X10','4');
		$sheet->setCellValue('AB10','4');
		$sheet->setCellValue('AF10','4');
		$sheet->setCellValue('AJ10','4');
		$sheet->setCellValue('AN10','4');
		$sheet->setCellValue('AR10','4');
		$sheet->setCellValue('AV10','4');
		$sheet->setCellValue('AZ10','4');
		$sheet->setCellValue('BD10','4');
	}
}
if(!function_exists("ohexcel_font")){
	function ohexcel_font($sheet){
		$sheet->getStyle("A1:BD10")->getFont()->setBold(true);
		$sheet->getStyle("A5:BD5")->getFont()->setItalic(true);
		$sheet->getStyle("A1")->getFont()->setSize(18);
		$sheet->getStyle("A2")->getFont()->setSize(12);
		$sheet->getStyle("F9")->getFont()->setSize(6);
		$sheet->getStyle("H9")->getFont()->setSize(6);
		$sheet->getStyle('A8:BD10')->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
		$sheet->getStyle('A8:BD10')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		$sheet->getStyle("T11")->getFont()->setSize(7);
		$sheet->getStyle('T11')->getAlignment()->applyFromArray(
    array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
		'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER))->setTextRotation(-90);
	}
}
if(!function_exists("ohexcel_size")){
	function ohexcel_size($sheet){
		$sheet->getRowDimension('1')->setRowHeight(39.75);
		$sheet->getRowDimension('2')->setRowHeight(22.25);
		$sheet->getRowDimension('3')->setRowHeight(24.75);
		$sheet->getRowDimension('4')->setRowHeight(30.75);
		$sheet->getRowDimension('5')->setRowHeight(22.5);
		$sheet->getRowDimension('6')->setRowHeight(20.25);
		$sheet->getRowDimension('7')->setRowHeight(20.25);
		$sheet->getRowDimension('8')->setRowHeight(21);
		$sheet->getRowDimension('9')->setRowHeight(27);
		$sheet->getRowDimension('10')->setRowHeight(27);
		$sheet->getColumnDimension('A')->setWidth(3.86);
		$sheet->getColumnDimension('B')->setWidth(23.43);
		$sheet->getColumnDimension('C')->setWidth(35);
		$sheet->getColumnDimension('D')->setWidth(14.43);
		for($col = 'E'; $col !== 'I'; $col++) {
		    $sheet
		        ->getColumnDimension($col)
		        ->setWidth(13);
		}

		for($col = 'I'; $col !== 'BE'; $col++) {
		    $sheet
		        ->getColumnDimension($col)
		        ->setWidth(2.65);
		}
	}
}
if(!function_exists("ohexcel_bg")){
	function ohexcel_bg($sheet){
		$sheet->getStyle('I9:BD9')->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setRGB('00B050');
		$sheet->getStyle('A8:H10')->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setRGB('D7E4BC');
		$sheet->getStyle('I10:BD10')->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setRGB('D7E4BC');
		$sheet->getStyle('I8:BD8')->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setRGB('D7E4BC');
	}
}
if(!function_exists("ohexcel_border")){
	function ohexcel_border($sheet){
		$sheet->getStyle('A3:B3')->getBorders()->getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THICK);
		$sheet->getStyle('AY3:BD3')->getBorders()->getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THICK);
		$sheet->getStyle('A8:BD10')->getBorders()->getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$sheet->getStyle('A4:BD4')->applyFromArray(array('borders' => array('top' => array(
		 'style' => PHPExcel_Style_Border::BORDER_THICK))));
		$sheet->getStyle('A6:BD6')->applyFromArray(array('borders' => array('bottom' => array(
		 'style' => PHPExcel_Style_Border::BORDER_THICK))));
		$sheet->getStyle('BD4:BD6')->applyFromArray(array('borders' => array('right' => array(
		 'style' => PHPExcel_Style_Border::BORDER_THICK))));
		$sheet->getStyle('AW4:AW6')->applyFromArray(array('borders' => array('left' => array(
		 'style' => PHPExcel_Style_Border::BORDER_THICK))));
		$sheet->getStyle('A4:A6')->applyFromArray(array('borders' => array('left' => array(
		 'style' => PHPExcel_Style_Border::BORDER_THICK))));
		$sheet->getStyle('D4:D6')->applyFromArray(array('borders' => array('right' => array(
		 'style' => PHPExcel_Style_Border::BORDER_THIN))));
		$sheet->getStyle('AB4:AB6')->applyFromArray(array('borders' => array('right' => array(
		 'style' => PHPExcel_Style_Border::BORDER_THIN))));
		$sheet->getStyle('A5:AV5')->applyFromArray(array('borders' => array(
		'top' => array('style' => PHPExcel_Style_Border::BORDER_THIN),
		'bottom' => array('style' => PHPExcel_Style_Border::BORDER_THIN)
		)));
		$sheet->getStyle('A7:BD7')->applyFromArray(array('borders' => array('bottom' => array(
		 'style' => PHPExcel_Style_Border::BORDER_THICK))));
	}
}
//*
if(!function_exists("ohexcel_image")){
	function ohexcel_image($sheet){
		$objDrawing = new PHPExcel_Worksheet_Drawing();
		$objDrawing->setName("name");
		$objDrawing->setDescription("Description");
		$objDrawing->setPath('../resources/css/images/med.jpg');
		$objDrawing->setCoordinates('AZ1');
		$objDrawing->setHeight(75);
		$objDrawing->setWidth(78);
		$objDrawing->setWorksheet($sheet);
	}
}
//*/

if(!function_exists("warna_oh")){
	function warna_oh($nilai){
		if ($nilai==="TOH")	{
			return "";
		}
		else if ($nilai==="GOH")	{
			return "";
		}
		else if ($nilai==="IFOH")	{
			return "";
		}
	}
}

if(!function_exists("ohexcel_data_overhaul")){
	function ohexcel_data_overhaul($sheet, $oh){
		/*
		$CI = get_instance();
		$CI->load->model('model1');
		$query = $CI->model1->proc_overhaul();
		//*/
		$baris = 11;
		//$baris2 = $baris+1;
		$baris_foot = 100;
		$no = 1;
		foreach ($oh as $row) {
			//print_r($row);
			
			$aw='';	$ak=''; $f=0;
			$sheet->getStyle("A$baris:BD$baris")->getBorders()->getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
			$sheet->getRowDimension($baris)->setRowHeight(23);
			
			$sheet->setCellValue('A'.$baris,$no++)->getStyle('A'.$baris)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_CENTER));
			$sheet->setCellValue('B'.$baris,$row->lok)->getStyle('B'.$baris)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_CENTER));
			$sheet->setCellValue('C'.$baris,$row->act)->getStyle('C'.$baris)->getAlignment()->applyFromArray(
				array('vertical'   => PHPExcel_Style_Alignment::VERTICAL_CENTER));
			$sheet->setCellValue('E'.$baris,$row->tgl)->getStyle('E'.$baris)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_CENTER));
			$sheet->setCellValue('F'.$baris,$row->lama)->getStyle('F'.$baris)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_CENTER));
			$sheet->getStyle("BE8:BE$baris")->applyFromArray(array('borders' => array('left' => array(
				'style' => PHPExcel_Style_Border::BORDER_THICK))));
			$sheet->getStyle("A8:A$baris")->applyFromArray(array('borders' => array('left' => array(
				'style' => PHPExcel_Style_Border::BORDER_THICK))));
			

			$fl=0; $isi=0; $aw=0; $ak=0; $nilai=""; $f=0;
			for ($i=1; $i<=48; $i++)	{
				if (strlen($row->{"a$i"})>0)	{
					//echo "$i: ".$row->{"a$i"}."<br/>";
					if ($f==0)	{		// awalnya
						$aw = $i+8; 	// kol awal
						$f=1;
						$nilai= $row->{"a$i"};	
					}
					$ak = $i+8;			// kol akhir, klo lebih dari 1
					$fl=1;				// mulai ada isi;
				}
				
				if (($fl==1) && (strlen($row->{"a$i"})==0))	{	// kosong setelah isi
					$fl=0;
					$awn = numtoa(array('', $aw));
					$akn = numtoa(array('', $ak));
					$sheet->setCellValue($awn[0].$baris,$nilai)->mergeCells("{$awn[0]}$baris:{$akn[0]}$baris")
						  ->getStyle("{$awn[0]}$baris")
						  ->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)
						  ->getStartColor()->setRGB('00B0F0');
					$sheet->getStyle("{$awn[0]}$baris")->getAlignment()->setTextRotation(90)->applyFromArray(
								array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
									  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_CENTER));
					$sheet->getRowDimension($baris)->setRowHeight(50);
					$f=0;
				}
			}
			//echo "--- ganti ---";
			
			if ($fl==1 && $i==48)	{
				$awn = numtoa(array('', $aw));
				$akn = numtoa(array('', $ak));
				$sheet->setCellValue($awn[0].$baris,$nilai)->mergeCells("{$awn[0]}$baris:{$akn[0]}$baris")
					  ->getStyle("{$awn[0]}$baris")->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)
					  ->getStartColor()->setRGB('00B0F0');
				$sheet->getStyle("{$awn[0]}$baris")->getAlignment()->setTextRotation(90)->applyFromArray(
								array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
									  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_CENTER));
				$sheet->getRowDimension($baris)->setRowHeight(50);
			}
			$baris++;		
		}
		
		$baris2 = $baris+1;
		$baris_foot = $baris+2;
		//*
		$sheet->getStyle("A$baris:BD$baris")->applyFromArray(array('borders' => array('top' => array('style' => PHPExcel_Style_Border::BORDER_THICK))));
		$sheet->setCellValue("A$baris","Note :")->mergeCells("A$baris:BD$baris")->getStyle("A$baris")->getFont()->setBold(true);
		$sheet->setCellValue("A$baris2","- Perubahan dari Schedule ini harus mendapat persetujuan dari Operations Manager dengan membuat Exception Report")->mergeCells("A$baris2:BD$baris2")
				->getStyle('A'.$baris2)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_TOP));
		$sheet->getRowDimension($baris)->setRowHeight(30);
		$sheet->getRowDimension($baris2)->setRowHeight(30);

		return ($baris_foot);
	}
}

if(!function_exists("ohexcel_jabat"))	{
	function ohexcel_jabat($sheet, $brs,$j)	{
		$b = $brs;
		//print_r($j);
		$sheet->getRowDimension($b)->setRowHeight(47);
		$sheet->getStyle("A$b:BD$b")->applyFromArray(array('borders' => array('top' => array(
			'style' => PHPExcel_Style_Border::BORDER_THICK))));
		//$sheet->getStyle("A$b:BD$b")->getBorders()->getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THICK);
		$sheet->setCellValue('A'.$b," Prepared by")->mergeCells("A$b:B$b")->getStyle('A'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_BOTTOM));
		$sheet->setCellValue('C'.$b,": {$j->nPre}")->mergeCells("C$b:F$b")->getStyle('C'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_BOTTOM));
		$sheet->setCellValue('G'.$b," Reviewed by")->getStyle('G'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_BOTTOM));
		$sheet->setCellValue('H'.$b,": {$j->nRev}")->mergeCells("H$b:AB$b")->getStyle('H'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_BOTTOM));
		$sheet->setCellValue('AC'.$b," Approved by")->mergeCells("AC$b:AH$b")->getStyle('AC'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_BOTTOM));	
		$sheet->setCellValue('AI'.$b,": {$j->nApr}")->mergeCells("AI$b:BD$b")->getStyle('AI'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_BOTTOM));
		
		$b++;
		//$sheet->getRowDimension($b)->setRowHeight(37);
		$sheet->setCellValue('A'.$b," Position")->getStyle('A'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_TOP));
		$sheet->setCellValue('C'.$b,": {$j->jPre}")->mergeCells("C$b:F$b")->getStyle('C'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_TOP));
		$sheet->setCellValue('G'.$b," Position")->getStyle('G'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_TOP));
		$sheet->setCellValue('H'.$b,": {$j->jRev}")->mergeCells("H$b:AB$b")->getStyle('H'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_TOP));
		$sheet->setCellValue('AC'.$b," Position")->getStyle('AC'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_TOP));
		$sheet->setCellValue('AI'.$b,": {$j->jApr}")->mergeCells("AI$b:BD$b")->getStyle('AI'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_TOP));	
		$sheet->getStyle("A$brs:BD$b")->getFont()->setBold(true);
		
		$sheet->getStyle("A$b:BD$b")->applyFromArray(array('borders' => array('top' => array(
			'style' => PHPExcel_Style_Border::BORDER_THIN))));
		
		
		$b++;
		$sheet->setCellValue('A'.$b," Date")->getStyle('A'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_TOP));
		$sheet->setCellValue('G'.$b," Date")->getStyle('G'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_TOP));
		$sheet->setCellValue('AC'.$b," Date")->getStyle('AC'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_TOP));
		
		$sheet->getStyle("A$b:BD$b")->applyFromArray(array('borders' => array('bottom' => array(
			'style' => PHPExcel_Style_Border::BORDER_THICK))));
		$sheet->getStyle("F$brs:F$b")->applyFromArray(array('borders' => array('right' => array(
			'style' => PHPExcel_Style_Border::BORDER_THICK))));
		$sheet->getStyle("AB$brs:AB$b")->applyFromArray(array('borders' => array('right' => array(
			'style' => PHPExcel_Style_Border::BORDER_THICK))));
	}
}

