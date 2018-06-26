/**
 * SleepController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: function (req,res,next)
    {
      console.log("Create method we entered..");
      
      var params=req.allParams();
      console.log('params',params);
      Sleep.create(params,function( err, sleep )
      {
          if(err)
          {
              return next(err);
              console.log("Error occured in the create method");
          }
          res.status(201);
          res.json(sleep);
          console.log('Sleep create ',sleep);
          
      });
    },
    

};
/*
var createdUser = await User.create({name:'Finn'}).fetch();

sails.log('Finn\'s id is:', createdUser.id);
return res.json(createdUser);
*/
