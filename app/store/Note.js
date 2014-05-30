/* AfrendyBayu 20Mei2014 */
Ext.define('rcm.store.Note', {
    extend: 'Ext.data.Store',
    model: 'rcm.model.Note',
    requires: 'rcm.model.Note',
    //autoLoad: true,
    
    proxy: {
		type: 'ajax',
		url: 'php/gagal/readnote.php',
        reader: {
            type: 'json',
            root: 'note',
            messageProperty: 'message'
        }
    }
});
