/*
Jono, Soka-Medco-28Jan2015
*/

Ext.define('rcm.view.sapu.Sapu', {
    xtype: 'tSapu',
	extend: 'Ext.grid.Panel',
	
	requires: [
		////'Ext.panel.Panel'
		//'Ext.form.Panel'
		//,'rcm.view.laporan.ManOCost'
		//,'rcm.view.laporan.Jabatan'
	],
	 store: 'SapuUnit',
     columnLines: true,
     //checkOnly : true,
        //bbar : {
			//xtype : 'button',
			//text : 'halo'
			
			//},
    
    initComponent: function() {
		var me=this;
		var seltipe = 'checkboxmodel';
		me.selType = seltipe;
		me.columns = {
				items: [
					{text: "Lokasi", flex:1, dataIndex: 'lokasi'},
					{text: "Kategori", flex:1, dataIndex: 'cat'},//renderer: Ext.util.Format.usMoney, dataIndex: 'price'},
					{text: "Unit", flex:1, dataIndex: 'unit'},
					{text: "Start", width: 100, renderer: Ext.util.Format.dateRenderer('d-m-Y'), dataIndex: 'awal'},
					{text: "Update", width: 100, renderer: Ext.util.Format.dateRenderer('d-m-Y'), dataIndex: 'akhir'}]
				};
		me.buttons = {
			items : [{
					//id : 'tblComp',
					text : 'Compressor',
					iconCls: 'Compressor',
					scope: this,
					handler : this.klikComp
				},{
					text : 'Genset',
					scope: this,
					handler : this.klikGenset
				},{
					text : 'Pump',
					scope: this,
					handler : this.klikPump
				},'->',{
					xtype : 'label',
					html : '<span style="font-weight: bold">Lakukan Sapu</span>'
				},{
					id	: 't_awal',
					xtype : 'datefield',
					//fieldLabel :'Mulai',
					//labelWidth: 40,
					format : 'd-m-Y',
					value	: Ext.Date.add (new Date(),Ext.Date.DAY,-1)
				},{
					id	: 't_akhir',
					xtype : 'datefield',
					fieldLabel :'s/d',
					labelWidth: 20,
					format : 'd-m-Y',
					value	: Ext.Date.add (new Date(),Ext.Date.DAY,-1)
				},{ 
					text:'Submit', 
					handler : this.tbLakukan
				},{ 
					text:'Delete' 
				}					
				]};
		//me.dockedItems = {
			//items : [{
				//xtype : 'button',
				//text : 'haloooo'
			//},{
				//xtype : 'button',
				//text : 'eee'
				
				//}
			
			//]
			
			//};	
			
		
		me.callParent(arguments);
		me.addEvents();
        //this.on('tabchange', me.handleContentTab, this);
	},
	
	//tbLakukan : function(){
		//alert('masukkan');
		//var tbSapu = this.getSelectionModel().getSelection();
		//console.log(tbSapu);
		
		////seletionModel = grid.getSelectionModel();
		////var selectedRows = tbSapu.getSelectionModel().getSelection();
		////console.log(selectedRows);
		////selectionchange : function (selModel, selections){
				////console.log (selection);
			////} ;
	//},
	
	klikComp : function(){
		//alert ('tekan conpressor');
		this.fireEvent('clickUnit', 5);
	},
	
	klikGenset : function(){
		//alert ('tekan Genseet');
		this.fireEvent('clickUnit', 7 );
	},
	
	klikPump : function(){
		//alert('tekan Pump');
		this.fireEvent('clickUnit', 6 );
	}
	//handleContentTab: function()	{
		//console.log('berubah...');
	
		////////var tt = this.getActiveTab().getId();
		//////////rcmSettings.tab = tt;
		////////if (tt.localeCompare("tu_re")==0)	{
			////////this.fireEvent('updateAvRe');
		////////}
		////////else if (tt.localeCompare("tu_ho")==0)	{
			////////this.fireEvent('updateHome');
		////////}
	//}

})
