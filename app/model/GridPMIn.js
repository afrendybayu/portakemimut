/* AfrendyBayu 4Des2013 */
Ext.define('rcm.model.GridPMIn', {
    extend: 'Ext.data.Model',
    requires:[
		'Ext.data.proxy.Ajax'
	],
	
	fields: [ 'id','kode','nama','eqcat', 'pm' ],
    
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/rh/rPM/rPMdefcat?',
			create: 'ci/index.php/rh/rPM/cPMList',
			destroy:  'ci/index.php/rh/rPM/dPMList',
        },
        reader: {
            type: 'json',
            root: 'pmlist',
            messageProperty: 'message'
        }
    }
	
	
});
