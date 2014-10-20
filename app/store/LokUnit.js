/* Jono, 6Okt2014 */
Ext.define('rcm.store.LokUnit', {
    extend: 'Ext.data.TreeStore',
    model: 'rcm.model.LokUnit',
    requires: 'rcm.model.LokUnit',
   
	// autoLoad: true,
	//*
	root: {
        expanded: true,
        id: '0',
        nama: 'South Sumatera Block'

    }
	//*/
});

