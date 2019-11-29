const ITEMS = {
  AGED_BRIE: 'Aged Brie',
  BACKSTAGE: 'Backstage passes to a TAFKAL80ETC concert',
  SULFURAS: 'Sulfuras, Hand of Ragnaros',
  CONJURED: 'Conjured'
};

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateItemQuality(item) {
    switch(item.name) {
      case ITEMS.AGED_BRIE:
        item.quality = Math.min((item.sellIn > 0 ? item.quality + 1 : item.quality + 2), MAX_QUALITY);
        break;

      case ITEMS.BACKSTAGE:
        item.quality = item.sellIn > 0 ? Math.min((item.sellIn > 10 ? item.quality + 1 : (item.sellIn > 5 ? item.quality + 2 : item.quality + 3)), MAX_QUALITY) : MIN_QUALITY;
        break;

      default:
        item.quality = Math.max(item.quality - (item.name === ITEMS.CONJURED ? 2 : 1), MIN_QUALITY);
    }
  }

  updateQuality() {
    return this.items.map(item => {
      if (item.name != ITEMS.SULFURAS) {
        this.updateItemQuality(item);
        item.sellIn -= 1;}

      return item;
    });
  }
}

module.exports = {
  Item,
  Shop
}
