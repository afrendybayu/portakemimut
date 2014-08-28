/* AfrendyBayu 13Nov2013 */
Ext.define('rcm.store.DaftarGagal', {
    extend: 'Ext.data.Store',
    model: 'rcm.model.DaftarGagal',
    requires: 'rcm.model.DaftarGagal',
    
	autoLoad: true
	//,autoSync: true
	/*
	,proxy: {
        type: 'ajax',
        api: {
            create: 'php/gagal/create.php',
            read: 'php/gagal/read.php',
            update: 'php/gagal/update.php',
            destroy: 'php/gagal/delete.php'
        },
        reader: {
            type: 'json',
            root: 'gagal',
            messageProperty: 'message'
        }
    }
	//autoSync: true
	//*/
});

