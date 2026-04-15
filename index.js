/**
 * @file Лабораторная работа №4: Продвинутые объекты в JavaScript.
 * Демонстрация классов, наследования и функций-конструкторов.
 */
/**
 * Класс, представляющий базовый предмет в инвентаре.
 */
class Item {
    /**
     * @param {string} name - Название предмета.
     * @param {number} weight - Вес.
     * @param {string} rarity - Редкость (common, uncommon, rare, legendary).
     */
    constructor(name, weight, rarity) {
        this.name = name;
        this.weight = weight;
        this.rarity = rarity;
    }

    /**
     * Получить информацию о предмете.
     * @returns {string} Описание предмета.
     */
    getInfo() {
        return `[Item] ${this.name} | Вес: ${this.weight} | Редкость: ${this.rarity}`;
    }

    /**
     * Изменить вес предмета.
     * @param {number} newWeight - Новый вес.
     */
    setWeight(newWeight) {
        this.weight = newWeight;
    }
}

/**
 * Класс Оружия, расширяющий базовый предмет.
 * @extends Item
 */
class Weapon extends Item {
    /**
     * @param {string} name - Название.
     * @param {number} weight - Вес.
     * @param {string} rarity - Редкость.
     * @param {number} damage - Урон.
     * @param {number} durability - Прочность (0-100).
     */
    constructor(name, weight, rarity, damage, durability) {
        super(name, weight, rarity);
        this.damage = damage;
        this.durability = durability;
    }

    /**
     * Использовать оружие (уменьшает прочность).
     */
    use() {
        if (this.durability > 0) {
            this.durability = Math.max(0, this.durability - 10);
            console.log(`Вы использовали ${this.name}. Прочность: ${this.durability}%`);
        } else {
            console.log(`${this.name} сломано! Требуется ремонт.`);
        }
    }

    /**
     * Восстановить прочность до максимума.
     */
    repair() {
        this.durability = 100;
        console.log(`${this.name} отремонтировано.`);
    }

    /**
     * Переопределение метода для вывода характеристик оружия.
     * @returns {string}
     */
    getInfo() {
        return `${super.getInfo()} | Урон: ${this.damage} | Прочность: ${this.durability}%`;
    }
}
/**
 * Базовая функция-конструктор предмета.
 * @constructor
 */
function ItemFunc(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
}

ItemFunc.prototype.getInfo = function() {
    return `[ItemFunc] ${this.name} (${this.rarity})`;
};

ItemFunc.prototype.setWeight = function(newWeight) {
    this.weight = newWeight;
};

/**
 * Функция-конструктор оружия.
 * @constructor
 */
function WeaponFunc(name, weight, rarity, damage, durability) {
    // Вызов родительского конструктора
    ItemFunc.call(this, name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
}
WeaponFunc.prototype = Object.create(ItemFunc.prototype);
WeaponFunc.prototype.constructor = WeaponFunc;

WeaponFunc.prototype.use = function() {
    if (this.durability > 0) this.durability -= 10;
};

console.log("=== Тестирование классов ===");
const mySword = new Weapon("Excalibur", 5.2, "legendary", 100, 100);
console.log(mySword.getInfo());
mySword.use();
console.log(`Прочность после боя: ${mySword.durability}`);
mySword.repair();

console.log("\n=== Тестирование опциональной цепочки ===");
const inventory = {
    activeSlot: mySword,
    backupSlot: null
};
console.log("Урон активного оружия:", inventory.activeSlot?.damage); // 100
console.log("Урон запасного оружия:", inventory.backupSlot?.damage); // undefined (без ошибки!)
console.log("Инфо запасного оружия:", inventory.backupSlot?.getInfo?.()); // undefined (безопасный вызов метода)

console.log("\n=== Тестирование функций-конструкторов ===");
const oldBow = new WeaponFunc("Старый лук", 1.5, "common", 10, 50);
console.log(oldBow.getInfo());