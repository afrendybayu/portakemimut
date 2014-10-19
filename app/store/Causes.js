/* AfrendyBayu 4Des2013 */
Ext.define('rcm.store.Causes', {
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
			read: 'ci/index.php/rh/rCause/rCauseDef'
        },
        reader: {
            type: 'json',
            root: 'cause',
            messageProperty: 'message'
        }
    }
	
	
});
