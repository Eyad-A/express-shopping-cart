const items = require("./fakeDb")

class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;

        items.push(this);
    }

    static findAll() {
        return items 
    }

    static find(name) {
        const foundItem = items.find(x => x.name === name);
        if (foundItem === undefined) {
            throw { message: "Not Found", status: 404 }
        }
        return foundItem 
    }

    static update(name, data) {
        let foundItem = Item.find(name);
        if (foundItem === undefined) {
            throw { message: "not found", status: 404}
        }
        foundItem.name = data.name;
        foundItem.price = data.price;
        return foundItem;
    }

    static delete(name) {
        let foundIdx = items.findIndex(x => x.name === name);
        if (foundIdx === -1) {
            throw { message: "not found", status: 404}
        }
        items.splice(foundIdx, 1);
    }
}

module.exports = Item;