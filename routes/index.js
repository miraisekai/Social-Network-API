const router = require('express').Router();

router.use('/api', require('./apiRoutes'));
router.use((req,res)=> res.send('<h1>Wrong Route!!!</h1>'))

module.exports = router;