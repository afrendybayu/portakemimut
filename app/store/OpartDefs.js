/* AfrendyBayu 4Des2013 */
Ext.define('rcm.store.OPartDefs', {
    extend: 'Ext.data.Store',
    model: 'rcm.model.OPartDef' ,
    // requires:[
		// 'Ext.data.proxy.Ajax'
		// ,'rcm.model.Aksi'
	// ],
	
	
	
	autoLoad: true,
	
	/*proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/rh/rOPart/rOpartDef'
        },
        reader: {
            type: 'json',
            root: 'opartdef',
            messageProperty: 'message'
        }
    }*/
	
	
});
