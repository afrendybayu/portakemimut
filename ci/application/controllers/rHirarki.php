<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rHirarki extends CI_Controller {
		
	public function index()	{
		//$this->load->view('welcome_message');
		try	{
			//$id = $this->db->escape($_GET['id']);
			//echo "{$_GET['id']}<br/>";
			//$query = $this->db->query("select id, nama from listEvent");
			$parent_id = (isset($_GET['node']))?$this->db->escape($_GET['node']):0;
			//echo "parent_id: $parent_id";
			//$sql =	"SELECT id, nama as text,flag as unit FROM hirarki WHERE parent='".$parent_id."'  ORDER BY nama ASC";
			$sql =	"SELECT id, nama as text FROM hirarki WHERE parent=$parent_id  ORDER BY nama ASC";
			//echo "sql: $sql<br/>";
			//$sql = "SELECT * FROM some_table WHERE id = ? AND status = ? AND author = ?"; 
			$query = $this->db->query($sql, $parent_id);
			
			
			//$this->db->select('id, nama')->from('listEvent');
			// $this->db->query('SELECT foo FROM bar WHERE bof=? AND zot=?', array($bof, $zot)); 
			//$query = $this->db->get();
			
			$isi = array();	$arr = array(); $k=0;
			if ($query->num_rows() > 0)	{
				foreach ($query->result() as $row)	{
					//print_r($row); echo "<br/>";
					$arr[$k]['id'] = $row->id;
					$arr[$k]['text'] = $row->text;
					$arr[$k]['tipe'] = 'h';
					$k++;
				}
			}
			
			
			if (count($arr)==0)	{
				//$sql =	"SELECT id, nama, tag FROM equip where unit_id='".$parent_id."'  ORDER BY nama ASC";
				$sql =	"SELECT id, nama, tag FROM equip where unit_id=$parent_id  ORDER BY nama ASC";
				$query = $this->db->query($sql, array($parent_id));
				//echo "sql: $sql<br/>";
				if ($query->num_rows() > 0)	{
					foreach ($query->result() as $row)	{
						//print_r($row); echo "<br/>";
						$arr[$k]['leaf'] = 'true';
						$arr[$k]['id'] = $row->id;
						$arr[$k]['text'] = '['.$row->tag.'] '.$row->nama;
						$arr[$k]['tipe'] = 'e';
						$k++;
					}
				}
			}
			//print_r($arr);

			$jsonResult = array(
				'success' => true,
				'hirarki' => $arr
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
