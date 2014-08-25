/* Afrendy Bayu, 15Feb2014 */
Ext.define('rcm.model.HoOrderC', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: ['otipe','desc',
			  'plstcost','plincost','tplcost',
			  'acstcost','acincost','srvcost','taccost',
			  'budget',{ name:'persen',type:'float' }],
    proxy: {
		type: 'ajax',
		api: {
			read: 'php/utama/rHoOrderC.php'
        },
        reader: {
            type: 'json',
            root: 'hoorderc',
            messageProperty: 'message'
        }
    }
});
