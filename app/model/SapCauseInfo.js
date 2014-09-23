/* Afrendy Bayu, 18Jan2014 */
Ext.define('rcm.model.SapCauseInfo', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: ['id','noorder','nosap','equip','damage','cause','opart','damagenm','causenm','opartnm',
				'down','mainwork','tipe','downstart','biaya'],
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/sap/rFMEA/getCauseInfo'
        },
        reader: {
            type: 'json',
            root: 'sapcause',
            messageProperty: 'message'
        }
    }
});
