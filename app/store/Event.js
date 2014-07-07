/* AfrendyBayu 4Des2013 */
Ext.define('rcm.store.Event', {
    extend: 'Ext.data.Store',
    model: 'rcm.model.Event',
    requires: 'rcm.model.Event',
    /*
    proxy: {
		type: 'ajax',
		url: 'php/event/create.php',
        reader: {
            type: 'json',
            root: 'greq',
            messageProperty: 'message'
        }
    }
    //*/
});
