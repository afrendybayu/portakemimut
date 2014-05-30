/* Afrendy Bayu, 4Des2013 */
Ext.define('rcm.model.Event', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: [ 'iddown','cat','eql','ideql','opart','idopart','mode','idmode','cause','idcause','aksi','idaksi' ]
	
	/*
    proxy: {
		type: 'ajax',
		api: {
			//read: 'php/event/read.php'
			create: 'php/event/create.php'
        },
        reader: {
            type: 'json',
            root: 'equip',
            messageProperty: 'message'
        }
    }
    //*/
});
