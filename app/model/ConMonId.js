/* Afrendy Bayu, 3Des2013 */
Ext.define('rcm.model.ConMonId', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],
	
	fields: [ 'id','tgl','lokasi','unit','wo','sap','url','pic','ket'],
    proxy: {
		type: 'ajax',
		api: {
			read	: 'ci/index.php/sap/rConMon/RCMonId'
			// create 	: 'ci/index.php/sap/rConMon/createCMon' 
        },
        reader: {
            type: 'json',
            root: 'condmonid',
            messageProperty: 'message'
        }
    }
});
