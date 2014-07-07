/* Afrendy Bayu, 1Des2013 */
Ext.define('rcm.model.Equip', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: [ 'nama','cat','idt' ],
    proxy: {
		type: 'ajax',
		api: {
			read: 'php/equip/read.php'
        },
        reader: {
            type: 'json',
            root: 'equip',
            messageProperty: 'message'
        }
    }
});
