Ext.define('rcm.view.Content', {
    extend: 'Ext.tab.Panel',
    xtype: 'content',
	
	requires: [
		'Ext.panel.Panel'
		
		,'rcm.view.lapobama.AvReChart' //--
		,'rcm.view.laporan.Chart'
		,'rcm.view.utama.HoChart'
		//,'rcm.view.laporan.Tab'
		,'rcm.view.konfig.TabKonfig'
		,'rcm.view.dataentry.Tab'
		
		
		//,'rcm.view.login.LoginAuth'
	],

    layout: {
        type: 'card',
        deferredRender: true
    },
	plain: true,
    autoScroll: true,
    activeTab: rcmSettings.tab,
    
    initComponent: function() {
		var me=this;
		me.items = [{
		//*==========================
			id: 'tu_ho',
			title: 'Dashboard Home',
			iconCls: 'Dashboard',
			xtype: 'tHoChart'
		//*
		},{
		//*/
			id: 'tu_re',
			title: 'Reliability',
			iconCls: 'Reliability',
			xtype: 'tAvReChart'
		//*
		},{
			id: 'tu_sap',
			title: 'SAP Report',
			xtype: 'tabChart',
			iconCls: 'sap'
		},{
		
			id: 'tu_rh',
			title: 'Runnning Hour',
			iconCls: 'RunnningHour',
			//layout: 'accordion',
			xtype: 'tabRh'

		},{
			id: 'tu_co',
			title: 'Condition Monitoring',
			iconCls: 'connect',
			xtype:'tConMon'
		},{
		
			id		: 'tu_kf',
			title	: 'Konfigurasi',
			iconCls	: 'Konfigurasi',
			xtype 	: 't_Konfig'
			//disabled : true
			// hidden: true
		//*/
		
		}];
		
		me.callParent(arguments);
		me.addEvents(
            /**
             * @event edit
             * Fires when a record is edited using the CellEditing plugin or the statuscolumn
             * @param {SimpleTasks.model.Task} task     The task record that was edited
             */
			'updateAvRe'
			,'updateHome'
        );
        this.on('tabchange', me.handleContentTab, this);
	},
	
	handleContentTab: function()	{
		var tt = this.getActiveTab().getId();
		rcmSettings.tab = tt;
		//alert(this.getAuthlogin().level);
		if (tt.localeCompare("tu_re")==0)	{
			//alert("masuk Reliability");
			this.fireEvent('updateAvRe');
		}
		else if (tt.localeCompare("tu_ho")==0)	{
			//alert("masuk update Home");
			this.fireEvent('updateHome');
		}
	},
	
	TambahClick: function()	{
		//console.log("tambah: ");
		rcmSettings.sas = this.getEl();//.getActiveTab();
		//console.log("tab: "+rcmSettings.sas);
	},
	
	KurangClick: function()	{
		//console.log("Kurang: ");
	}
})
