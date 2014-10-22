/* AfrendyBayu 4Des2013 */
Ext.define('rcm.store.Damages', {
    extend: 'Ext.data.Store',
    model: 'rcm.model.GridAksi' ,
    // requires:[
		// 'Ext.data.proxy.Ajax'
		// ,'rcm.model.Aksi'
	// ],
	
	
	
	autoLoad: true,
	
	proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/rh/rDamage/readDamage'
        },
        reader: {
            type: 'json',
            root: 'damage',
            messageProperty: 'message'
        }
    }
	
	
});
