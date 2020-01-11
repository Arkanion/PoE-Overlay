import { Injectable } from '@angular/core';
import { ExportedItem, Item, ItemRarity, ItemSectionParserService, Section } from '../../../type';
import { BaseItemCategoriesService } from '../../base-item-categories/base-item-categories.service';
import { BaseItemTypesService } from '../../base-item-types/base-item-types.service';
import { ClientStringService } from '../../client-string/client-string.service';
import { WordService } from '../../word/word.service';

@Injectable({
    providedIn: 'root'
})
export class ItemSectionRarityParserService implements ItemSectionParserService {
    constructor(
        private readonly clientString: ClientStringService,
        private readonly baseItemTypesService: BaseItemTypesService,
        private readonly baseItemCategoriesService: BaseItemCategoriesService,
        private readonly wordService: WordService) { }

    public optional = false;

    public parse(item: ExportedItem, target: Item): Section {
        const phrase = `${this.clientString.translate('ItemDisplayStringRarity')}: `;

        const raritySection = item.sections.find(x => x.content.indexOf(phrase) === 0);
        if (!raritySection) {
            return null;
        }

        const lines = raritySection.lines;

        const rarities = this.getRarities();
        const rarityValue = lines[0].slice(phrase.length).trim();

        const rarity = rarities.find(x => x.key === rarityValue);
        if (!rarity) {
            return null;
        }

        target.rarity = rarity.value;

        switch (lines.length) {
            case 2:
                target.typeId = this.baseItemTypesService.search(lines[1]);
                break;
            case 3:
                target.nameId = this.wordService.search(lines[1]);
                target.typeId = this.baseItemTypesService.search(lines[2]);
                break;
            default:
                return null;
        }

        if (!target.typeId) {
            return null;
        }

        target.category = this.baseItemCategoriesService.get(target.typeId);
        return raritySection;
    }

    private getRarities(): {
        key: string,
        value: ItemRarity
    }[] {
        return [
            {
                key: this.clientString.translate('ItemDisplayStringNormal'),
                value: ItemRarity.Normal,
            },
            {
                key: this.clientString.translate('ItemDisplayStringMagic'),
                value: ItemRarity.Magic,
            },
            {
                key: this.clientString.translate('ItemDisplayStringRare'),
                value: ItemRarity.Rare,
            },
            {
                key: this.clientString.translate('ItemDisplayStringUnique'),
                value: ItemRarity.Unique,
            },
            {
                key: this.clientString.translate('ItemDisplayStringCurrency'),
                value: ItemRarity.Currency,
            },
            {
                key: this.clientString.translate('ItemDisplayStringGem'),
                value: ItemRarity.Gem,
            },
            {
                key: this.clientString.translate('ItemDisplayStringDivinationCard'),
                value: ItemRarity.DivinationCard,
            },
        ];
    }
}
