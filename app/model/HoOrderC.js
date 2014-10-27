/* Afrendy Bayu, 15Feb2014 */
Ext.define('rcm.model.HoOrderC', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: ['otipe','desc',
			  'plstcost','plincost','tplcost',
			  'acstcost','acincost','srvcost','taccost',
			  { name:'budget',type:'float' },{ name:'persen',type:'float' }],
    proxy: {
		type: 'ajax',
		api: {
			//read: 'ci/index.php/home/rOrderCost/sapOCost'
			read: 'ci/index.php/sap/rOrderCost/sapOCostWo'
        },
        reader: {
            type: 'json',
            root: 'orderc',
            messageProperty: 'message'
        }
    }
});
