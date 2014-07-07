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
			create: 'php/event/create.php',
			update: 'php/event/update.php',
			read: 'php/event/readEv.php',
			destroy: 'php/event/delete.php'
        },
        reader: {
            type: 'json',
            root: 'event',
            messageProperty: 'message'
        }
    }
});
