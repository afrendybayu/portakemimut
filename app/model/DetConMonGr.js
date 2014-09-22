/* Afrendy Bayu, 18Jan2014 */
Ext.define('rcm.model.DetConMonGr', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: ['bln', { name:'skr2',type:'int' },
					{ name:'skr1',type:'int' },
					{ name:'skr',type:'int' }, 'mbln'],
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/sap/rConMon/gUnitConMon?tp=5'
        },
        reader: {
            type: 'json',
            root: 'gunit',
            messageProperty: 'message'
        }
    }
});
