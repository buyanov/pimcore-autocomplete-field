pimcore.registerNS("pimcore.object.classes.data.autocomplete");

pimcore.object.classes.data.autocomplete = Class.create(pimcore.object.classes.data.data, {

    type: "autocomplete",
    /**
     * define where this datatype is allowed
     */
    allowIn: {
        object: true,
        objectbrick: true,
        fieldcollection: true,
        localizedfield: false,
        classificationstore : false,
        block: true,
        encryptedField: false
    },

    initialize: function (treeNode, initData) {
        this.type = "autocomplete";
        this.initData(initData);
        this.treeNode = treeNode;
    },

    getTypeName: function () {
        return t("Autocomplete");
    },

    getGroup: function () {
        return "select";
    },

    getIconClass: function () {
        return "pimcore_icon_select";
    },

    getLayout: function ($super) {

        $super();

        const specificItems = this.getSpecificPanelItems(this.datax);
        this.specificPanel.add(specificItems);

        return this.layout;
    },

    getSpecificPanelItems: function () {
        return [
            {
                xtype: 'numberfield',
                width: 600,
                fieldLabel: t("width"),
                name: 'width',
                value: this.datax.width
            },
            {
                xtype: 'textfield',
                width: 600,
                fieldLabel: t("autocomplete_data_source_route"),
                name: 'dataSourceRoute',
                value: this.datax.dataSourceRoute
            },
        ];
    },

    applySpecialData: function (source) {
        if (source.datax) {

            if (!this.datax) {
                this.datax = {};
            }

            Ext.apply(this.datax, {
                dataSourceRoute: source.datax.dataSourceRoute,
                width: source.datax.width
            });
        }
    }
});