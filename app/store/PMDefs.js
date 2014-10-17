/* AfrendyBayu 4Des2013 */
Ext.define('rcm.store.PMDefs', {
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
			read: 'ci/index.php/rh/rPM/rPMdef'
        },
        reader: {
            type: 'json',
            root: 'pmdef',
            messageProperty: 'message'
        }
    }
	
	
});
