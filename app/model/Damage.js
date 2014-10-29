/* Afrendy Bayu, 3Des2013 */
Ext.define('rcm.model.Damage', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	// fields: [ 'kode','nama', 'id','cat',"ket" ],
	fields: ['id' ,
				{name : 'nama', type : 'string'},
				{name : 'kode', type : 'string'}/*,
				{name : 'obama', type : 'int'},
				{name : 'sap', type : 'int'},
				{name : 'ket', type : 'string'}*/],
    proxy: {
		type: 'ajax',
		api: {
			read	: 'ci/index.php/konfig/Conf/rDamage',
			destroy : 'ci/index.php/konfig/Conf/dDamage',
			create	: 'ci/index.php/konfig/Conf/cDamage',
			update	: 'ci/index.php/konfig/Conf/uDamage'
        },
        reader: {
            type: 'json',
            root: 'damage',
            messageProperty: 'message'
        }
    }
});



