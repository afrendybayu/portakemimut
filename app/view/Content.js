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
		},{
			id: 'tu_re',
			title: 'Reliability',
			iconCls: 'Reliability',
			xtype: 'tAvReChart'

		},{//=============================*/
			id: 'tu_sap',
			title: 'SAP Report',
			xtype: 'tabChart',
			iconCls: 'sap'

		/*
		},{
			id: 'tu_pr',
			iconCls: 'perform',
			title: 'Prestasi Mesin',
		//*/
		},{
			id: 'tu_rh',
			title: 'Runnning Hour',
			iconCls: 'RunnningHour',
			//layout: 'accordion',
			xtype: 'tabRh'
			/*
			xtype: 'tabpanel',
			items: [{
				title: 'Data Running Hour',
				xtype: 'excelgrid',
				id: 'app-runninghour',
				iconCls: 'icon-grid'
			},{
				//layout: 'accordion',
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
			/*
			},{
				id: 'tu_ag',
				title: 'Agenda & Aktivitas',
				icon: 'modul/icons/calender.png',
				
				xtype: 'extensible.calendarpanel',
				//eventStore: Ext.create('Extensible.calendar.data.MemoryEventStore', {
				//	data: Ext.create('Extensible.example.calendar.data.Events')
				//}),
			
			},{
				title: 'Reliability',
				xtype: 'tDaftarRelia',
				//id: 'app-relia',
				itemId: 'relia',
				//hidden: true,
				iconCls: 'up'
			//*/
			//}]
			//*/
		
		},{
		
			id		: 'tu_kf',
			title	: 'Konfigurasi',
			iconCls	: 'Konfigurasi',
			xtype 	: 't_Konfig'
			/*
			layout: {
				type: 'border'
			},
			items: [{
				region: 'west',
				//xtype: 'taskNavK',
				align: 'stretch',
				width: 350,
				minWidth:310,
				split: true
			}, {
				align: 'stretch',
				region: 'center',
				xtype: 'tabpanel',
				items: [{
					title: 'Keterangan Hirarki',
					html: 'Keterangan Hirarki',
					icon: 'modul/icons/application_go.png'
				},{
					title: 'Object Part',
					html: 'Object Part',
					icon: 'modul/icons/application_go.png'
				},{
					title: 'Failure Mode',
					html: 'Failure Mode',
					icon: 'modul/icons/application_go.png'
				}]
			
			==================================*/
			//}]
		
		
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
