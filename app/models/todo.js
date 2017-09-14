var connection = require ('../config/database');

function Todo() {
    this.find = function(res) {
        connection.acquire(function(err,con) {
            con.query('SELECT * FROM todo', function(err,result) {
                con.release();
                res.send(result);
                console.log("Get successful");
            });
        });
    };

    this.findById = function(id,res) {
        connection.acquire(function(err,con) {
            con.query('select * from todo where index_no = ?', id, function(err,result) {
                con.release();
                res.send(result);
                console.log("Get by ID successful");
            });
        });
    };

    this.save = function(todo,res) {
        connection.acquire(function(err,con) {
            con.query('insert into todo set ?', todo, function(err,result) {
                con.release();
                if (err) {
                    res.send({status:1, message:'TODO creation fail'});
                } else {
                    res.send({status:0, message:'TODO create success'});
                    console.log("Post successful");
                }
            });
        });
    };

    this.update = function(todo,id,res) {
        connection.acquire(function(err,con) {
            con.query('update todo set task = ? where index_no = ?', [todo, id], function(err,result) {
                con.release();
                if (err) {
                    res.send({status:1, message:'TODO update fail'});
                } else {
                    res.send({status:0, message:'TODO update success'});
                    console.log("Put successful");
                }
            });
        });
    };
    this.delete = function(id,res) {
        connection.acquire(function(err,con) {
            con.query('delete from todo where index_no = ?', id, function(err,result) {
                con.release();
                if (err) {
                    res.send({status:1, message:'TODO delete fail'});
                } else {
                    res.send({status:0, message:'TODO delete success'});
                    console.log("Delete successful");
                }
            });
        });
    };
};

module.exports = new Todo();
