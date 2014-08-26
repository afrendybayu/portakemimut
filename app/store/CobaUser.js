Ext.define('rcm.store.CobaUser', {
    extend: 'Ext.data.Store',
	model : 'rcm.model.CobaUser',
		
	autoLoad: true,
	
	proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/Coba',
			create: 'ci/index.php/Coba',
			update : 'ci/index.php/Coba'
			/*create: '/some/url/to/insert/records/in/db',
            read: '/some/url/to/select/records/from/db',
            update: '/some/url/to/update/records/in/db',
            destroy: '/some/url/to/delete/records/in/db' //*/
        },
		reader: {
            type: 'json',
            root: 'user',
            messageProperty: 'message'
        }
    }
	
	
});