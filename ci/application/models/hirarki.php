<?php

class Hirarki extends CI_Model {
	function __construct()	{
        parent::__construct();
    }

	/*function c_hirarki($lvl)    {
		$this->db->select('id,flag');
		$this->db->where('level',$lvl);
		$query = $this->db->get('hirarki');
		return $query->result();
		
	}*/

	function get_unit_group($gr)    {

		$sql =	"select h.id,h.nama,equip.nama as unit,h.init as init ".
				 ",(select hhh.kode from hirarki hhh where hhh.id = (select hh.parent from hirarki hh where h.parent = hh.id)) as hlok ".
				 ",(select hhh.nama from hirarki hhh where hhh.id = (select hh.parent from hirarki hh where h.parent = hh.id)) as lok ".
				 ",(select hhh.urut from hirarki hhh where hhh.id = (select hh.parent from hirarki hh where h.parent = hh.id)) as urut ".
				 "FROM hirarki h ".
				 "LEFT JOIN equip ON h.id = equip.unit_id and equip.kode like (select kode from cat_equip where id=$gr) ".
				 "where h.level = 3 and h.flag = $gr ".
				 "order by urut,nama asc";
		//echo "sql: $sql";
		
		$query = $this->db->query($sql);
		
		return $query->result();
    }
	
	function get_parent() {
		//*
		$this->db->select('id,nama,kode');
		//$this->db->where('level',1);
		$this->db->where('parent',0);
		$this->db->order_by('nama','asc');
		$query = $this->db->get('hirarki');
		return $query->result();
		//*/
		/*
		$sql = "select id,nama,kode from hirarki where parent=0 order by nama asc";
		$query = $this->db->query($sql);
		return $query->result();
		//*/
	}
	
	function get_parent_all(){
		$sql =	"SELECT 0 AS id, 'ALL' AS nama, 'ALL' AS kode UNION ".
				"(SELECT id, nama, kode FROM hirarki WHERE parent=0 ORDER BY nama ASC)";
		//echo "sql: $sql<br/>";
		$query = $this->db->query($sql);
		return $query->result();
	
	}
	
	function get_unit(){
		$sql = "select h3.id as id_unit, h1.nama as lokasi, h1.id as id_lokasi, h3.nama as unit 
				from hirarki h1
					inner join hirarki h2 on h1.id = h2.parent
					inner join hirarki h3 on h2.id = h3.parent;";
		$query = $this->db->query($sql);
		return $query->result();
	
	}
	
	function get_flag($unit){
		$this->db->select('flag');
		$this->db->where('id', $unit);
		$query = $this->db->get('hirarki');
		
		return $query->result();
	}
	
	function get_hirarki_all()	{
		/*
		$this->db->select('id,nama,parent');
		$this->db->order_by('parent','ASC');
		$this->db->order_by('urut','ASC');
		$query = $this->db->get('hirarki');
		
		return $query->result();
		//*/
		
		$sql = "SELECT id,nama,parent FROM hirarki ORDER BY urut ASC,nama ASC";
		
		$hsl = array(); $i=0;
		if ($q = mysqli_multi_query($this->db->conn_id,$sql))	{
			//echo "masuk sini";
			//print_r($q);
			do {
				if ($result=mysqli_store_result($this->db->conn_id))	{
					while ($row=mysqli_fetch_row($result))	{
						$hsl[$i]['id'] = $row[0];
						$hsl[$i]['nama'] = $row[1];
						$hsl[$i]['parent'] = $row[2];
						$i++;
					}
					mysqli_free_result($result);
				}
			}
			while (mysqli_next_result($this->db->conn_id));
		}
		//
		else {
			echo "DB Error, could not query the database\n";
		}
		//print_r($hsl);
		return $hsl;
	}
	
	function get_hirarki($parent){
		//*
		$sql =	"SELECT h.id,h.nama,IFNULL(h.kode,'') AS kode,h.parent,h.rhinit, IFNULL(h.urut,'') AS urut, 
				IFNULL(h.funcloc,'') AS funcloc,h.flag,IFNULL(GROUP_CONCAT(eq.id),'') AS eqid, 
				CASE WHEN eq.id>0 THEN 'u' ELSE 'h' END AS sil,
				CASE WHEN hh.id>0 THEN 'false' WHEN eq.id<>'' THEN 'false' ELSE 'true' END AS leaf
				FROM hirarki h LEFT JOIN equip eq ON eq.unit_id = h.id 
				LEFT JOIN hirarki hh  ON hh.parent = h.id 
				WHERE h.parent = $parent GROUP BY h.id
				ORDER BY urut ASC, nama ASC";
		
		//echo "sql: $sql<br/>";
		$query = $this->db->query($sql);
		return $query;
		//*/
		//$this->db->select('id, nama, level');
		//$this->db->where ('parent',$parent);
		//$this->db->order_by('nama', 'asc'); 
		//$query = $this->db->get('hirarki');
		
		//return $query;
	}
	
