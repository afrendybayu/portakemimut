/* AfrendyBayu 11Feb2014 */
Ext.define('rcm.model.SapEPO', {
    extend: 'Ext.data.Model',
    requires:[
		'Ext.data.proxy.Ajax',
    ],
    fields: [ 'nama','kode','color',
				{ name:'wo',type:'int' },
				{ name:'persen',type:'float' }],

    proxy: {
		type: 'ajax',
		api: {
			//read: 'php/sap/rEPO.php'
			read: 'ci/index.php/sap/rWOjml/nWO'
        },
		reader: {
            type: 'json',
            root: 'sap',
            messageProperty: 'message'
        }
    }
});
