var express = require('express');
var router = express.Router();

const relai = require("../models/relai");

/* GET relai page. */

/*router.get('/relai',(req,res)=>{
    Relais.find().then(document =>{
        res.status(200).json({
            message : "Relais trouvées ",
            relais : document
        });
    });
});
*/

router.post('/api/relai', (req, res, next) => {
    delete req.body._id;
    const thing = new relai({
        ...req.body

        /*region: req.body.region,
        site: req.body.site,
        freqTx : parseFloat(req.body.freqTx),
        shift : parseFloat(req.body.shift),
        tone : parseFloat(req.body.tone),
        mode : req.body.mode,
        locator : req.body.locator*/
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
});

router.put('/api/relai/:id', (req, res, next) => {
    relai.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
});

router.delete('/api/relai/:id', (req, res, next) => {
    relai.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
});

router.get('/api/relai/:id', (req, res, next) => {
    relai.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
});

router.use('/api/relai', (req, res, next) => {
    relai.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
});


module.exports = router;
