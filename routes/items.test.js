process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
let items = require("../fakeDb")
let item = { name: "pancakes", price: 29.99 } 

beforeEach(async () => {
    items.push(item) 
});

afterEach(async () => {
    items = []
});


// GET all items

describe("GET /items", async function() {
    test("GET all items", async function() {
        const resp = await request(app).get('/items');
        const { items } = resp.body;
        expect(resp.statusCode).toBe(200);
        expect(items).toHaveLength(1);
    });
});


// GET one specific item 

describe("GET /items/:name", async function() {
    test("GET one specific item", async function() {
        const resp = await request(app).get(`/items/${item.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body.item).toEqual(item);        
    });
});


// POST an item 

describe("POST /items", async function() {
    test("POST a new item", async function() {
        const resp = await request(app)
        .post('/items')
        .send({
            name: "Waffles",
            price: 15
        });
        expect(resp.statusCode).toBe(200);
        expect(resp.body.item.name).toEqual("Waffles");
        expect(resp.body.item.price).toEqual(15);
    });
});


// PATCH an item 
describe("Patch /items/:name", async function() {
    test("Patch an item", async function() {
        const resp = await request(app)
        .patch(`/items/${item.name}`)
        .send({
            name: "Icecream",
            price: 5
        });
        expect(resp.statusCode).toBe(200);
        expect(resp.body.item.name).toEqual("Icecream");
    });
});


// Delete an item 

describe("DELETE /items/:name", async function() {
    test("Delete an item", async function() {
        const resp = await request(app)
        .delete(`/items/${item.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: "Deleted" });
    });
});