/* AfrendyBayu, 14Nov2013 */
Ext.define('rcm.view.laporan.UploadFile', {
	xtype: 'uploadfile',
	extend: 'Ext.form.Panel',
	//width:100,
	//height:100,

	initComponent: function() {
		var me=this;
		
		me.items = [{
			xtype: 'filefield',
			name: 'photo',
			fieldLabel: 'Upload SAP File',
			//labelWidth: 200,
			msgTarget: 'side',
			allowBlank: false,
			anchor: '100%',
			buttonText: 'Browse ...'
		}];
		me.callParent(arguments);
	}
});
