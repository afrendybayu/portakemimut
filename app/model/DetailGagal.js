/* AfrendyBayu, 18Mei2014 */
Ext.define('rcm.model.DetailGagal', {
    extend: 'Ext.data.Model',
    requires:[
		'Ext.data.proxy.Ajax'
    ],
        
    fields: ['nama', 'nilai'],
    
    proxy: {
		type: 'ajax',
		api: {
			//read: 'php/gagal/detailgagal.php'
			read: 'ci/index.php/rh/rDetailG'
        },
        reader: {
            type: 'json',
            root: 'gagal',
            messageProperty: 'message'
        }
    }
});