	function get_hirarki_equip($parent){
		/*
		$sql = "SELECT eq.id,eq.nama,eq.tag,ce.nama AS cat
				FROM equip  eq
				LEFT JOIN cat_equip ce ON ce.id = eq.cat
				WHERE unit_id = $parent
				ORDER BY nama ASC";
		//*/
		$sql =	"SELECT eq.id,CONCAT('[',eq.tag,'] ',eq.nama) AS nama,
				eq.tag,eq.unit_id AS parent, ce.id AS idcat,ce.nama AS cat,eq.kode,IFNULL(eq.rhinit,0) AS rhinit,
				'e' AS sil, 'true' AS leaf
				FROM equip  eq
					LEFT JOIN cat_equip ce ON ce.id = eq.cat
				WHERE unit_id = $parent
				ORDER BY nama ASC";
		//echo "sql: $sql<br/>";
		$query = $this->db->query($sql);
		return $query;
		/*
		$this->db->select('id, nama, tag');
		$this->db->where('unit_id',$parent);
		$this->db->order_by('nama','asc');
		$query = $this->db->get('equip');
		
		return $query;
		//*/
	}
	
	function create_hirarki_new(){
		$hir = json_decode(file_get_contents('php://input'));
		$sql = array(
					'nama' 		=> $hir->nama,
					'parent' 	=> $hir->parentId,
					'level'		=> $hir->level +1,
					
				);
		// $this->db->where('id',$ohin->id);
		$this->db->insert('hirarki', $sql);
	
	
	}

	function upd_hirarki($data,$id)	{
		$this->db->set($data);
		$this->db->where('id', $id);
		return $this->db->update('hirarki');
	}
	
	function ins_hirarki($data)	{
		$this->db->trans_start();
		$this->db->insert('hirarki', $data); 
		$insert_id = $this->db->insert_id();
		$this->db->trans_complete();
		return  $insert_id;
		/*
		$this->db->set($data);
		return $this->db->insert('hirarki');
		//*/
	}

	function del_hirarki($ids)	{
		$this->db->where_in('id', $ids);
		$this->db->delete('hirarki');
		
		return $ids;
	}
	
	function set_rhtot($eq)	{
		$sql =	"UPDATE hirarki SET rhtot =
					((SELECT sum(rx.rh) FROM rh_201311 rx		
						WHERE eq=$eq)+rhinit)
				WHERE id=$eq";
		$query = $this->db->query($sql);
		return $query;
	}
	
	function get_excelgrid_hir($cat,$pm)	{
		$sql =	"SELECT h3.id,h3.nama,h1.nama AS lok,h3.rhtot,eq.cat,eq.kode
				,(SELECT GROUP_CONCAT('[',eq1.kode,' ',pd1.nama,' ',wd1.downt,']')
					FROM waktudown wd1 
					LEFT JOIN pmlist pl1 ON pl1.id = wd1.tipeev
					LEFT JOIN pmdef pd1 ON pd1.id = pl1.pm
					LEFT JOIN equip eq1 ON eq1.id = wd1.eqid
					WHERE wd1.downt = MAX(wd.downt) AND wd1.event=2
						AND wd1.tipeev>0 AND wd1.eqid=eq.id
				) AS lpm
				FROM hirarki h1
				LEFT JOIN hirarki h2 ON h2.parent = h1.id
				LEFT JOIN hirarki h3 ON h3.parent = h2.id
				LEFT JOIN equip eq ON eq.unit_id = h3.id
				LEFT JOIN waktudown wd ON eq.id = wd.eqid AND wd.event=2 AND wd.tipeev >0
				WHERE h1.parent=0 AND h3.flag=?
				GROUP BY h3.id,eq.id
				ORDER BY h1.urut ASC, h3.nama ASC";
		
		$query = $this->db->query($sql,$cat);
		
		//echo $query->num_rows();
		$hsl = array(); $obj = new stdClass();
		//if (count($d)>0)	{
		if ($query->num_rows()>0)	{
			$id = 0; $k=0;
			$d = $query->result();
			foreach($d as $r)	{
				//print_r($r); echo "<br/>";
				//echo "=--->"; print_r(nextpm($r->rhtot,$pm[$r->cat]));	echo "<br/>";
				$npm = nextpm($r->rhtot,$pm[$r->cat]);
				if ($id != $r->id)	{
					$id = $r->id;
					//$hsl[$k]
					if (isset($obj->id))
						array_push($hsl, $obj);
					$obj = new stdClass();
					$obj->id = $r->id;
					$obj->nama = $r->nama;
					$obj->lok = $r->lok;
					$obj->rhtot = $r->rhtot;
					$obj->lpm = $r->lpm;
					$obj->npm = "[{$r->kode} PM{$npm->npm} {$npm->tgl}, {$npm->hari} hari lagi]";
				}
				else {
					$obj->lpm .= " ".$r->lpm;
					$obj->npm .= " [{$r->kode} PM{$npm->npm} {$npm->tgl}, {$npm->hari} hari lagi]";
				}
				
			}
			array_push($hsl, $obj);
		}
		/*
		//echo count($hsl)."<br/>";
		foreach	($hsl as $h)	{
			print_r($h);	echo "<br/>";
		}
		//print_r($query->result());
		//if ($query->num_rows)
		//echo $query->num_rows();
		//*/
		return $hsl;
	}

}

/* End of file hirarki.php */
/* Location: ./application/models/hirarki.php */
