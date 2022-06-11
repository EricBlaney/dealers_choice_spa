const db = require('./db');
const { Secret } = db;
const express = require('express');
const app = express();
const path = require('path');


app.use('/assets', express.static('assets'));
app.use('/dist', express.static('dist'));

app.use(express.json());

app.get('/', (req,res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/secrets', async(req,res,next) => {
    try{
        res.send(await Secret.findAll());
    }
    catch(ex) {
        next(ex);
    }
})

app.delete('/api/secrets/:id', async(req,res,next) => {
    try{
        const secret = await Secret.findByPk(req.params.id);
        await secret.destroy();
        res.sendStatus(204);
    }
    catch{
        next(ex);
    }
})

app.post('/api/secrets', async(req,res,next) => {
    try{
        res.status(201).send (await Secret.create(req.body));
    }
    catch(ex) {
        next(ex);
    }
})

const init = async() => {
    try{
        await db.syncAndSeed();
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`listening on port ${port}`));
    }
    catch(ex){
        console.log(ex);
    }
}

init();