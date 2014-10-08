/* Afrendy Bayu, 4Okt2014 */
Ext.define('rcm.model.ManOCost', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],
	
	fields: [ { name:'thn',type:'int' },
			  { name:'wo',type:'float' },
			  { name:'otype',type:'float' },
			  { name:'budget',type:'float' }],
    proxy: {
		type: 'ajax',
		api: {
			create: 'ci/index.php/sap/rOrderCost/sapManOCost',
			read: 'ci/index.php/sap/rOrderCost/budgOCost'
        },
        reader: {
            type: 'json',
            root: 'input',
            messageProperty: 'message'
        }
    }
});
