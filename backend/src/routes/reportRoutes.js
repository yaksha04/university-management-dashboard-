const router = require('express').Router();
const ctrl = require('../controllers/reportController');

router.get('/summary',           ctrl.getSummary);
router.get('/students',          ctrl.getReport('students'));
router.get('/faculty',           ctrl.getReport('faculty'));
router.get('/attendance',        ctrl.getReport('attendance'));
router.get('/payments',          ctrl.getReport('payments'));
router.get('/fees',              ctrl.getReport('fees'));
router.get('/history',           ctrl.getHistory);
router.get('/export/csv',        ctrl.exportReport('csv'));
router.get('/export/excel',      ctrl.exportReport('excel'));
router.get('/export/pdf',        ctrl.exportReport('pdf'));

module.exports = router;
