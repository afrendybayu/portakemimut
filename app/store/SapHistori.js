/* AfrendyBayu 2Jul2014 */
Ext.define('rcm.store.SapHistori', {
    extend: 'Ext.data.Store',
    model: 'rcm.model.SapHistori',
    //autoLoad: true,
    requires: 'rcm.model.SapHistori'
    
    /*
    ,proxy: {
		type: 'ajax',
		url: 'ci/index.php/sap/rHistori/getHistori',
        reader: {
            type: 'json',
            root: 'saphistori',
            messageProperty: 'message'
        }
    }
    //*/
});
