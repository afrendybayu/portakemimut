/* AfrendyBayu, 14Nov2013 */
Ext.define('rcm.view.laporan.UploadFile', {
	xtype: 'tUploadfile',
	extend: 'Ext.form.Panel',
	//width:300,
	//height:100,
	
	require: [
		'Ext.form.TextField'
	],

	initComponent: function() {
		var me=this;
		
		me.items = [{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				//combineErrors: true,
				msgTarget : 'side',
				items: [{	
						xtype: 'filefield',
						name: 'bpm3',
						fieldLabel: 'Upload BPM3',
						//labelWidth: 200,
						width: 500,
						msgTarget: 'side',
						layout: 'fit',
						anchor: '100%',
						buttonText: ' Browse '
					},{
						margin: '2 0 0 5',
						id: 'btnUplBpm3',
						xtype: 'button',
						width: 100,
						text: 'Upload BPM3'
				}]
			},{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				//combineErrors: true,
				msgTarget : 'side',
				items: [{	
						xtype: 'filefield',
						name: 'biaya',
						fieldLabel: 'Upload Biaya',
						width: 500,
						msgTarget: 'side',
						layout: 'fit',
						anchor: '100%',
						buttonText: ' Browse '
					},{
						margin: '2 0 0 5',
						id: 'btnUplBiaya',
						xtype: 'button',
						width: 100,
						text: 'Upload Biaya'
				}]
			},{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				msgTarget : 'side',
				items: [{	
						xtype: 'filefield',
						name: 'conmon',
						fieldLabel: 'Upload ConMon',
						width: 500,
						msgTarget: 'side',
						layout: 'fit',
						anchor: '100%',
						buttonText: ' Browse '
					},{
						margin: '2 0 0 5',
						id: 'btnUplCM',
						xtype: 'button',
						width: 100,
						text: 'Upload ConMon'
				}]
		}];
		me.callParent(arguments);
	}
});
