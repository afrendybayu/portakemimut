/* Afrendy Bayu, 1Des2013 */
Ext.define('rcm.model.Contract', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: [ 'tipe','nama',
				{ name:'b1', type:'float' },
				{ name:'b2', type:'float' },
				{ name:'b3', type:'float' },
				{ name:'b4', type:'float' },
				{ name:'b5', type:'float' },
				{ name:'b6', type:'float' },
				{ name:'b7', type:'float' },
				{ name:'b8', type:'float' },
				{ name:'b9', type:'float' },
				{ name:'b10',type:'float' },
				{ name:'b11',type:'float' },
				{ name:'b12',type:'float' },
				{ name:'tot',type:'float' }],
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/sap/rContract/sapContract'
        },
        reader: {
            type: 'json',
            root: 'contract',
            messageProperty: 'message'
        }
    }
});
