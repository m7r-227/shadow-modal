/*  It's the only way i found to directly export a typescript class to be used like :
    const ShadowModal = require('shadow-modal') ;
    instead of :
    const ShadowModal = require('shadow-modal').default; */
module.exports = require('./ShadowModal').default;