/* Afrendy Bayu, 3Des2013 */
Ext.define('rcm.model.UnitList', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: [ 'nama','kode','urut',
			  {name: 'id',type: 'int'} ],
    proxy: {
		type: 'ajax',
		api: {
			read	: 'ci/index.php/konfig/rUnit/rUnitL',
        },
        reader: {
            type: 'json',
            root: 'ulist',
            messageProperty: 'message'
        }
    }
});
