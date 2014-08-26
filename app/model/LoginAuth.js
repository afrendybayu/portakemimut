Ext.define('rcm.model.LoginAuth', {
    extend: 'Ext.data.Model',
    fields: ['userid','pass', 'level' , 'session'],
	
	// autoLoad: true,
	// autoSync : true,
	
	proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/AuthLogin/isLoggin',
			create : 'ci/index.php/AuthLogin/isLoggin',
			update : 'ci/index.php/AuthLogin/isLoggin'
			//destroy: '/some/url/to/delete/records/in/db' //*/
        },
		reader: {
            type: 'json',
            root: 'rule',
            messageProperty: 'message'
        }
    }
	
});