import { Injectable } from '@angular/core';
import { Query } from '@data/poe';
import { Item, ItemSearchFiltersService } from '@shared/module/poe/type';

@Injectable({
    providedIn: 'root'
})
export class ItemSearchFiltersMiscsService implements ItemSearchFiltersService {
    public add(item: Item, query: Query): void {
        query.filters.misc_filters = {
            filters: {}
        };

        if (item.level) {
            query.filters.misc_filters.filters.ilvl = {
                min: item.level,
                max: item.level,
            };
        }

        query.filters.misc_filters.filters.corrupted = {
            option: `${!!item.corrupted}`
        };

        this.mapInfluences(item, query);

        if (!item.properties) {
            return;
        }

        const prop = item.properties;
        if (prop.gemLevel) {
            query.filters.misc_filters.filters.gem_level = {
                min: +prop.gemLevel.value,
                max: +prop.gemLevel.value
            };
        }

        if (prop.gemExperience) {
            const splittedExp = prop.gemExperience.value.split('/');
            const exp = +(splittedExp[0] || '').split('.').join('');
            const expMax = +(splittedExp[1] || '').split('.').join('');
            if (!isNaN(exp) && !isNaN(expMax)) {
                const expFactor = (exp / expMax) * 100;
                query.filters.misc_filters.filters.gem_level_progress = {
                    min: Math.round(expFactor * 100) / 100,
                };
            }
        }

        if (prop.quality) {
            const quality = +prop.quality.value.replace('%', '').replace('+', '');
            if (!isNaN(quality)) {
                query.filters.misc_filters.filters.quality = {
                    min: quality
                };
            }
        }
    }

    private mapInfluences(item: Item, query: Query): void {
        if (!item.influences) {
            return;
        }

        if (item.influences.shaper) {
            query.filters.misc_filters.filters.shaper_item = {
                option: `${!!item.influences.shaper}`
            };
        }
        if (item.influences.crusader) {
            query.filters.misc_filters.filters.crusader_item = {
                option: `${!!item.influences.crusader}`
            };
        }
        if (item.influences.hunter) {
            query.filters.misc_filters.filters.hunter_item = {
                option: `${!!item.influences.hunter}`
            };
        }
        if (item.influences.elder) {
            query.filters.misc_filters.filters.elder_item = {
                option: `${!!item.influences.elder}`
            };
        }
        if (item.influences.redeemer) {
            query.filters.misc_filters.filters.redeemer_item = {
                option: `${!!item.influences.redeemer}`
            };
        }
        if (item.influences.warlord) {
            query.filters.misc_filters.filters.warlord_item = {
                option: `${!!item.influences.warlord}`
            };
        }
    }
}
