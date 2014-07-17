/* AfrendyBayu 4Des2013 */
Ext.define('rcm.store.EventInfo', {
    extend: 'Ext.data.Store',
    model: 'rcm.model.Event',
    requires: 'rcm.model.Event',
    //autoLoad: true,

    proxy: {
		type: 'ajax',
		//url: 'php/gagal/detailfmea.php',
		url: 'ci/index.php/rh/rDetailFMEA',
        reader: {
            type: 'json',
            root: 'detail',
            messageProperty: 'message'
        }
    }
});
