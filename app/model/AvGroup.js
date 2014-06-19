/* AfrendyBayu 11Feb2014 */
Ext.define('rcm.model.AvGroup', {
    extend: 'Ext.data.Model',
    requires:[
		'Ext.data.proxy.Ajax',
    ],
    fields: [ 'nama', 'urut', 'kode',
				{ name:'id',type:'int' },
				{ name:'av',type:'float' },
				{ name:'re',type:'float' }],

    proxy: {
		type: 'ajax',
		api: {
			read: 'php/obafuncloc/rGroupUnit.php'
        },
		reader: {
            type: 'json',
            root: 'avGr',
            messageProperty: 'message'
        }
    }
});
