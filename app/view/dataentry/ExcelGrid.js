/* AfrendyBayu, 14Nov2013 */
Ext.define('rcm.view.dataentry.ExcelGrid', {
	extend: 'Ext.grid.Panel',
	xtype: 'excelgrid',
	//alias: 'widget.excelgrid',
	//xtype: 'taskExcelGrid',
	//id: 'idexcelgrid',
	
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
    
    viewConfig: {
        getRowClass: function(record, index) {
			/*
			var c = record.get('k140521');
			if (c==24)	return 'baik2';
			else 		return 'rusak2';
			
			c = record.get('k140522');
			if (c==24)	return 'baik1';
			else 		return 'rusak1';
			
			var cc = record.get('k140524');
			if (cc==24)	return 'sip';
			else 		return 'rusak';
			//*/
			/*
			var alertText = "record: "+index+' --- ';
			for (property in record.data) {
				if (property.substring(0,1)=='k')	{
					alertText += property+": "+record.data[property]+" ";
					if (record.data[property]==24)	{
						//alert(index+": rusak "+ property);
						alertText += "baik --";
						//return 'baik';
					}
					else {
						alertText += "rusak --";
						//return 'rusak';
					}
				}
			}
			alert(alertText);
			//*/
        }
    },
	
	initComponent: function() {
		var me=this, 
			cellEditingPlugin = Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 });
		
		me.plugins = cellEditingPlugin;
		//*
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
        cellEditingPlugin.on('edit', me.handleCellEdit, this);
	},
	/*
	initComponent: function() {
		var me=this, ti=rcm.view.Util.UxcolGrid(), // tb=rcm.view.Util.Ublntgl(), tg=rcm.view.Util.Utgl(), 
            cellEditingPlugin = Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 });

            groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
                //groupField: 'Lokasi',
				groupHeaderTpl: '{columnName}: {name} [{rows.length} Unit]',
				enableGroupingMenu: false,
                startCollapsed: true
            }); 
			//groupingFeature = {ftype:'grouping',startCollapsed: true,groupHeaderTpl: '{columnName}: {name} [{rows.length} Unit]'};
			
        //me.plugins = [cellEditingPlugin];
        //me.features = [groupingFeature];
        me.selModel = { 
			selType: 'cellmodel'
		};

		me.bbar = [{
			text: 'Compressor',
			icon: 'modul/icons/comp16.png',
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

        me.columns = {
            defaults: {
                draggable: false,
                resizable: false,
                hideable: false,
                groupable: false,
            },
            items: ti,
        };
        
        me.callParent(arguments);
		me.addEvents(
			'recordedit'
        );
        cellEditingPlugin.on('edit', me.handleCellEdit, this);
	},
	//*/
	
	renderer: function(value, metadata, record, rowIndex, colIndex, store) {
		//alert("jos renderer");
		//console.log("value: "+value+", rowIx: "+rowIndex+", colIx: "+colIndex);
		/*
		if(value.localeCompare("24:00")) {
			meta.style = "background-color:green;";
		} else {
			meta.style = "background-color:red;";
		}
		//*/
		return colIndex;
	},

    handleCellEdit: function(gridView, e) {
		//alert("asmuk handleCellEdit: "+e.field);
        //*
        var rec = e.grid.getStore().getAt(e.rowIdx), tt=e.field;
		rcmSettings.eqx = rec.get('id');
		rcmSettings.tgl =  "20"+tt.substring(1,3)+"-"+tt.substring(3,5)+"-"+tt.substring(5);
		//console.log("handleCellEdit ExcelGrid tgl: "+rcmSettings.tgl);
        //*/
        this.fireEvent('recordedit', gridView, e);
        
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
