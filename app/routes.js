var todo = require('./models/todo');

module.exports = function (app) {

            // --------------------api---------------------------
            app.get('/api/todos',function(req,res) {
                todo.find(res);
            });
            app.get('/api/todos/:id',function(req,res) {
                todo.findById(req.params.id,res);
            });
            app.post('/api/todos',function(req,res) {
                todo.save(req.body,res);
            });
            app.put('/api/todos',function(req,res) {
                todo.update(req.body.task,req.body.index_no,res);
            });
            app.delete('/api/todos/:id',function(req,res) {
                todo.delete(req.params.id,res);
            });

        // application -------------------------------------------------------------
        //  app.get('*', function (req, res) {
        //     res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
        //  });


// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------


};
