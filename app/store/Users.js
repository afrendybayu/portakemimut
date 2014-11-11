/* AfrendyBayu 4Des2013 */
Ext.define('rcm.store.Users', {
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
			read: 'ci/index.php/konfig/rUser'
        },
        reader: {
            type: 'json',
            root: 'userlist',
            messageProperty: 'message'
        }
    }
	
	
});
