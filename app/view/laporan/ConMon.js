// afrendyBayu,26Jan2014 //
Ext.define('rcm.view.laporan.ConMon', {
    xtype: 'tConMon',
	extend: 'Ext.container.Container',

	requires: [
		'rcm.view.laporan.GridConMon'
		,'Ext.toolbar.Spacer'
		,'rcm.view.laporan.ConMonUnit'
		,'rcm.view.laporan.ConMonInput'
		//'rcm.view.laporan.EPOPie'

	],
	border : 0,
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	defaults: {
		flex: 1,
		// hideLabel: true
	},

    items: [{
		xtype: 'container',
		// html : 'isi container',
		layout: {
			type: 'vbox',
			align: 'stretch'
        },//*/
		items:[{
			xtype: 'panel',
			title : 'Condition Monitoring',
			dockedItems:{
				xtype : 'toolbar',
				items : ['->',{
					xtype: 'button',
					iconCls : 'add',
					// margin : '0 0 0 800',
					text : 'Tambah',
					style : 'float:right'
				}]
				
			
			},
			//height: 120,
			flex: 1,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
					xtype: 'tGridConMon',
					// width : 200,
					 flex: 1
				},{
					xtype: 'iConMon',
					flex: 4
				
			}]//*/
		},{
			xtype: 'panel',
			flex: 1,
			title : 'panel2',
			/*layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
					xtype: 'tEPOCol',
					flex: 1,
					jdl: 'Work Order Number'
				},{
					xtype: 'tEPOPie',
					flex: 1
				},{
					xtype: 'tEPOPie',
					flex: 1
			}]*/
		}]//*/
	}]
});
