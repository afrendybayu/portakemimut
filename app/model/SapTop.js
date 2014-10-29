/* Afrendy Bayu, 31Agu2014 */
Ext.define('rcm.model.SapTop', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: [ 'ortype','desk',{name: 'jml',type:'float'},'color' ]
});
