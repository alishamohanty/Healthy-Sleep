/**
 * Sleep.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    
  hours_slept:{
    type:'number',
    required:true
  },
  sleep_quality:{
    type:'string',
    required:true
  }
  
},

};

