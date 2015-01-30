<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


if(!function_exists("ohexcel_judul_gabung")){
	function ohexcel_judul_gabung($sheet,$unit){
		$sheet->setCellValue('A1','PT MEDCO E&P INDONESIA')->mergeCells('A1:AY1')->getStyle('A1')->getAlignment()->applyFromArray(
    	array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
			'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER));
		$sheet->setCellValue('A2', "PLANNING PREVENTIVE MAINTENCANCE ".strtoupper($unit))->mergeCells('A2:AY2')->getStyle('A2')->getAlignment()->applyFromArray(
    	array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
			'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER));
	}
}
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

if(!function_exists("ohexcel_table_gabung")){
	function ohexcel_table_gabung($sheet,$thn,$unit){
		$t = "Year : $thn";
		$sheet->setCellValue('A3', 'Area : SSE Block')->mergeCells('A3:B3');
		$sheet->setCellValue('AS3', $t)->mergeCells('AS3:AY3')->getStyle('AS3')->getAlignment()->applyFromArray(
		    array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_RIGHT));
		$sheet->setCellValue('A4', 'Custodian')->mergeCells('A4:C4');
		$sheet->setCellValue('A5', 'Production Departement')->mergeCells('A5:C5');
		$sheet->setCellValue('A6', 'Location : SSE Block')->mergeCells('A6:C6');
		$sheet->setCellValue('D4', 'Equipment Name :')->mergeCells('D4:W4');
		$sheet->setCellValue('D5', $unit)->mergeCells('D5:W6')->getStyle('D5')->getAlignment()->applyFromArray(
		    array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
		    	'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER));
		$sheet->setCellValue('X4', 'Dated Issued :')->mergeCells('X4:AP4')->getStyle('AQ4')->getAlignment()->applyFromArray(
		    array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
		    	'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER));;
		$sheet->setCellValue('AQ4', 'Page')->mergeCells('AQ4:AY4')->getStyle('AQ4')->getAlignment()->applyFromArray(
		    array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
		    	'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER));
		/*
		$sheet->setCellValue('AW5','1 of 1')->mergeCells("AW5:BD6")->getStyle('AW5')->getAlignment()->applyFromArray(
		    array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
		    	'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER));
		//*/
	}
}
if(!function_exists("ohexcel_table")){
	function ohexcel_table($sheet,$thn,$unit){
		$t = "Year : $thn";
		$sheet->setCellValue('A3', 'Area : SSE Block')->mergeCells('A3:B3');
		$sheet->setCellValue('AY3', $t)->mergeCells('AY3:BD3')->getStyle('AY3')->getAlignment()->applyFromArray(
		    array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_RIGHT));
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
		$sheet->setCellValue('F9','DURATION (DAYS)')->mergeCells("F9:F10")->getStyle('F9')->getAlignment()->setWrapText(true);;
		$sheet->setCellValue('G8','ACTUAL')->mergeCells("G8:H8");
		$sheet->setCellValue('G9','DATE')->mergeCells("G9:G10");
		$sheet->setCellValue('H9','DURATION (DAYS)')->mergeCells("H9:H10")->getStyle('H9')->getAlignment()->setWrapText(true);;

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
if(!function_exists("ohexcel_head_gabung")){
	function ohexcel_head_gabung($sheet){
		$sheet->setCellValue('A8','NO')->mergeCells("A8:A10");
		$sheet->setCellValue('B8','LOCATION')->mergeCells("B8:B10");
		//$sheet->setCellValue('C8','DESCRIPTION')->mergeCells("C8:D8");
		$sheet->setCellValue('C9','ACTIVITY')->mergeCells("C8:C10");
		//$sheet->setCellValue('D9','ORDER NO')->mergeCells("D9:D10");
		//$sheet->setCellValue('E8','PLANNING')->mergeCells("E8:F8");
		//$sheet->setCellValue('E9','DATE')->mergeCells("E9:E10");
		//$sheet->setCellValue('F9','PLAN DURATION OR SHUTDOWN (DAYS)')->mergeCells("F9:F10")->getStyle('F9')->getAlignment()->setWrapText(true);;
		//$sheet->setCellValue('G8','ACTUAL')->mergeCells("G8:H8");
		//$sheet->setCellValue('G9','DATE')->mergeCells("G9:G10");
		//$sheet->setCellValue('H9','PLAN DURATION OR SHUTDOWN (DAYS)')->mergeCells("H9:H10")->getStyle('H9')->getAlignment()->setWrapText(true);;

		$sheet->setCellValue('D8','JANUARY')->mergeCells("D8:G8");
		$sheet->setCellValue('H8','FEBRUARY')->mergeCells("H8:K8");
		$sheet->setCellValue('L8','MARCH')->mergeCells("L8:O8");
		$sheet->setCellValue('P8','APRIL')->mergeCells("P8:S8");
		$sheet->setCellValue('T8','MAY')->mergeCells("T8:W8");
		$sheet->setCellValue('X8','JUNE')->mergeCells("X8:AA8");
		$sheet->setCellValue('AB8','JULY')->mergeCells("AB8:AE8");
		$sheet->setCellValue('AF8','AUGUST')->mergeCells("AF8:AI8");
		$sheet->setCellValue('AJ8','SEPTEMBER')->mergeCells("AJ8:AM8");
		$sheet->setCellValue('AN8','OCTOBER')->mergeCells("AN8:AQ8");
		$sheet->setCellValue('AR8','NOVEMBER')->mergeCells("AR8:AU8");
		$sheet->setCellValue('AV8','DECEMBER')->mergeCells("AV8:AY8");
		
		$sheet->setCellValue('D9','PLAN')->mergeCells("D9:G9");
		$sheet->setCellValue('H9','PLAN')->mergeCells("H9:K9");
		$sheet->setCellValue('L9','PLAN')->mergeCells("L9:O9");
		$sheet->setCellValue('P9','PLAN')->mergeCells("P9:S9");
		$sheet->setCellValue('T9','PLAN')->mergeCells("T9:W9");
		$sheet->setCellValue('X9','PLAN')->mergeCells("X9:AA9");
		$sheet->setCellValue('AB9','PLAN')->mergeCells("AB9:AE9");
		$sheet->setCellValue('AF9','PLAN')->mergeCells("AF9:AI9");
		$sheet->setCellValue('AJ9','PLAN')->mergeCells("AJ9:AM9");
		$sheet->setCellValue('AN9','PLAN')->mergeCells("AN9:AQ9");
		$sheet->setCellValue('AR9','PLAN')->mergeCells("AR9:AU9");
		$sheet->setCellValue('AV9','PLAN')->mergeCells("AV9:AY9");
		
		$sheet->setCellValue('D10','1');
		$sheet->setCellValue('H10','1');
		$sheet->setCellValue('L10','1');
		$sheet->setCellValue('P10','1');
		$sheet->setCellValue('T10','1');
		$sheet->setCellValue('X10','1');
		$sheet->setCellValue('AB10','1');
		$sheet->setCellValue('AF10','1');
		$sheet->setCellValue('AJ10','1');
		$sheet->setCellValue('AN10','1');
		$sheet->setCellValue('AR10','1');
		$sheet->setCellValue('AV10','1');
		
		$sheet->setCellValue('E10','2');
		$sheet->setCellValue('I10','2');
		$sheet->setCellValue('M10','2');
		$sheet->setCellValue('Q10','2');
		$sheet->setCellValue('U10','2');
		$sheet->setCellValue('Y10','2');
		$sheet->setCellValue('AC10','2');
		$sheet->setCellValue('AG10','2');
		$sheet->setCellValue('AK10','2');
		$sheet->setCellValue('AO10','2');
		$sheet->setCellValue('AS10','2');
		$sheet->setCellValue('AW10','2');
		
		$sheet->setCellValue('F10','3');
		$sheet->setCellValue('J10','3');
		$sheet->setCellValue('N10','3');
		$sheet->setCellValue('R10','3');
		$sheet->setCellValue('V10','3');
		$sheet->setCellValue('Z10','3');
		$sheet->setCellValue('AD10','3');
		$sheet->setCellValue('AH10','3');
		$sheet->setCellValue('AL10','3');
		$sheet->setCellValue('AP10','3');
		$sheet->setCellValue('AT10','3');
		$sheet->setCellValue('AX10','3');
		
		$sheet->setCellValue('G10','4');
		$sheet->setCellValue('K10','4');
		$sheet->setCellValue('O10','4');
		$sheet->setCellValue('S10','4');
		$sheet->setCellValue('W10','4');
		$sheet->setCellValue('AA10','4');
		$sheet->setCellValue('AE10','4');
		$sheet->setCellValue('AI10','4');
		$sheet->setCellValue('AM10','4');
		$sheet->setCellValue('AQ10','4');
		$sheet->setCellValue('AU10','4');
		$sheet->setCellValue('AY10','4');
		
	}
}

if(!function_exists("ohexcel_font")){
	function ohexcel_font($sheet){
		$sheet->getStyle("A1:BD10")->getFont()->setBold(true);
		$sheet->getStyle("A5:BD5")->getFont()->setItalic(true);
		$sheet->getStyle("A1")->getFont()->setSize(18);
		$sheet->getStyle("A2")->getFont()->setSize(12);
		//$sheet->getStyle("F9")->getFont()->setSize(6);
		//$sheet->getStyle("H9")->getFont()->setSize(6);
		$sheet->getStyle('A8:BD10')->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
		$sheet->getStyle('A8:BD10')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		$sheet->getStyle("T11")->getFont()->setSize(7);
		$sheet->getStyle('T11')->getAlignment()->applyFromArray(
    array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
		'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER))->setTextRotation(-90);
	}
}
if(!function_exists("ohexcel_font_gabung")){
	function ohexcel_font_gabung($sheet){
		$sheet->getStyle("A1:AY10")->getFont()->setBold(true);
		$sheet->getStyle("A5:AY5")->getFont()->setItalic(true);
		$sheet->getStyle("A1")->getFont()->setSize(18);
		$sheet->getStyle("A2")->getFont()->setSize(12);
		//$sheet->getStyle("E9")->getFont()->setSize(6);
		//$sheet->getStyle("G9")->getFont()->setSize(6);
		$sheet->getStyle('A8:AY10')->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
		$sheet->getStyle('A8:AY10')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		$sheet->getStyle("H11")->getFont()->setSize(7);
		$sheet->getStyle('H11')->getAlignment()->applyFromArray(
			array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
				'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER))->setTextRotation(-90);
	}
}

if(!function_exists("ohexcel_size_gabung")){
	function ohexcel_size_gabung($sheet){
		$sheet->getRowDimension('1')->setRowHeight(39.75);
		$sheet->getRowDimension('2')->setRowHeight(22.25);
		$sheet->getRowDimension('3')->setRowHeight(26.75);
		$sheet->getRowDimension('4')->setRowHeight(30.75);
		$sheet->getRowDimension('5')->setRowHeight(22.5);
		$sheet->getRowDimension('6')->setRowHeight(20.25);
		$sheet->getRowDimension('7')->setRowHeight(20.25);
		$sheet->getRowDimension('8')->setRowHeight(21);
		$sheet->getRowDimension('9')->setRowHeight(27);
		$sheet->getRowDimension('10')->setRowHeight(27);
		$sheet->getColumnDimension('A')->setWidth(3.86);
		$sheet->getColumnDimension('B')->setWidth(20.43);
		$sheet->getColumnDimension('C')->setWidth(30);
		//$sheet->getColumnDimension('D')->setWidth(14.43);

		for($col = 'D'; $col !== 'AZ'; $col++) {
		    $sheet
		        ->getColumnDimension($col)
		        ->setWidth(2.75);
		}
	}
}
if(!function_exists("ohexcel_size")){
	function ohexcel_size($sheet){
		$sheet->getRowDimension('1')->setRowHeight(39.75);
		$sheet->getRowDimension('2')->setRowHeight(22.25);
		$sheet->getRowDimension('3')->setRowHeight(26.75);
		$sheet->getRowDimension('4')->setRowHeight(30.75);
		$sheet->getRowDimension('5')->setRowHeight(22.5);
		$sheet->getRowDimension('6')->setRowHeight(20.25);
		$sheet->getRowDimension('7')->setRowHeight(20.25);
		$sheet->getRowDimension('8')->setRowHeight(21);
		$sheet->getRowDimension('9')->setRowHeight(27);
		$sheet->getRowDimension('10')->setRowHeight(27);
		$sheet->getColumnDimension('A')->setWidth(3.86);
		$sheet->getColumnDimension('B')->setWidth(23.43);
		$sheet->getColumnDimension('C')->setWidth(23);
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
if(!function_exists("ohexcel_bg_gabung")){
	function ohexcel_bg_gabung($sheet){		
		$sheet->getStyle('A8:AY10')->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setRGB('D7E4BC');
		//$sheet->getStyle('I10:BD10')->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setRGB('D7E4BC');
		//$sheet->getStyle('I8:BD8')->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setRGB('D7E4BC');
		$sheet->getStyle('D9:AY9')->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setRGB('00B050');
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
		$sheet->getStyle('A5:AZ5')->applyFromArray(array('borders' => array(
			'top' => array('style' => PHPExcel_Style_Border::BORDER_THIN),
			'bottom' => array('style' => PHPExcel_Style_Border::BORDER_THIN)
		)));
		$sheet->getStyle('A7:BD7')->applyFromArray(array('borders' => array('bottom' => array(
		 'style' => PHPExcel_Style_Border::BORDER_THICK))));
	}
}
if(!function_exists("ohexcel_border_gabung")){
	function ohexcel_border_gabung($sheet){
		$sheet->getStyle('A3:B3')->getBorders()->getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THICK);
		$sheet->getStyle('AS3:AY3')->getBorders()->getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THICK);
		$sheet->getStyle('A8:AY10')->getBorders()->getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
		$sheet->getStyle('A4:AY4')->applyFromArray(array('borders' => array('top' => array(
			'style' => PHPExcel_Style_Border::BORDER_THICK))));
		$sheet->getStyle('A6:AY6')->applyFromArray(array('borders' => array('bottom' => array(
			'style' => PHPExcel_Style_Border::BORDER_THICK))));
		$sheet->getStyle('AY4:AY6')->applyFromArray(array('borders' => array('right' => array(
			'style' => PHPExcel_Style_Border::BORDER_THICK))));
		$sheet->getStyle('AP4:AP6')->applyFromArray(array('borders' => array('right' => array(
			'style' => PHPExcel_Style_Border::BORDER_THICK))));
		$sheet->getStyle('A4:A6')->applyFromArray(array('borders' => array('left' => array(
			'style' => PHPExcel_Style_Border::BORDER_THICK))));
		$sheet->getStyle('C4:C6')->applyFromArray(array('borders' => array('right' => array(
			'style' => PHPExcel_Style_Border::BORDER_THIN))));
		$sheet->getStyle('W4:W6')->applyFromArray(array('borders' => array('right' => array(
			'style' => PHPExcel_Style_Border::BORDER_THIN))));
		$sheet->getStyle('A5:AY5')->applyFromArray(array('borders' => array(
			'top' => array('style' => PHPExcel_Style_Border::BORDER_THIN))));
		$sheet->getStyle('A6:C6')->applyFromArray(array('borders' => array(
			'top' => array('style' => PHPExcel_Style_Border::BORDER_THIN))));
		$sheet->getStyle('A7:AY7')->applyFromArray(array('borders' => array('bottom' => array(
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
if(!function_exists("ohexcel_image_gabung")){
	function ohexcel_image_gabung($sheet){
		$objDrawing = new PHPExcel_Worksheet_Drawing();
		$objDrawing->setName("name");
		$objDrawing->setDescription("Description");
		$objDrawing->setPath('../resources/css/images/med.jpg');
		$objDrawing->setCoordinates('AV1');
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

if(!function_exists("ohexcel_warna")){
	function ohexcel_warna($data){
		//$hijau = array("PM8K","PM9K","PM12K","PM16K","PM18K");
		//$merah = array("PM24K","PM32K","PM36K","PM48K","PM72K");
		$d = explode(";", $data);
		$n = (int) $d[1];
		//echo $d[0]." ".$d[1];
		if (count($d)>1)	{
			if ($n<=3000)			return "a9d08e";
			else if ($n<=4500)		return "00b050";
			else if ($n<=9000)		return "b4c6e7";
			else if ($n<=16000)		return "ffd966";
			else if ($n<=24000)		return "f4b084";
			else if ($n<=36000)		return "b46c95";
			else if ($n<=1000000)	return "ff2828";
		}
		return "ffffff";
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
			$sheet->setCellValue('D'.$baris,$row->wo)->getStyle('D'.$baris)->getAlignment()->applyFromArray(
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
					$d = explode(";", $nilai);
					$sheet->setCellValue($awn[0].$baris,$d[0])->mergeCells("{$awn[0]}$baris:{$akn[0]}$baris")
						  ->getStyle("{$awn[0]}$baris")->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)
						  ->getStartColor()->setRGB(ohexcel_warna($nilai));		// 
					//*
					$sheet->getStyle("{$awn[0]}$baris")->getAlignment()->setTextRotation(90)->applyFromArray(
								array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
									  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_CENTER));
					//*/
					$sheet->getRowDimension($baris)->setRowHeight(50);
					$f=0;
				}
			}
			//echo "--- ganti ---";
			if ( ($i>48) && (strlen($row->a48)>0))	{
				$awn = numtoa(array('', $aw));
				$akn = numtoa(array('', $ak));
				//echo "48 ====>====>====>====> $nilai @".$awn[0].$baris.", merge: ".$awn[0].$baris.":".$akn[0].$baris."<br/><br/>";
				$d = explode(";", $nilai);
				$sheet->setCellValue($awn[0].$baris,$d[0])->mergeCells("{$awn[0]}$baris:{$akn[0]}$baris")
					  ->getStyle("{$awn[0]}$baris")->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)
					  ->getStartColor()->setRGB(ohexcel_warna($nilai));

				$sheet->getStyle("{$awn[0]}$baris")->getAlignment()->setTextRotation(90)->applyFromArray(
								array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
									  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_CENTER));

				$sheet->getRowDimension($baris)->setRowHeight(50);
			}
			/*
			if ($fl==1 && $i==48)	{
				$awn = numtoa(array('', $aw));
				$akn = numtoa(array('', $ak));
				$sheet->setCellValue($awn[0].$baris,$nilai)->mergeCells("{$awn[0]}$baris:{$akn[0]}$baris")
					  ->getStyle("{$awn[0]}$baris")->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)
					  ->getStartColor()->setRGB(ohexcel_warna($nilai));
				$sheet->getStyle("{$awn[0]}$baris")->getAlignment()->setTextRotation(90)->applyFromArray(
								array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
									  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_CENTER));
				$sheet->getRowDimension($baris)->setRowHeight(50);
			}
			//*/
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
if(!function_exists("ohexcel_data_overhaul_gabung")){
	function ohexcel_data_overhaul_gabung($sheet, $oh){
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
			$sheet->getStyle("A$baris:AY$baris")->getBorders()->getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
			$sheet->getRowDimension($baris)->setRowHeight(23);
			
			$sheet->setCellValue('A'.$baris,$no++)->getStyle('A'.$baris)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_CENTER));
			$sheet->setCellValue('B'.$baris,$row->lok)->getStyle('B'.$baris)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_CENTER));
			$sheet->setCellValue('C'.$baris,$row->act)->getStyle('C'.$baris)->getAlignment()->applyFromArray(
				array('vertical'   => PHPExcel_Style_Alignment::VERTICAL_CENTER));
			/*
			$sheet->setCellValue('E'.$baris,$row->tgl)->getStyle('E'.$baris)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_CENTER));
			$sheet->setCellValue('F'.$baris,$row->lama)->getStyle('F'.$baris)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_CENTER));
			//*/
			$sheet->getStyle("AY8:AY$baris")->applyFromArray(array('borders' => array('right' => array(
				'style' => PHPExcel_Style_Border::BORDER_THICK))));
			$sheet->getStyle("A8:A$baris")->applyFromArray(array('borders' => array('left' => array(
				'style' => PHPExcel_Style_Border::BORDER_THICK))));
			

			$fl=0; 		// untuk akhir 
			$isi=0; $aw=0; $ak=0; $nilai=""; 
			$fm=0;		// untuk merge
			$os=3;
			//echo "awal equipment {$row->act}<br/>";
			for ($i=1; $i<=48; $i++)	{
				/*
				if (strlen($row->{"a$i"})>0)	{
					echo "@i: $i, nilai: '$nilai', fl: $fl, aktv: ".$row->{"a$i"}."<br/>";
				}
				//*/
				if ($fl==1)	{
					//echo "i: $i. fl: $fl<br/>";
					$awn = numtoa(array('', $aw));
					$akn = numtoa(array('', $ak));
					if ((strlen($row->{"a$i"})>0) && ($row->{"a$i"}!==$nilai))	{	// ada isi dan sama dengan nilai sebelum
						$d = explode(";", $nilai);
						$sheet->setCellValue($awn[0].$baris,$d[0])->mergeCells("{$awn[0]}$baris:{$akn[0]}$baris")
							  ->getStyle("{$awn[0]}$baris")->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)
							  ->getStartColor()->setRGB(ohexcel_warna($nilai));		// 
						//*
						$sheet->getStyle("{$awn[0]}$baris")->getAlignment()->setTextRotation(90)->applyFromArray(
									array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
										  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_CENTER));
						//*/
						$sheet->getRowDimension($baris)->setRowHeight(50);
						
						//echo "====>====>====>====> $nilai @".$awn[0].$baris.", merge: ".$awn[0].$baris.":".$akn[0].$baris."<br/><br/>";
						$fl=1;
						$aw = $i+$os; 	// kol awal
						$nilai=$row->{"a$i"};
						/*
						$aw = $i+$os; 	// kol awal
						//$f=1;
						$nilai= $row->{"a$i"};	
						//}
						$ak = $i+$os;			// kol akhir, klo lebih dari 1
						$fl=1;				// mulai ada isi;
						//*/
					}
					else if (strlen($row->{"a$i"})==0)	{
						$d = explode(";", $nilai);
						$sheet->setCellValue($awn[0].$baris,$d[0])->mergeCells("{$awn[0]}$baris:{$akn[0]}$baris")
							  ->getStyle("{$awn[0]}$baris")->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)
							  ->getStartColor()->setRGB(ohexcel_warna($nilai));		// 
						//*
						$sheet->getStyle("{$awn[0]}$baris")->getAlignment()->setTextRotation(90)->applyFromArray(
									array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
										  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_CENTER));
						//*/
						$sheet->getRowDimension($baris)->setRowHeight(50);
						//echo "====>====>====>====> $nilai @".$awn[0].$baris.", merge: ".$awn[0].$baris.":".$akn[0].$baris."<br/><br/>";
						//$nilai="";
						$fl=0;
						
					}
					$ak = $i+$os;			// kol akhir, klo lebih dari 1
				}
				
				if ($fl==0)	{
					if (strlen($row->{"a$i"})>0)	{	// ada isi dan sama dengan nilai sebelum
						
					//if ($f==0)	{		// awalnya
						$aw = $i+$os; 	// kol awal
						//$f=1;
						$nilai= $row->{"a$i"};	
						
						//}
						$ak = $i+$os;			// kol akhir, klo lebih dari 1
						$fl=1;				// mulai ada isi;
						//echo "mulai ada: $nilai, i: $i, fl: $fl<br/>";
					}
				}
				/*
				if ((strlen($row->{"a$i"})>0) && ($row->{"a$i"}!==$nilai))	{	// ada isi dan sama dengan nilai sebelum
					
					if ($f==0)	{		// awalnya
						$aw = $i+$os; 	// kol awal
						$f=1;
						$nilai= $row->{"a$i"};	
					}
					$ak = $i+$os;			// kol akhir, klo lebih dari 1
					$fl=1;				// mulai ada isi;
				}
				
				if (strlen($row->{"a$i"})>0)	{
					//echo "$i: ".$row->{"a$i"}."<br/>";
					if ($f==0)	{		// awalnya
						$aw = $i+$os; 	// kol awal
						$f=1;
						$nilai= $row->{"a$i"};	
					}
					$ak = $i+$os;			// kol akhir, klo lebih dari 1
					$fl=1;				// mulai ada isi;
				}
				
				if (($fl==1) && (strlen($row->{"a$i"})==0))	{	// kosong setelah isi
					$fl=0;
					$awn = numtoa(array('', $aw));
					$akn = numtoa(array('', $ak));
					$sheet->setCellValue($awn[0].$baris,$nilai)->mergeCells("{$awn[0]}$baris:{$akn[0]}$baris")
						  ->getStyle("{$awn[0]}$baris")->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)
						  ->getStartColor()->setRGB(ohexcel_warna($nilai));		// 

					$sheet->getStyle("{$awn[0]}$baris")->getAlignment()->setTextRotation(90)->applyFromArray(
								array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
									  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_CENTER));

					$sheet->getRowDimension($baris)->setRowHeight(50);
					$f=0;
				}
				//*/
			}
			//
			//echo "--- ganti ---$i $<br/>";
			if ( ($i>48) && (strlen($row->a48)>0))	{
				$awn = numtoa(array('', $aw));
				$akn = numtoa(array('', $ak));
				//echo "48 ====>====>====>====> $nilai @".$awn[0].$baris.", merge: ".$awn[0].$baris.":".$akn[0].$baris."<br/><br/>";
				$d = explode(";", $nilai);
				$sheet->setCellValue($awn[0].$baris,$d[0])->mergeCells("{$awn[0]}$baris:{$akn[0]}$baris")
					  ->getStyle("{$awn[0]}$baris")->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)
					  ->getStartColor()->setRGB(ohexcel_warna($nilai));		// 

				$sheet->getStyle("{$awn[0]}$baris")->getAlignment()->setTextRotation(90)->applyFromArray(
								array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
									  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_CENTER));

				$sheet->getRowDimension($baris)->setRowHeight(50);
			}
			/*
			if (($i>48) && (strlen($row->{"a$i"})>0))	{
				echo "--- ganti ---";
				
				$sheet->setCellValue($awn[0].$baris,$nilai)->mergeCells("{$awn[0]}$baris:{$akn[0]}$baris")
					  ->getStyle("{$awn[0]}$baris")->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)
					  ->getStartColor()->setRGB(ohexcel_warna($nilai));

				$sheet->getStyle("{$awn[0]}$baris")->getAlignment()->setTextRotation(90)->applyFromArray(
								array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
									  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_CENTER));

				$sheet->getRowDimension($baris)->setRowHeight(50);
			}
			//*/
			$baris++;		
		}
		
		$baris2 = $baris+1;
		$baris_foot = $baris+2;
		//*
		$sheet->getStyle("A$baris:AY$baris")->applyFromArray(array('borders' => array('top' => array('style' => PHPExcel_Style_Border::BORDER_THICK))));
		$sheet->setCellValue("A$baris","Note :")->mergeCells("A$baris:AY$baris")->getStyle("A$baris")->getFont()->setBold(true);
		$sheet->setCellValue("A$baris2","- Perubahan dari Schedule ini harus mendapat persetujuan dari Operations Manager dengan membuat Exception Report")->mergeCells("A$baris2:BD$baris2")
				->getStyle('A'.$baris2)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_TOP));
		$sheet->getRowDimension($baris)->setRowHeight(30);
		$sheet->getRowDimension($baris2)->setRowHeight(30);

		return ($baris_foot);
	}
}

