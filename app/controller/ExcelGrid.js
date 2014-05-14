Ext.define('rcm.controller.ExcelGrid', {
    extend: 'Ext.app.Controller',

    views: [
		'Ext.form.field.Text',
		
		'rcm.view.Util',
		'dataentry.ExcelGrid'
    ],

    controllers: [

    ],

    stores: [
		'Hirarki',
		'RunningHour'
    ],
    
    models: [
		'RunningHour'
    ],
    
    //*
    init: function() {
		var me = this;
        me.control({
			'excelgrid': {
				recordedit: me.updateGrid
				//EqClick: me.equipClick
				//specialkey: me.handleSpecialKey,
			}
			
		});
    },
    
    updateGrid: function(view, e) {
        //var me=this, tv=e.value; drow=this.getRunningHourStore().getAt(e.rowIdx);
        alert("muncul dulu");
        //var at=e.row;
        //rcmSettings.asa = this.getRunningHourStore().getAt(e.rowIdx).data;
        //var alertText = ' ';   for (property in e) { alertText += property + ':' + e[property]+'; ';   }
		//console.log("updateGrid isi: "+tv);
		/*
		if ((tv=='')||(tv==e.originalValue))	{		//||
			//console.log("updateGrid numpang lewat");
		} else if (tv==e.originalValue)	{
			//console.log("update nilai, sudah beda");
		} else if ((tv==24)||(tv=="24:00"))	{
			//this.simpanRH(e);
		} else {
			//this.buildFormGagal(e);
		}
		//*/
	},
    //*/
    ubahFieldRH: function()	{
		this.getRunningHourModel().setFields(rcm.view.Util.Ublntgl());
	},
    
    onLaunch: function() {
		this.ubahFieldRH();
        alert("ini muncul: onLaunch");
	}

});
