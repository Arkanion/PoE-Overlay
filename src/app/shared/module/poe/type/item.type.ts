import { Query } from '@data/poe';
import { Currency } from './currency.type';

export interface Item {
    rarity?: ItemRarity;
    category?: ItemCategory;
    nameId?: string;
    typeId?: string;
    level?: number;
    corrupted?: boolean;
    damage?: ItemWeaponDamage;
    sockets?: ItemSocket[];
    properties?: ItemProperties;
    requirements?: ItemRequirements;
    secondaryDescription?: string;
    implicits?: ItemMod[];
    explicits?: ItemMod[][];
    influences?: ItemInfluences;
    description?: string;
    note?: string;
}

export enum ItemRarity {
    Normal = 'normal',
    Magic = 'magic',
    Rare = 'rare',
    Unique = 'unique',
    Currency = 'currency',
    Gem = 'gem',
    DivinationCard = 'divinationcard'
}

export enum ItemCategory {
    Weapon = 'weapon',
    WeaponOne = 'weapon.one',
    WeaponOneMelee = 'weapon.onemelee',
    WeaponTwoMelee = 'weapon.twomelee',
    WeaponBow = 'weapon.bow',
    WeaponClaw = 'weapon.claw',
    WeaponDagger = 'weapon.dagger',
    WeaponRunedagger = 'weapon.runedagger',
    WeaponOneAxe = 'weapon.oneaxe',
    WeaponOneMace = 'weapon.onemace',
    WeaponOneSword = 'weapon.onesword',
    WeaponSceptre = 'weapon.sceptre',
    WeaponStaff = 'weapon.staff',
    WeaponWarstaff = 'weapon.warstaff',
    WeaponTwoAxe = 'weapon.twoaxe',
    WeaponTwoMace = 'weapon.twomace',
    WeaponTwoSword = 'weapon.twosword',
    WeaponWand = 'weapon.wand',
    WeaponRod = 'weapon.rod',
    Armour = 'armour',
    ArmourChest = 'armour.chest',
    ArmourBoots = 'armour.boots',
    ArmourGloves = 'armour.gloves',
    ArmourHelmet = 'armour.helmet',
    ArmourShield = 'armour.shield',
    ArmourQuiver = 'armour.quiver',
    Accessory = 'accessory',
    AccessoryAmulet = 'accessory.amulet',
    AccessoryBelt = 'accessory.belt',
    AccessoryRing = 'accessory.ring',
    Gem = 'gem',
    GemActivegem = 'gem.activegem',
    GemSupportGem = 'gem.supportgem',
    GemSupportGemplus = 'gem.supportgemplus',
    Jewel = 'jewel',
    JewelAbyss = 'jewel.abyss',
    Flask = 'flask',
    Map = 'map',
    MapFragment = 'map.fragment',
    MapScarab = 'map.scarab',
    Watchstone = 'watchstone',
    Leaguestone = 'leaguestone',
    Prophecy = 'prophecy',
    Card = 'card',
    MonsterBeast = 'monster.beast',
    MonsterSample = 'monster.sample',
    Currency = 'currency',
    CurrencyPiece = 'currency.piece',
    CurrencyResonator = 'currency.resonator',
    CurrencyFossil = 'currency.fossil',
    CurrencyIncubator = 'currency.incubator',
}

export interface ItemWeaponDamage {
    dps?: number;
    edps?: number;
    pdps?: number;
}

export enum ItemSocketColor {
    Red = 'R',
    Green = 'G',
    Blue = 'B',
    White = 'W'
}

export interface ItemSocket {
    color: ItemSocketColor;
    linked: boolean;
}

export interface ItemProperties {
    weaponPhysicalDamage?: ItemProperty;
    weaponElementalDamage?: ItemProperty[];
    weaponChaosDamage?: ItemProperty;
    weaponCriticalStrikeChance?: ItemProperty;
    weaponAttacksPerSecond?: ItemProperty;
    weaponRange?: ItemProperty;
    shieldBlockChance?: ItemProperty;
    armourArmour?: ItemProperty;
    armourEvasionRating?: ItemProperty;
    armourEnergyShield?: ItemProperty;
    gemLevel?: ItemProperty;
    quality?: ItemProperty;
    gemExperience?: ItemProperty;
    mapTier?: ItemProperty;
    mapQuantity?: ItemProperty;
    mapRarity?: ItemProperty;
    mapPacksize?: ItemProperty;
}

export interface ItemProperty {
    value: string;
    augmented: boolean;
}

export interface ItemAdditionalProperty extends ItemProperty {
    text: string;
}

export interface ItemMod {
    key: string;
    predicate: string;
    values: string[];
    crafted?: boolean;
}

export interface ItemRequirements {
    level?: number;
    int?: number;
    str?: number;
    dex?: number;
}

export interface ItemInfluences {
    shaper?: boolean;
    crusader?: boolean;
    hunter?: boolean;
    elder?: boolean;
    redeemer?: boolean;
    warlord?: boolean;
}

export interface ItemsMap {
    label: string;
    items: Item[];
}

export type EvaluateItem = Item & {
    originalCurrency: Currency;
    originalCurrencyAmount: number;
    targetCurrency: Currency;
    targetCurrencyAmount: number;
    targetCurrencyAmountRounded: number;
};

export interface EvaluateItemGrouped {
    value: number;
    items: EvaluateItem[];
}

export interface ItemSearchEvaluateResult {
    url: string;
    items: EvaluateItem[];
    itemsGrouped?: EvaluateItemGrouped[];
    targetCurrency?: Currency;
    targetCurrencyMin?: number;
    targetCurrencyMax?: number;
    targetCurrencyMode?: number;
    targetCurrencyMedian?: number;
    targetCurrencyMean?: number;
}

export type SearchItem = Item & {
    currency: Currency;
    currencyAmount: number;
};

export interface ItemSearchResult {
    items: SearchItem[];
    url: string;
}

export interface ExportedItem {
    sections: Section[];
}

export interface Section {
    content: string;
    lines: string[];
}

export interface ItemSectionParserService {
    optional: boolean;
    parse(item: ExportedItem, target: Item): Section | Section[];
}

export interface ItemPostParserService {
    process(item: Item): void;
}

export interface ItemSearchFiltersService {
    add(item: Item, query: Query): void;
}
