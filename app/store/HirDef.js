/* AfrendyBayu, 2Nov2014 */
Ext.define('rcm.store.HirDef', {
    extend: 'Ext.data.TreeStore',
    model: 'rcm.model.HirDef',
    autoLoad: true,
    requires: 'rcm.model.HirDef',
    
    //*
    root: {
        expanded: false,
        id: '0',
		nama: 'South Sumatera Block'

    }
    //*/
});

