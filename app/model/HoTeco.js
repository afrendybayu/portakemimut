/* AfrendyBayu 15Feb2014 */
Ext.define('rcm.model.HoTeco', {
    extend: 'Ext.data.Model',
    requires:[
		'Ext.data.proxy.Ajax'
    ],
    fields: [ 'nama',
				{ name:'teco',type:'float' }],

    proxy: {
		type: 'ajax',
		api: {
			//read: 'php/utama/rTeco.php'
			read: 'ci/index.php/sap/rTeco/sapPersenTeco'
        },
		reader: {
            type: 'json',
            root: 'hoteco',
            messageProperty: 'message'
        }
    }
});
