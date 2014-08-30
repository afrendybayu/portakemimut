/* AfrendyBayu 2Jul2014 */
Ext.define('rcm.store.SapHistoriUt', {
    extend: 'Ext.data.Store',
    model: 'rcm.model.SapHistori',
    requires: 'rcm.model.SapHistori',
    autoLoad: true
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
