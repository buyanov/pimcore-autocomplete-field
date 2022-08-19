pimcore.registerNS("pimcore.object.tags.autocomplete");

pimcore.object.tags.autocomplete = Class.create(pimcore.object.tags.select, {
    type: "autocomplete",

    getGridColumnEditor:function (field) {
        if(field.layout.noteditable) {
            return null;
        }

        this.store = this.createStore()

        const options = {
            store: this.store,
            triggerAction: "all",
            editable: false,
            mode: "local",
            valueField: 'value',
            displayField: 'key'
        };

        return new Ext.form.ComboBox(options);
    },

    getLayoutShow: function () {

        this.component = this.getLayoutEdit();
        this.component.setReadOnly(true);

        return this.component;
    },

    getGridColumnConfig:function (field) {
        const renderer = function (key, value, metaData, record) {

            this.applyPermissionStyle(key, value, metaData, record);

            if (record.data.inheritedFields[key] && record.data.inheritedFields[key].inherited == true) {
                try {
                    metaData.tdCls += " grid_value_inherited";
                } catch (e) {
                    console.log(e);
                }
            }

            return value;

        }.bind(this, field.key);

        return {
            header: ts(field.label),
            sortable: true,
            dataIndex: field.key,
            renderer: renderer,
            editor: this.getGridColumnEditor(field)
        };
    },

    createStore: function () {
        if (this.fieldConfig.dataSourceRoute !== '') {
            return new Ext.data.JsonStore({
                proxy: {
                    type: 'ajax',
                    url: Routing.generate(this.fieldConfig.dataSourceRoute, {'value': this.data}),
                },
                fields: ["key", "value"],
                listeners: {
                    load: function(store, records, success, operation) {
                        if (!success) {
                            pimcore.helpers.showNotification(t("error"), operation.getError());
                        }
                    }.bind(this)
                },
                autoLoad: false
            });
        }

    },

    getLayoutEdit: function () {
        this.store = this.createStore()

        this.component = new Ext.form.ComboBox({
            name: this.fieldConfig.name,
            triggerAction: "all",
            fieldLabel: this.fieldConfig.title,
            store: this.store,
            itemCls: "object_field",
            width: this.fieldConfig.width ?? 500,
            displayField: "key",
            valueField: "value",
            queryMode: 'remote',
            autoLoadOnValue: true,
            value: this.data,
            typeAhead: true,
            selectOnFocus: true,
            readOnly: this.fieldConfig.noteditable,
            triggers: {
                clearButton: {
                    cls: 'x-form-clear-trigger',
                    handler: function () {
                        this.clearValue();
                    }
                }
            }
        });

        return this.component;
    },
});