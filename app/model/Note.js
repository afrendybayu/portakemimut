/* Afrendy Bayu, 20Mei2014 */
Ext.define('rcm.model.Note', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: [ 'ket' ]
	
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
