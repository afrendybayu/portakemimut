/* AfrendyBayu, 2Feb2015 */
Ext.define('rcm.model.POKontrak', {
    extend: 'Ext.data.Model',
    requires:[
		'Ext.data.proxy.Ajax'
    ],
        
	//fields: ['id','nokon','ket','k201503'],
    //*
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/sap/rContract/rPOKontrak',
			
        },
        reader: {
            type: 'json',
            root: 'contract',
            messageProperty: 'message'
        }
    }
    //*/
});
