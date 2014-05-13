Ext.define('rcm.controller.Main', {
    extend: 'Ext.app.Controller',

    views: [
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
    
    ubahFieldRH: function()	{
		this.getRunningHourModel().setFields(rcm.view.Util.Ublntgl());
	},
    
    onLaunch: function() {
		this.ubahFieldRH();
        //alert("ini muncul: onLaunch");
	}

});
