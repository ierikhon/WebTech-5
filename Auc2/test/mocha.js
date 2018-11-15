const assert = require("assert");
const users = require('../routes/users');

describe("users", function () {
    it("User Add test", (done) => {
        users.test_adduser('Vasya').then((usersres)=>{
            assert.equal(usersres[0].name, 'Vasya');
            assert.equal(usersres[0].money, 1000000);
            done();
        }).catch((error)=>{done(error)});
    });

    it("Picture Bought test", (done) => {
        users.test_addpicture('Vasya', {name:'test', sold_price:1000}).then((usersres)=>{
            assert.equal(usersres[0].name, 'Vasya');
            assert.equal(usersres[0].money, 100000 - 1000);
            assert.equal(usersres[0].Aquisitions[0].name, 'test');
            assert.equal(usersres[0].Aquisitions[0].sold_price, 1000);
            done();
        }).catch((error)=>{done(error)});
    });
});


