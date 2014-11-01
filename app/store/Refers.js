/* AfrendyBayu 4Des2013 */
Ext.define('rcm.store.Refers', {
    extend: 'Ext.data.Store',
    model: 'rcm.model.GridAksi' ,
    // requires:[
		// 'Ext.data.proxy.Ajax'
		// ,'rcm.model.Aksi'
	// ],
	
	
	
	//autoLoad: true,
	
	proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/rh/rFMode/rRefer'
        },
        reader: {
            type: 'json',
            root: 'refer',
            messageProperty: 'message'
        }
    }
	
	
});
