/* AfrendyBayu 23Okt2014 */
Ext.define('rcm.model.GridModeIn', {
    extend: 'Ext.data.Model',
    requires:[
		'Ext.data.proxy.Ajax'
	],
	
	fields: [ 'id','kode','nama','eqcat', 'list' ],
    
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/rh/rMode/rModeList',
			create: 'ci/index.php/rh/rMode/cModeList',
			destroy: 'ci/index.php/rh/rMode/dModeList'
        },
        reader: {
            type: 'json',
            root: 'mlist',
            messageProperty: 'message'
        }
    }
	
	
});
