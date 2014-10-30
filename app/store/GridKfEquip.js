/* AfrendyBayu 18Okt2014 */
Ext.define('rcm.store.GridKfEquip', {
    extend: 'Ext.data.Store',
    // model: 'rcm.model.GridAksi' ,
	
	autoLoad: true,
	
	proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/konfig/rEquip/rEquipCat?cat=10'
        },
        reader: {
            type: 'json',
            root: 'equip',
            messageProperty: 'message'
        }
    }
	
	
});
