const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  req.logger.warning('Prueba de alerta');
  req.logger.error('Prueba de error');
  req.logger.info('Prueba de info');
  req.logger.http('Prueba de http');
  req.logger.debug('Prueba de debug');
  res.send({ message: 'Prueba de logger!!'});
})

module.exports = router