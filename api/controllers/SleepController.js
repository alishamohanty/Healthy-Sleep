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
      Sleep.create( params ,function( err, result )
      {
          if(err)
          {
              return next(err);
              console.log("Error occured in the create method");
          }
          console.log('Sleep create ',result);
        res.status(201);
        return res.json(params);
          
          
      });
    },
    find: function (req,res,next)
    {
      console.log("We entered inside find method");
      var id=req.param('id');
      
      if(id)
      {
          Sleep.findOne(id,function (err,sleep)
          {
            if(sleep === undefined)
            {
                res.notFound();
            }   
            if(err)
            {
                next(err);
            }
            return res.json(sleep);
            console.log('Inside findone method',sleep);
          });      
      }
       else
       {
           var where=req.param('where');

           if(_.isString(where))
           {
               where=JSON.parse(where);
           }
           var options=
           {
              limit: req.param('limit') || undefined ,
              skip: req.param('skip') || undefined,
              sort: req.param('sort') || undefined,
              where: where || undefined
           };
           console.log('This is the options ', options);
           Sleep.find(options, function(err, sleep)
           {
             if(sleep === undefined)
             {
                 res.notFound();
                 console.log('We are in find methods error function');
                 
             }  
             if(err)
             {
                 return next(err);
             }
            return res.json(sleep);

           });
        }
             function isShortcut(id)
             {
               if(id === 'find' || id === 'update' || id === 'create' || id === 'destroy') 
               {
                   return true;
               }  
             }
       },    
   
    update: function(req,res,next) 
    {
        var criteria = {};
        criteria = _.merge({}, req.allParams(),req.body);

        var id= req.param('id');
        if(!id)
        {
            console.log('No id provided');
            return res.badRequest('No id provided');
        }
        Sleep.update(id, criteria, function(err, sleep)
        {
        //   if(sleep.length === 0)
        //   return res.notFound();
          console.log('criteria',criteria);
          console.log('sleep',sleep);
          
          if(err)
          return next(err);
          return res.json(sleep);   
        });
    
    },
    destroy: function (req,res,next)
    {
        var id=req.param('id');
        if(!id)
         {
             return res.badRequest('No id provided');
         }        
        Sleep.findOne(id,function (err,result)
        {
           if(err)
           {
               return res.serverError();
           } 
           if(!result)
           {
               return res.notFound();
           }
           Sleep.destroy(id, function (err)
           {
             console.log('Deleted',result);
             if(err)
             {
                 return next(err);
             }   
             
           });
           return res.json(result);

        });
    }

  
    

};
/*
var createdUser = await User.create({name:'Finn'}).fetch();

sails.log('Finn\'s id is:', createdUser.id);
return res.json(createdUser);
*/
