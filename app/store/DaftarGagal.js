/* AfrendyBayu 13Nov2013 */
new Ext.define('rcm.store.DaftarGagal', {
    extend: 'Ext.data.Store',
    model: 'rcm.model.DaftarGagal',
    requires: 'rcm.model.DaftarGagal',
    
	autoLoad: true,
	autoSync: true
});

