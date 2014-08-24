<?php

try {
    $returnResponse = $_REQUEST['returnResponse'];
    sleep(1);
    if ($returnResponse != "") {
        header('HTTP/1.0 '.$returnResponse.' Server status', true, $returnResponse);
        echo '{success:false, message:"Faked error from server", errors:{"photo-path":"The server returned this"}}';
        $tersimpan = false;
    } else {
        $file = $_FILES['bpm3'];
        $fileName = $file['name'];
        $fileType = $file['type'];
        $fileSize = $file['size'];
        $fileLokasi = $file['tmp_name'];
        if (!$fileSize) {
            $fileSize = $_SERVER['CONTENT_LENGTH'];
        }
        
        $max_upload = (int)(ini_get('upload_max_filesize'));
		$max_post = (int)(ini_get('post_max_size'));
		$memory_limit = (int)(ini_get('memory_limit'));
		$upload_mb = min($max_upload, $max_post, $memory_limit);
        
        
        switch ($file['error']) {
			case UPLOAD_ERR_OK:
				break;
			case UPLOAD_ERR_NO_FILE:
				throw new RuntimeException('No file sent.');
			case UPLOAD_ERR_INI_SIZE:
			case UPLOAD_ERR_FORM_SIZE:
				//
				throw new RuntimeException("Exceeded filesize limit.");
			default:
				throw new RuntimeException('Unknown errors.');
		}
        
        if (file_exists("upload/" . $fileName))      {
			echo $fileName . " already exists. ";
			$tersimpan;
		} else  {
			move_uploaded_file($fileLokasi, "upload/" . $fileName);
			$tersimpan = true;
			//echo "Stored in: " . "upload/" . $fileName;
		}


        echo json_encode(array(
            "success" => true,
            "fileName" => $fileName,
            "fileSize" => $fileSize,
            "uploaded" => $tersimpan
        ));
    }
}
catch (RuntimeException $e) {
	echo json_encode(array(
            "success" => false,
            "error" => $e->getMessage()." Max upload File: ".$max_upload."MB"
	));
}
?>
