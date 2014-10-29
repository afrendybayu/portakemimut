/* AfrendyBayu 18Okt2014 */
Ext.define('rcm.model.GridEqnIn', {
    extend: 'Ext.data.Model',
    requires:[
		'Ext.data.proxy.Ajax'
	],
	
	fields: [ 'ket','nama','kode'],
    
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/rh/rEquip/rEqncat',
        },
        reader: {
            type: 'json',
            root: 'eqlist',
            messageProperty: 'message'
        }
    }
	
	
});
