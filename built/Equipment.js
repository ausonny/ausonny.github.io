class EquipmentAbility {
    constructor(name) {
        this.name = name;
        this.levels = 0;
    }
    buyCost() {
        return this.levels + 1;
    }
    affordBuy() {
        if (gameData.resources.shards.amount.greaterThanOrEqualTo(this.buyCost())) {
            return true;
        }
        return false;
    }
    buy() {
        if (!this.affordBuy()) {
            return;
        }
        gameData.resources.shards.subtract(new JBDecimal(this.buyCost()));
        this.levels += 1;
        dirtyEquipment = true;
    }
    createDisplay(indexAbility, indexEquipment) {
        const newAbilityRow = document.createElement('div');
        newAbilityRow.classList.add('row', 'p-0', 'm-0');
        const NameCol = document.createElement('div');
        NameCol.classList.add('col-md-3', 'p-0', 'm-0', 'text-small', 'text-center');
        NameCol.innerHTML = this.name.toString();
        newAbilityRow.appendChild(NameCol);
        const UpgradeCol = document.createElement('div');
        UpgradeCol.classList.add('col-md-6', 'p-0', 'm-0', 'text-center');
        const upgradeButton = document.createElement('button');
        upgradeButton.innerHTML = `Shards: ${this.buyCost().toString()}`;
        if (this.affordBuy()) {
            upgradeButton.classList.add('bg-success');
        }
        else {
            upgradeButton.classList.add('bg-danger');
        }
        // Assign different attributes to the element.
        upgradeButton.id = `${indexEquipment.toString()}UpgradeButton${indexAbility.toString()}`;
        // eslint-disable-next-line func-names
        upgradeButton.addEventListener('click', function () {
            gameData.equipment[indexEquipment].abilities[indexAbility].buy();
            display.addToDisplay(`${gameData.equipment[indexEquipment].abilities[indexAbility].name} updated`, DisplayCategory.Story);
            dirtyEquipment = true;
        });
        UpgradeCol.appendChild(upgradeButton);
        newAbilityRow.appendChild(UpgradeCol);
        const LevelCol = document.createElement('div');
        LevelCol.classList.add('col-md-3', 'p-0', 'm-0', 'text-center');
        LevelCol.innerHTML = this.levels.toString();
        newAbilityRow.appendChild(LevelCol);
        return newAbilityRow;
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Equipment {
    constructor(name) {
        this.name = name;
        this.abilities = [];
        dirtyEquipment = true;
    }
    DestructAbilities() {
        gameData.resources.shards.add(new JBDecimal(this.ShardsGainedByDestruction()));
        dirtyEquipment = true;
    }
    ShardsGainedByDestruction() {
        let ret = 0;
        this.abilities.forEach((element) => {
            ret += element.levels;
        });
        return ret;
    }
    NewEquipment(tier) {
        let maxAbilities = Math.ceil((tier + 1) / 5);
        if (maxAbilities > 1) {
            maxAbilities = Math.ceil(Math.random() * maxAbilities);
        }
        const possiblities = this.CreatePossibleAbilities();
        while (this.abilities.length < maxAbilities) {
            const i = Math.floor(Math.random() * possiblities.length);
            const newAbility = new EquipmentAbility(possiblities[i]);
            newAbility.levels = Math.ceil(Math.random() * tier * 10);
            this.abilities.push(newAbility);
            possiblities.splice(i);
        }
    }
    // eslint-disable-next-line class-methods-use-this
    CreatePossibleAbilities() {
        const possibles = [];
        possibles.push('Gun Attack');
        possibles.push('Missile Attack');
        possibles.push('Cannon Attack');
        possibles.push('Critical Chance');
        possibles.push('Crit Multiplier');
        possibles.push('Metal Production');
        possibles.push('Mulligans');
        possibles.push('Poison Effect');
        if (gameData.world.currentTier > 1) {
            possibles.push('Shield Break');
        }
        return possibles;
    }
    CreateDisplay(index) {
        const newEquipmentRow = document.createElement('div');
        newEquipmentRow.classList.add('row', 'p-0', 'm-0', 'border', 'border-light');
        const NameCol = document.createElement('div');
        NameCol.classList.add('col-md-2', 'p-0', 'm-0', 'text-medium', 'text-center');
        NameCol.innerHTML = this.name.toString();
        newEquipmentRow.appendChild(NameCol);
        const buttonsCol = document.createElement('div');
        buttonsCol.classList.add('col-md-1', 'p-0', 'm-0', 'text-start');
        const activeButton = document.createElement('button');
        activeButton.id = `Active${index.toString()}`;
        activeButton.innerHTML = 'A';
        activeButton.classList.add('bg-primary', 'text-light', 'equipmentbutton');
        if (index === 0) {
            activeButton.classList.add('d-none');
        }
        // eslint-disable-next-line func-names
        activeButton.addEventListener('click', function () {
            MoveEquipment(index);
            dirtyEquipment = true;
        });
        buttonsCol.appendChild(activeButton);
        const saveButton = document.createElement('button');
        saveButton.id = `Save${index.toString()}`;
        saveButton.innerHTML = 'S';
        saveButton.classList.add('bg-primary', 'text-light', 'equipmentbutton');
        if (index < 5) {
            saveButton.classList.add('d-none');
        }
        // eslint-disable-next-line func-names
        saveButton.addEventListener('click', function () {
            MoveEquipment(index);
            MoveEquipment(1);
            dirtyEquipment = true;
        });
        buttonsCol.appendChild(saveButton);
        newEquipmentRow.appendChild(buttonsCol);
        const DeleteCol = document.createElement('div');
        DeleteCol.classList.add('col-md-2', 'p-0', 'm-0', 'text-end');
        DeleteCol.innerHTML = `Shards Gained: ${this.ShardsGainedByDestruction().toString()} `;
        const deleteButton = document.createElement('button');
        deleteButton.id = `Delete${index.toString()}`;
        deleteButton.innerHTML = 'X';
        deleteButton.classList.add('bg-primary', 'text-light', 'equipmentbutton');
        // eslint-disable-next-line func-names
        deleteButton.addEventListener('click', function () {
            DeleteEquipment(index);
            dirtyEquipment = true;
        });
        DeleteCol.appendChild(deleteButton);
        const AbilitiesCol = document.createElement('div');
        AbilitiesCol.classList.add('col-md-6', 'p-0', 'm-0', 'text-start');
        this.abilities.forEach((a, aindex) => {
            AbilitiesCol.appendChild(a.createDisplay(aindex, index));
        });
        newEquipmentRow.appendChild(AbilitiesCol);
        newEquipmentRow.appendChild(DeleteCol);
        return newEquipmentRow;
    }
}
//# sourceMappingURL=Equipment.js.map