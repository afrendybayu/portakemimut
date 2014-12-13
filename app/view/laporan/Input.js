Ext.define('rcm.view.laporan.Input', {
    extend: 'Ext.tab.Panel',
    xtype: 'sapinput',
	
	requires: [
		'Ext.panel.Panel'
		,'rcm.view.laporan.ManOCost'
		,'rcm.view.laporan.Jabatan'
	],

    layout: {
        type: 'card',
        deferredRender: true
    },
	//plain: true,
    //
    
    initComponent: function() {
		var me=this;
		me.items = [{
			id: 'in_sap',
			title: 'Upload BPM3/SAP Data',
			//iconCls: 'Dashboard',
			xtype: 'tUploadfile',
			margin: '5 5'
		},{
			id: 'in_ocst',
			title: 'Order Cost',
			//iconCls: 'Reliability',
			xtype: 'tManOCost',
			margin: '5 5'
		},{
			id: 'in_jabR',
			title: 'Nama dan Jabatan',
			//iconCls: 'Reliability',
			xtype: 'tJabat',
			margin: '5 5'	
			
			
		}];
		
		me.callParent(arguments);
		me.addEvents(

        );
        this.on('tabchange', me.handleContentTab, this);
	},
	
	handleContentTab: function()	{
		var tt = this.getActiveTab().getId();
		//rcmSettings.tab = tt;
		if (tt.localeCompare("tu_re")==0)	{
			this.fireEvent('updateAvRe');
		}
		else if (tt.localeCompare("tu_ho")==0)	{
			this.fireEvent('updateHome');
		}
	},
	
	
})
