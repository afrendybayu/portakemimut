/* AfrendyBayu 4Des2013 */
Ext.define('rcm.store.EventList', {
    extend: 'Ext.data.Store',
    model: 'rcm.model.EventList',
    requires: 'rcm.model.EventList',
    autoLoad: true
    /*
	proxy: {
		type: 'ajax',
		url: 'ci/index.php/rEventList',
        reader: {
            type: 'json',
            root: 'event',
            messageProperty: 'message'
        }
    }
    //*/
});
