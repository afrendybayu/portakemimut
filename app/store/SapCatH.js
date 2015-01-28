/* AfrendyBayu 28Jan2015 */
Ext.define('rcm.store.SapCatH', {
    extend: 'Ext.data.Store',
    model: 'rcm.model.SapTipe',
    //autoLoad: true,
    requires: 'rcm.model.SapTipe'

	,proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/konfig/rCatEquip/rCatHir0'
        },
        reader: {
            type: 'json',
            root: 'cateq',
            messageProperty: 'message'
        }
    }
});
