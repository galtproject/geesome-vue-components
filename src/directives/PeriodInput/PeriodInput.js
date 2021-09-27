/*
 * Copyright ©️ 2020 GaltProject Society Construction and Terraforming Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka)
 *
 * Copyright ©️ 2020 Galt•Core Blockchain Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka) by
 * [Basic Agreement](ipfs/QmaCiXUmSrP16Gz8Jdzq6AJESY1EAANmmwha15uR3c1bsS)).
 */

export default {
    name: 'period-input',
    template: require('./PeriodInput.template'),
    props: ['value', 'localeLabel'],
    async created() {
        await this.$locale.waitForLoad();

        this.periodUnits = [
            {value: 'hours', name: this.getLocale('unit_hours')},
            {value: 'days', name: this.getLocale('unit_days')}
        ];
        if (this.value) {
            this.convertValueToData();
        }
    },

    methods: {
        convertValueToData() {
            if (this.value >= this.dayUnit) {
                this.periodUnit = 'days';
                this.periodValue = this.value / this.dayUnit;
            } else {
                this.periodUnit = 'hours';
                this.periodValue = this.value / this.hourUnit;
            }
        },
        convertDataToValue() {
            if (this.periodUnit == 'days') {
                this.$emit('input', this.dayUnit * this.periodValue);
                this.$emit('change', this.dayUnit * this.periodValue);
            } else {
                this.$emit('input', this.hourUnit * this.periodValue);
                this.$emit('change', this.hourUnit * this.periodValue);
            }
        },
        getLocale(key, options = null) {
            return this.$locale.get(this.localeKey + "." + key, options);
        }
    },

    computed: {},

    watch: {
        periodUnit() {
            this.convertDataToValue();
        },
        periodValue() {
            this.convertDataToValue();
        }
    },

    data() {
        return {
            localeKey: 'period_input',
            dayUnit: 60 * 60 * 24,
            hourUnit: 60 * 60,
            periodUnit: null,
            periodValue: null,
            periodUnits: []
        }
    }
}
