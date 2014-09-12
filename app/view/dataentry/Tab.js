/* AfrendyBayu, 14Nov2013 */
Ext.define('rcm.view.dataentry.Tab', {
	extend: 'Ext.tab.Panel',

    xtype: 'tabRh',
    requires: [
		'rcm.view.dataentry.HitungRelia'
		,'rcm.view.dataentry.ExcelGrid'
    ],
    
	initComponent: function() {
		var me=this;
		me.items = [{
				title: 'Data Running Hour',
				xtype: 'excelgrid',
				id: 'app-runninghour',
				iconCls: 'icon-grid'
			},{
				align: 'stretch',
				title: 'Daftar DownTime Unit',
				iconCls : 'icon-downtime',
				//icon: 'modul/icons/grid.png',
				layout: {
					type: 'border'
				},
				items: [{
						xtype: 'daftarGagal',
						region: 'center',
						id: 'app-gagal',
						flex: 1
					},{
						id: 'bgDetail',
						collapsible: true,
						collapsed: true,
						split: true,
						minHeight: 220,
						maxHeight: 400,
						height: 220,
						region: 'south',
						title: 'Info Detail DownTime',
						iconCls: 'more',
						xtype: 'detailInfo'
				}]
			},{
				title: 'Reliability',
				xtype: 'tDaftarRelia',
				//id: 'app-relia',
				itemId: 'relia',
				hidden: true,
				iconCls: 'up'
		}];

		me.callParent(arguments);
		this.on('tabchange', me.handleSapTab, this);
	},
	handleSapTab: function()	{
		rcmSettings.tsp = this.getActiveTab().getId();
	},
	
	showRelia: function()	{
		var t = this.child('#relia');
		console.log('sampe sini showRelia');
		t.tab.show();
		this.setActiveTab(t);
	}
});
