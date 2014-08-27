/* AfrendyBayu 18Jan2014 */
Ext.define('rcm.store.SapSymptomInfo', {
    extend: 'Ext.data.Store',
    model: 'rcm.model.SapCauseInfo',
    requires: 'rcm.model.SapCauseInfo',
    autoLoad: true
});
