/* Afrendy Bayu, 3Des2013 */
Ext.define('rcm.model.OPartDef', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	// fields: [ 'kode','nama', 'id','cat',"ket" ],
	fields: ['id' ,
				{name : 'nama', type : 'string'},
				{name : 'kode', type : 'string'},
				{name : 'obama', type : 'int'},
				{name : 'sap', type : 'int'}],
    proxy: {
		type: 'ajax',
		api: {
			read	: 'ci/index.php/rh/rOPart/rOpartDef',
			destroy : 'ci/index.php/konfig/Conf/dOpartDef',
			create	: 'ci/index.php/konfig/Conf/cOpartDef',
			update	: 'ci/index.php/konfig/Conf/uOpartDef'
        },
        reader: {
            type: 'json',
            root: 'opartdef',
            messageProperty: 'message'
        }
    }
});



