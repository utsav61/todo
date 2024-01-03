var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");

var app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:false}));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"todo"

});
con.connect();
app.get('/',function(req,res){
    var sq = "SELECT * FROM tbl WHERE status NOT IN ('Decline' , 'Complete')";

    con.query(sq,function(error,result,field){
        if(error)throw error;
        res.render('index',{result});

    })
});
app.post('/',function(req,res){
    var item = req.body.item;
    var iq = "insert into tbl (item) values('"+item+"')";
    con.query(iq,function(error,result,field){
        if(error)throw error;
        res.redirect('/');
    })
});

app.get('/delete/:id',function(req,res){
    var id = req.params.id;
    var dq = "delete from tbl where id="+id;
    con.query(dq,function(error,result,field){
        if(error)throw error;
        res.redirect('/');
    })
});
app.get('/update/:id',function(req,res){
    var id = req.params.id;
    var sq= "select * from tbl where id ="+id;
    con.query(sq,function(error,result,field){
        if(error)throw error;
        res.render('form',{result});
    })
});
app.post('/up/:id',function(req,res){
    var id=req.params.id;
    var item = req.body.item;
    var uq = "update tbl set item = '"+item+"' where id="+id;
    con.query(uq,function(error,result,field){
        if(error)throw error;
        res.redirect('/');
    })
})
app.get('/viewall',function(req,res){
    var sq = "select * from tbl";
    con.query(sq,function(error,result,field){
        if(error)throw error;
        res.render('viewall',{result});
    })
})
app.get('/decline/:id',function(req,res){
    var id = req.params.id;
    var uq="update tbl set status = 'Decline' where id ="+id;
    con.query(uq,function(error,result,field){
        if(error)throw error;
        res.redirect('/');
    })
})
app.get('/comtask/:id',function(req,res){
    var id = req.params.id;
    var uq="update tbl set status = 'Complete' where id ="+id;
    con.query(uq,function(error,result,field){
        if(error)throw error;
        res.redirect('/');
    })
})
app.get('/runtask/:id',function(req,res){
    var id = req.params.id;
    var uq="update tbl set status = 'Running' where id ="+id;
    con.query(uq,function(error,result,field){
        if(error)throw error;
        res.redirect('/');
    })
})
app.get('/pentask/:id',function(req,res){
    var id = req.params.id;
    var uq="update tbl set status = 'Pending' where id ="+id;
    con.query(uq,function(error,result,field){
        if(error)throw error;
        res.redirect('/');
    })
})
app.get('/decline',function(req,res){
    var sq = "select * from tbl where status= 'decline'";
    con.query(sq,function(error,result,field){
        if(error)throw error;
        res.render('decline',{result});
    })
})
app.get('/completetask',function(req,res){
    var sq = "select * from tbl where status= 'Complete'";
    con.query(sq,function(error,result,field){
        if(error)throw error;
        res.render('update',{result});
    })
})
app.get('/runningtask',function(req,res){
    var sq = "select * from tbl where status= 'running'";
    con.query(sq,function(error,result,field){
        if(error)throw error;
        res.render('running',{result});
    })
})
app.get('/pendingtask',function(req,res){
    var sq = "select * from tbl where status= 'pending'";
    con.query(sq,function(error,result,field){
        if(error)throw error;
        res.render('pending',{result});
    })
})
app.listen(3000);