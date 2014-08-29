Ext.define('rcm.model.UnsetSesi', {
    extend: 'Ext.data.Model',
    
	proxy: {
		type: 'ajax',
		api: {
			read : 'ci/index.php/login/AuthLogin/isUnset'
		},
		reader: {
            type: 'json',
            root: 'unset',
            messageProperty: 'message'
        }
    }
	
});