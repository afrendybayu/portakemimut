/* Afrendy Bayu, 3Des2013 */
Ext.define('rcm.model.CbEquip', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],
	
	fields: [ 'id_eq','eq','id_unit','id_oh'],
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/sap/rOverHaul/cbEquip'
        },
        reader: {
            type: 'json',
            root: 'cbequip',
            messageProperty: 'message'
        }
    }
});
