module.exports = `
<div class="md-layout md-gutter">
    <div class="md-layout-item md-size-60">
        <md-field>
            <label v-locale="localeLabel || (localeKey + '.period_value')"></label>
            <md-input v-model="periodValue" required @change="onChangePeriodInput"></md-input>
        </md-field>
    </div>

    <div class="md-layout-item md-size-40">
        <md-field>
            <label v-locale="localeKey + '.period_unit'"></label>

            <md-select v-model="periodUnit" @md-selected="onChangePeriodInput">
                <md-option v-for="unit in periodUnits" :value="unit.value">{{unit.name}}</md-option>
            </md-select>
        </md-field>
    </div>
</div>
`;