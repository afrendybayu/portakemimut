/* AfrendyBayu 13Nov2013 */
Ext.define('rcm.store.DaftarRelia', {
    extend: 'Ext.data.Store',
    model: 'rcm.model.DaftarGagal',
    requires: 'rcm.model.DaftarGagal',
    
	autoLoad: true,
	proxy: {
		type: 'ajax',
		url: 'ci/index.php/rh/rDaftarG/relia',
        reader: {
            type: 'json',
            root: 'gagal',
            messageProperty: 'message'
        }
    }
});

