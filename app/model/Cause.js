/* Afrendy Bayu, 3Des2013 */
Ext.define('rcm.model.Cause', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	// fields: [ 'kode','nama', 'id','cat',"ket" ],
	fields: ['id' ,
				{name : 'nama', type : 'string'},
				{name : 'kode', type : 'string'},
				{name : 'obama', type : 'int'},
				{name : 'sap', type : 'int'},
				{name : 'ket', type : 'string'}],
    proxy: {
		type: 'ajax',
		api: {
			read	: 'ci/index.php/rh/rCause',
			destroy : 'ci/index.php/konfig/Conf/dCause',
			create	: 'ci/index.php/konfig/Conf/cCause',
			update	: 'ci/index.php/konfig/Conf/uCause'
        },
        reader: {
            type: 'json',
            root: 'cause',
            messageProperty: 'message'
        }
    }
});



