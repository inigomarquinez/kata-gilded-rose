const { expect } = require('chai');
const { Shop, Item } = require('../src/gilded_rose_improved.js');

describe("Gilded Rose", () => {
  describe("foo item", () => {
    it("should decrease quality by 1 and sell in date by 1 after 1 day", () => {
      const gildedRose = new Shop([new Item("foo", 2, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(9);
      expect(items[0].sellIn).to.equal(1);
    });

    it("should decrease quality by 1 and sell in date by 1 after 2 days", () => {
      const gildedRose = new Shop([new Item("foo", 2, 10)]);
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(8);
      expect(items[0].sellIn).to.equal(0);
    });

    it("should have a minimum quality of 0", () => {
      const gildedRose = new Shop([new Item("foo", 2, 10)]);
      for (let i = 0; i < 20; i++) {
        gildedRose.updateQuality();
      }
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
      expect(items[0].sellIn).to.equal(-19);
    });

    it.skip("should have a maximum quality of 50", () => {
      const gildedRose = new Shop([new Item("foo", 5, 60)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
      expect(items[0].sellIn).to.equal(4);
    });
  });

  describe("Aged Brie item", () => {
    it("should increase quality by 1 and decrease sell in date by 1 after 1 day", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 5, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(11);
      expect(items[0].sellIn).to.equal(4);
    });

    it("should increase quality by 2 and decrease sell in date by 2 after 2 day", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 5, 10)]);
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(12);
      expect(items[0].sellIn).to.equal(3);
    });

    it("should increase quality by 1 + 2 and decrease sell in date by 2 after 2 day (one of them expired)", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 1, 10)]);
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(13);
      expect(items[0].sellIn).to.equal(-1);

    });

    it("should increase quality by 2 the expiration date", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 5, 10)]);
      for (let i = 0; i < 5; i++) {
        gildedRose.updateQuality();
      }
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(17);
      expect(items[0].sellIn).to.equal(-1);
    });

    it("should have a maximum quality of 50", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 5, 10)]);
      for (let i = 0; i < 50; i++) {
        gildedRose.updateQuality();
      }
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
      expect(items[0].sellIn).to.equal(-46);
    });
  });

  describe("Sulfuras, Hand of Ragnaros", () => {
    it("should always have quality = 80 and same sell in date", () => {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 2, 80)]);
      for (let i = 0; i < 20; i++) {
        gildedRose.updateQuality();
      }
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(80);
      expect(items[0].sellIn).to.equal(2);
    });

    it.skip("should always have quality = 80", () => {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 2, 10)]);
      for (let i = 0; i < 20; i++) {
        gildedRose.updateQuality();
      }
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(10);
      expect(items[0].sellIn).to.equal(2);
    });
  });

  describe("Backstage passes to a TAFKAL80ETC concert item", () => {
    it("should increase quality by 1 and decrease sell in date by 1 when there are more 10 days left", () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(11);
      expect(items[0].sellIn).to.equal(14);
    });

    it("should increase quality by 2 and decrease sell in date by 1 when there are less than 10 days left but more than 5 days left", () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 8, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(12);
      expect(items[0].sellIn).to.equal(7);

    });

    it("should increase quality by 3 and decrease sell in date by 1 when there are less than 5 days left but not expired", () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 4, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(13);
      expect(items[0].sellIn).to.equal(3);
    });

    it("should have a quality = 0 after sell in date expires", () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 10)]);
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
      expect(items[0].sellIn).to.equal(-1);
    });

    it("should have a maximum quality of 50", () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 30)]);
      for (let i = 0; i < 9; i++) {
        gildedRose.updateQuality();
      }
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
      expect(items[0].sellIn).to.equal(0);
    });
  });

  describe("Conjured item", () => {
    it("should decrease quality by 2 and sell in date by 1 after 1 day", () => {
      const gildedRose = new Shop([new Item("Conjured", 2, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(8);
      expect(items[0].sellIn).to.equal(1);
    });

    it("should decrease quality by 4 and sell in date by 2 after 2 days", () => {
      const gildedRose = new Shop([new Item("Conjured", 4, 10)]);
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(6);
      expect(items[0].sellIn).to.equal(2);

    });

    it("should have a minimum quality of 0", () => {
      const gildedRose = new Shop([new Item("Conjured", 2, 10)]);
      for (let i = 0; i < 20; i++) {
        gildedRose.updateQuality();
      }
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
      expect(items[0].sellIn).to.equal(-19);
    });
  });
});
