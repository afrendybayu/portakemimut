/* AfrendyBayu 18Okt2014 */
Ext.define('rcm.model.GridEqcIn', {
    extend: 'Ext.data.Model',
    requires:[
		'Ext.data.proxy.Ajax'
	],
	
	fields: [ 'id','kode','nama','lok', 'list' ],
    
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/rh/rEquip/rEqcat',
			create: 'ci/index.php/rh/rOPart/cOPList',
			destroy: 'ci/index.php/rh/rOPart/dOPList',
        },
        reader: {
            type: 'json',
            root: 'eqlist',
            messageProperty: 'message'
        }
    }
	
	
});
