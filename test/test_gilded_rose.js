var { expect } = require('chai');
var { Shop, Item } = require('../src/gilded_rose_improved.js');
// var { Shop, Item } = require('../src/gilded_rose.js');


describe("Gilded Rose", function () {

  describe("regular item", function () {

    it("should decrease quality by 1 when one day passes", function () {
      const gildedRose = new Shop([new Item("foo", 2, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(9);
      expect(items[0].sellIn).to.equal(1);

    });

    it("should decrease quality by 2 when two days pass", function () {
      const gildedRose = new Shop([new Item("foo", 2, 10)]);
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(8);
      expect(items[0].sellIn).to.equal(0);

    });

    it("quality should never be less than 0 ", function () {
      const gildedRose = new Shop([new Item("foo", 2, 10)]);
      for (let i = 0; i < 20; i++) {
        gildedRose.updateQuality();
      }
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
      expect(items[0].sellIn).to.equal(-19);

    });

    it.skip("quality should never be greater than 50 ", function () {
      const gildedRose = new Shop([new Item("foo", 5, 60)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
      expect(items[0].sellIn).to.equal(4);

    });
  });

  describe("Aged Brie item", function () {

    it("should increase its quality by 1 when one day passes", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 5, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(11);
      expect(items[0].sellIn).to.equal(4);

    });

    it("should decrease quality by 2 when two days pass", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 5, 10)]);
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(12);
      expect(items[0].sellIn).to.equal(3);

    });

    it("should increase quality by 1 + 2 when sell is expired by one day", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 1, 10)]);
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(13);
      expect(items[0].sellIn).to.equal(-1);

    });

    it("quality should never be less than 0 ", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 5, 10)]);
      for (let i = 0; i < 5; i++) {
        gildedRose.updateQuality();
      }
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(17);
      expect(items[0].sellIn).to.equal(-1);

    });

    it("quality should never be greater than 50 ", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 5, 10)]);
      for (let i = 0; i < 50; i++) {
        gildedRose.updateQuality();
      }
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
      expect(items[0].sellIn).to.equal(-46);

    });
  });

  describe("Sulfuras, Hand of Ragnaros", function () {


    it("should never decrease quality nor sell in date", function () {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 2, 80)]);
      for (let i = 0; i < 20; i++) {
        gildedRose.updateQuality();
      }
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(80);
      expect(items[0].sellIn).to.equal(2);
    });

    it.skip("should never decrease quality nor sell in date", function () {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 2, 10)]);
      for (let i = 0; i < 20; i++) {
        gildedRose.updateQuality();
      }
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(10);
      expect(items[0].sellIn).to.equal(2);
    });
  });


  describe("Backstage passes to a TAFKAL80ETC concert item", function () {

    it("should increase by one when more than 10 days", function () {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(11);
      expect(items[0].sellIn).to.equal(14);

    });

    it("should increase by 2 when less than 10 days", function () {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 8, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(12);
      expect(items[0].sellIn).to.equal(7);

    });

    it("should increase by 3 when less than 5 days ", function () {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 4, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(13);
      expect(items[0].sellIn).to.equal(3);

    });

    it("quality should  be 0 after seel in date expires", function () {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 10)]);
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
      expect(items[0].sellIn).to.equal(-1);

    });

    it("quality should never be greater than 50", function () {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 30)]);
      for (let i = 0; i < 9; i++) {
        gildedRose.updateQuality();
      }      
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
      expect(items[0].sellIn).to.equal(0);

    });
  });

  describe("Conjured item", function () {

    it("should decrease quality by 2 when one day passes", function () {
      const gildedRose = new Shop([new Item("Conjured", 2, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(8);
      expect(items[0].sellIn).to.equal(1);

    });

    it("should decrease quality by 4 when two days pass", function () {
      const gildedRose = new Shop([new Item("Conjured", 4, 10)]);
      gildedRose.updateQuality();
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(6);
      expect(items[0].sellIn).to.equal(2);

    });

    it("quality should never be less than 0 ", function () {
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
