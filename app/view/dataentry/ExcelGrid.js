/* AfrendyBayu, 14Nov2013 */
Ext.define('rcm.view.dataentry.ExcelGrid', {
	extend: 'Ext.grid.Panel',
	xtype: 'excelgrid',
	//alias: 'widget.excelgrid',
	//xtype: 'taskExcelGrid',
	//id: 'idexcelgrid',
	
	ngedit: 1,
	
	requires: [
		'rcm.view.Util',
		'Ext.grid.plugin.CellEditing',
		'Ext.grid.column.RowNumberer',
		'Ext.grid.feature.Grouping'
	],
	features: [{ftype:'grouping',/*startCollapsed:true,*/hideGroupedHeader:true,
				groupHeaderTpl: '{columnName}: {name} [{rows.length} Unit]'}],

	store: 'RunningHour',
    columnLines: true,
	selType: 'cellmodel',
	
	columns: {
		defaults: {
			enableGroupingMenu: false,
			draggable: false,
			resizable: false,
			hideable: false,
			groupable: false
		},
		items: rcm.view.Util.UxcolGrid()
    },
    /*plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    */
    viewConfig: {
        getRowClass: function(record, index) {

        }
    },
	
	initComponent: function() {
		var me=this, 	// cellEditingPlugin
			cex = Ext.create('Ext.grid.plugin.CellEditing', { 	clicksToEdit: 1		});
		me.plugins = [cex];		// cellEditingPlugin
		me.bbar = [{
			text: 'Compressor',
			iconCls: 'Compressor',
			scope: this,
			handler: this.CompClick
		},{
			text: 'Genset',
			scope: this,
			handler: this.GensetClick
		},{
			text: 'Pump',
			scope: this,
			handler: this.PumpClick
		}];
		//*/
		me.callParent(arguments);
		me.addEvents(
			'recordedit'
        );
        //cex.on('edit', me.handleCellEdit, this);
        cex.on('edit', me.hdlClk, me);
        //cex.on('beforeedit', me.hdlCellEna, this);
	},

	
	renderer: function(value, metadata, record, rowIndex, colIndex, store) {
		//alert("jos renderer");
		//console.log("value: "+value+", rowIx: "+rowIndex+", colIx: "+colIndex);
		//*
		if(value.localeCompare("24:00")==0) {
			//meta.style = "background-color:green;";
			return '<span style="color:green;">' + val + '</span>';
		} else {
			//meta.style = "background-color:red;";
			return '<span style="color:red;">' + val + '</span>';
		}
		//*/
		//return colIndex;
	},

	hdlClk: function()	{
		alert("tes hdlClk");
	},

    handleCellEdit: function(gridView, e) {
		alert("asmuk handleCellEdit: ");
		//alert("asmuk handleCellEdit: "+e.field);
        /*
        var rec = e.grid.getStore().getAt(e.rowIdx), tt=e.field;
		rcmSettings.eqx = rec.get('id');
		rcmSettings.tgl =  "20"+tt.substring(1,3)+"-"+tt.substring(3,5)+"-"+tt.substring(5);
		//console.log("handleCellEdit ExcelGrid tgl: "+rcmSettings.tgl);
        
        this.fireEvent('recordedit', gridView, e);
        //*/
    },
    
    hdlCellEna: function(editor,a,eOpts)	{
		//alert(this.ngedit);
		/*
		if (this.ngedit)	return true;
		else return false;
		//*/
		return true;
	},
    
    //*
    CompClick: function()	{
		rcmSettings.cat = 5;
		//console.log("rcmSettings.cat: "+rcmSettings.cat)
		this.fireEvent('EqClick', 5, "GC");
	},
	
	GensetClick: function()	{
		rcmSettings.cat = 7;
		//console.log("rcmSettings.cat: "+rcmSettings.cat)
		this.fireEvent('EqClick', 7, "GS");
	},
	PumpClick: function()	{
		rcmSettings.cat = 6;
		//console.log("rcmSettings.cat: "+rcmSettings.cat)
		this.fireEvent('EqClick', 6, "PM");
	}
	//*/
});
