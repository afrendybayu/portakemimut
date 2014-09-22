Ext.define('rcm.model.LoginAuth', {
    extend: 'Ext.data.Model',
    fields: ['userid','pass'],
	
	proxy: {
		type: 'ajax',
		api: {
			create : 'ci/index.php/login/AuthLogin/isLoggin'
		},
		reader: {
            type: 'json',
            root: 'rule',
            messageProperty: 'message'
        }
    }
	
});