/* AfrendyBayu, 13Nov2013 */
Ext.define('rcm.model.DaftarGagal', {
    extend: 'Ext.data.Model',
    requires:[
		'Ext.data.proxy.Ajax'
    ],
    
    fields: [ 'edit','id','eqid','lok','nama','cat',
		//'downt','downj','startt','startj','endt','endj','upt','upj',
		{ name:'downt',dateFormat:'d-m-Y' },{ name:'downj'},
		{ name:'startt',dateFormat:'d-m-Y' },{ name:'startj'},
		{ name:'endt',dateFormat:'d-m-Y' },{ name:'endj'},
		{ name:'upt',dateFormat:'d-m-Y' },{ name:'upj'},
		'event','idevent','tipeev','ket','exe','fm','server' ]
		//type:'date',
	//*
    ,proxy: {
        type: 'ajax',
        api: {
            
            //create: 'php/gagal/create.php',
            read: 'ci/index.php/rDaftarG'
            //update: 'php/gagal/update.php',
            //destroy: 'php/gagal/delete.php'
        },
        reader: {
            type: 'json',
            root: 'gagal',
            messageProperty: 'message'
        }
    }
	//*/
});