if(!function_exists("ohexcel_jabat_gabung"))	{
	function ohexcel_jabat_gabung($sheet, $brs,$j)	{
		$a = $b = $brs;
		//print_r($j);
		$sheet->getRowDimension($b)->setRowHeight(47);
		$sheet->getStyle("A$b:AY$b")->applyFromArray(array('borders' => array('top' => array(
			'style' => PHPExcel_Style_Border::BORDER_THICK))));
		//$sheet->getStyle("A$b:BD$b")->getBorders()->getAllBorders()->setBorderStyle(PHPExcel_Style_Border::BORDER_THICK);
		$sheet->setCellValue('A'.$b," Prepared by")->mergeCells("A$b:B$b")->getStyle('A'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_BOTTOM));
		$sheet->setCellValue('C'.$b,": {$j->nPre}")->mergeCells("C$b:D$b")->getStyle('C'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_BOTTOM));
		$sheet->setCellValue('E'.$b," Reviewed by")->getStyle('E'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_BOTTOM));
		$sheet->setCellValue('L'.$b,": {$j->nRev}")->mergeCells("L$b:Z$b")->getStyle('L'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_BOTTOM));
		$sheet->setCellValue('AA'.$b," Approved by")->mergeCells("AA$b:AF$b")->getStyle('AA'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_BOTTOM));	
		$sheet->setCellValue('AG'.$b,": {$j->nApr}")->mergeCells("AG$b:AY$b")->getStyle('AG'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_BOTTOM));
		
		$b++;
		//$sheet->getRowDimension($b)->setRowHeight(37);
		$sheet->setCellValue('A'.$b," Position")->getStyle('A'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_TOP));
		$sheet->setCellValue('C'.$b,": {$j->jPre}")->mergeCells("C$b:D$b")->getStyle('C'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_TOP));
		$sheet->setCellValue('E'.$b," Position")->getStyle('E'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_TOP));
		$sheet->setCellValue('L'.$b,": {$j->jRev}")->mergeCells("L$b:Z$b")->getStyle('L'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_TOP));
		$sheet->setCellValue('AA'.$b," Position")->getStyle('AA'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_TOP));
		$sheet->setCellValue('AG'.$b,": {$j->jApr}")->mergeCells("AG$b:AY$b")->getStyle('AG'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_TOP));	
		$sheet->getStyle("A$brs:AY$b")->getFont()->setBold(true);
		
		$sheet->getStyle("A$b:AY$b")->applyFromArray(array('borders' => array('top' => array(
			'style' => PHPExcel_Style_Border::BORDER_THIN))));
		
		
		$b++;
		$sheet->setCellValue('A'.$b," Date")->getStyle('A'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_TOP));
		$sheet->setCellValue('E'.$b," Date")->getStyle('C'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_TOP));
		$sheet->setCellValue('AA'.$b," Date")->getStyle('AA'.$b)->getAlignment()->applyFromArray(
				array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					  'vertical'   => PHPExcel_Style_Alignment::VERTICAL_TOP));
		
		$sheet->getStyle("A$b:AY$b")->applyFromArray(array('borders' => array('bottom' => array(
			'style' => PHPExcel_Style_Border::BORDER_THICK))));
		$sheet->getStyle("D$brs:D$b")->applyFromArray(array('borders' => array('right' => array(
			'style' => PHPExcel_Style_Border::BORDER_THICK))));
		$sheet->getStyle("Z$brs:Z$b")->applyFromArray(array('borders' => array('right' => array(
			'style' => PHPExcel_Style_Border::BORDER_THICK))));
		
		$sheet->getStyle("AY$a:AY$b")->applyFromArray(array('borders' => array('right' => array(
			'style' => PHPExcel_Style_Border::BORDER_THICK))));
		$sheet->getStyle("A$a:A$b")->applyFromArray(array('borders' => array('left' => array(
			'style' => PHPExcel_Style_Border::BORDER_THICK))));
	}
}
if(!function_exists("ohexcel_jabat"))	{
	function ohexcel_jabat($sheet, $brs,$j)	{
		$a = $b = $brs;
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
			
		$sheet->getStyle("BD$a:BD$b")->applyFromArray(array('borders' => array('right' => array(
			'style' => PHPExcel_Style_Border::BORDER_THICK))));
		$sheet->getStyle("A$a:A$b")->applyFromArray(array('borders' => array('left' => array(
			'style' => PHPExcel_Style_Border::BORDER_THICK))));
	}
}

