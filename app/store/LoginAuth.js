Ext.define('rcm.store.LoginAuth', {
    extend: 'Ext.data.Store',
	model : 'rcm.model.LoginAuth',
		
	//autoLoad: true,
	
	proxy: {
		type: 'ajax',
		api: {
			read: '/ci/index.php/AuthLogin/isLoggin'
			/*create: '/some/url/to/insert/records/in/db',
            read: '/some/url/to/select/records/from/db',
            update: '/some/url/to/update/records/in/db',
            destroy: '/some/url/to/delete/records/in/db' //*/
        },
		reader: {
            type: 'json',
            root: 'logged',
            messageProperty: 'message'
        }
    }
	
	
});