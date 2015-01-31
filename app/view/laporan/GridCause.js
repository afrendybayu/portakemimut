/* AfrendyBayu, 20Jan2014 */
Ext.define('rcm.view.laporan.GridCause', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.gridCause',
	xtype: 'taskGridCause',
    dstore:'-',
    loadMask: true,
	//
	
	initComponent: function() {
		var me=this;//, sumFt=Ext.create('Ext.grid.feature.Summary');
		//me.store = 'SapCause',
		me.store = me.dstore,
		me.features = [{ftype: 'summary'}];
		me.columns = {	
			items: [
			{ xtype:'rownumberer',width:40 },
			{ header:'Nama',dataIndex:'nama',flex:1, 
				summaryRenderer: function() {
					return Ext.String.format('TOTAL'); 
				} },
			{ header:'Jml WO',dataIndex:'jml',width:50,summaryType:'sum' },
			{ header:'Persen (%)',dataIndex:'persen',width:75,xtype:'templatecolumn',tpl:'{persen} %',
				summaryRenderer: function() {
					return Ext.String.format('100 %'); 
				} }
		]};
		me.listeners = {
			selectionchange: function(model, records) {
				//alert("pilih: "+records[0].data.kode+" param: "+me.btnFilter);
				//me.fireEvent('sapFilter',records[0].data,);	// .kode
				//rcmSettings.yyyy = records;
				//alert("records");
				if (records[0] != null)	
				//alert("mumet");
				//else
					me.fireEvent('sapFilter',me.btnFilter,records[0].data);	// .kode
			}
		};
		me.bbar = [{
			text: 'Hapus Filter',
			iconCls: 'clrFilter',
			scope: this,
			handler: this.clearChartCause
		}];
		me.callParent(arguments);
		me.addEvents(
			'gridCauseFilter',
			'clrChartCause'
        );
	},
	clearChartCause: function(model, records)	{
		this.fireEvent('clrChartCause');
		//alert("dipilih: ");
	}
});
