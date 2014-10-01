/* AfrendyBayu, 12Sep4014 */

Ext.define('rcm.view.laporan.GridOverHaul', {
	extend: 'Ext.grid.Panel',
	//alias: 'widget.daftarGagal',
	xtype: 'tOverHaul',
	//id: 'daftargagal',
	store: 'OhTahun',
	//visible : false,
	requires: [
		'rcm.view.Util'
	],

    loadMask: true,
    columnLines: true,

	initComponent: function() {
		var me=this;	//, ceditp=Ext.create('Ext.grid.plugin.RowEditing');//clicksToEdit: 1
		//me.plugins = [ceditp];
		
		me.columns = { 
			items: rcm.view.Util.UxcolOH()
		};
		me.callParent(arguments);
		me.addEvents(
			//'editDGClick',
			//'hapusDGClick'
        );
        
	}
	
});
