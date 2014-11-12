/* AfrendyBayu 18Okt2014 */
Ext.define('rcm.model.GridOPIn', {
    extend: 'Ext.data.Model',
    requires:[
		'Ext.data.proxy.Ajax'
	],
	
	fields: [ 'id','kode','nama','eqcat', 'list' ],
    
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/rh/rOPart/rOPartList',
			create: 'ci/index.php/rh/rOPart/cOPList',
			destroy: 'ci/index.php/rh/rOPart/dOPList'
        },
        reader: {
            type: 'json',
            root: 'oplist',
            messageProperty: 'message'
        }
    }
	
	
});
