const Sequelize = require('sequelize');
const { STRING } = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_express_spa');

const Secret = conn.define('secret', {
    body: {
        type: STRING,
        allowNull: false
    }
});

const syncAndSeed = async() => {
    await conn.sync({ force: true });
    await Promise.all([
        Secret.create({ body: "John never puts the seat down."}),
        Secret.create({ body: "I don't know how to drive :(" }),
        Secret.create({ body: "I know something you don't know!"})
    ])
}

module.exports = {
    syncAndSeed,
    Secret
}