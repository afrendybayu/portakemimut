/* Jono, Nov17 2014 */
Ext.define('rcm.model.User', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	// fields: ['id', 'akses' ,'nama' ,'userid','pass', 'active' ,'ket' ],
	fields: ['id' ,
				{name : 'nama', type : 'string'},
				{name : 'active', type : 'int'},
			'akses' ,'userid','pass','ket' ],


    proxy: {
		type: 'ajax',
		api: {
			read	: 'ci/index.php/konfig/Conf/rUser',
			destroy : 'ci/index.php/konfig/Conf/dUser',
			create	: 'ci/index.php/konfig/Conf/cUser',
			//update	: 'ci/index.php/konfig/Conf/uCause'*/
        },
        reader: {
            type: 'json',
            root: 'userlist',
            messageProperty: 'message'
        }
    }
});



