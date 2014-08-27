/* Afrendy Bayu, 15Feb2014 */
Ext.define('rcm.model.HoMan', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: ['nama',
		{ name:'open',type:'int' },
		{ name:'teco',type:'int' },
		{ name:'tot',type:'int' },
		{ name:'woo',type:'float' },
		{ name:'woc',type:'float' }],
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/sap/rTeco/sapTecoMW'
        },
        reader: {
            type: 'json',
            root: 'homan',
            messageProperty: 'message'
        }
    }
});
