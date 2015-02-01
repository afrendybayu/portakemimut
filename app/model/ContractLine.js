/* Afrendy Bayu, 1Des2013 */
Ext.define('rcm.model.ContractLine', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],
	//*
	fields: [ 'm','bln',
				{ name:'gen', type:'float' },
				{ name:'pump', type:'float' },
				{ name:'eng', type:'float' },
				{ name:'elm', type:'float' },
				{ name:'comp',type:'float' }],
	//*/
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/sap/rContract/sapGrContract'
        },
        reader: {
            type: 'json',
            root: 'contract',
            messageProperty: 'message'
        }
    }
});
