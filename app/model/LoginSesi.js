Ext.define('rcm.model.LoginSesi', {
    extend: 'Ext.data.Model',
    fields: ['nama','akses'],//,'level' , 'session'],
	
	proxy: {
		type: 'ajax',
		api: {
			read : 'ci/index.php/login/AuthLogin/isSession'
		},
		reader: {
            type: 'json',
            root: 'sesi',
            messageProperty: 'message'
        }
    }
	
});