const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"libreria_crud"
});

app.post ("/create",(req,res)=>{
    const titulo = req.body.titulo;
    const autor = req.body.autor;
    const genero = req.body.genero;
    const precio = req.body.precio;

    db.query('INSERT INTO libros(titulo,autor,genero,precio) VALUES(?,?,?,?)',[titulo,autor,genero,precio],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.get("/libros",(req,res)=>{
    db.query('SELECT * FROM libros' ,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.put("/update",(req,res)=>{
    const id = req.body.id;
    const titulo = req.body.titulo;
    const autor = req.body.autor;
    const genero = req.body.genero;
    const precio = req.body.precio;

    db.query('UPDATE libros SET titulo=?,autor=?,genero=?,precio=? WHERE id=?',[titulo,autor,genero,precio,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;

    db.query('DELETE FROM libros WHERE id=?',id,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});


app.listen(3001, ()=>{
    console.log("Corriendo en el puerto 3001 ")
})