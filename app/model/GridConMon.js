/* Afrendy Bayu, 1Des2013 */
Ext.define('rcm.model.GridConMon', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: [ 'tipe','nama',
				{ name:'b1', type:'int' },
				{ name:'b2', type:'int' },
				{ name:'b3', type:'int' },
				{ name:'b4', type:'int' },
				{ name:'b5', type:'int' },
				{ name:'b6', type:'int' },
				{ name:'b7', type:'int' },
				{ name:'b8', type:'int' },
				{ name:'b9', type:'int' },
				{ name:'b10',type:'int' },
				{ name:'b11',type:'int' },
				{ name:'b12',type:'int' },
				{ name:'tot',type:'int' }],
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/sap/rConMon/rCM',
			update: 'ci/index.php/sap/rConMon/uCM'
        },
        reader: {
            type: 'json',
            root: 'conmon',
            messageProperty: 'message'
        }
    }
});
