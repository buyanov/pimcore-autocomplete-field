pimcore.registerNS("pimcore.plugin.Autocomplete");

pimcore.plugin.Autocomplete = Class.create(pimcore.plugin.admin, {
    getClassName: function () {
        return "pimcore.plugin.Autocomplete";
    },

    initialize: function () {
        pimcore.plugin.broker.registerPlugin(this);
    },

    pimcoreReady: function (params, broker) {
    }
});

const AutocompletePlugin = new pimcore.plugin.Autocomplete();
