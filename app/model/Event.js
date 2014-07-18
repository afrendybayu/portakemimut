/* Afrendy Bayu, 4Des2013 */
Ext.define('rcm.model.Event', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: [ 'iddown','cat','eql','ideql','opart','idopart','mode','idmode','cause','idcause','aksi','idaksi' ],
	
    proxy: {
		type: 'ajax',
		api: {
			create: 'ci/index.php/rh/cEvent',
			update: 'ci/index.php/rh/uEvent',
			read: 'ci/index.php/rh/rEvent',
			destroy: 'ci/index.php/rh/dEvent'
        },
        reader: {
            type: 'json',
            root: 'event',
            messageProperty: 'message'
        }
    }
});
