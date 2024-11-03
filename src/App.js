import './App.css';
import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2'


function App() {

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [precio, setPrecio] = useState(0);
  const [id, setId] = useState(0);



  const [editar, setEditar] = useState(false);

  const [librosList, setLibros] = useState([]);


  const add = () => {
    Axios.post("http://localhost:3001/create", {
      titulo: titulo,
      autor: autor,
      genero: genero,
      precio: precio,
    }).then(() => {
      getLibros();
      limpiarCampos();
      Swal.fire({
        title: "<strong>REGISTRO EXITOSO</strong>",
        html: "<i>El libro <strong> "+titulo+" </strong> se registro de manera exitosa!</i>",
        icon:'success',
        timer: 4000
      })
    });
  }

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id:id,
      titulo: titulo,
      autor: autor,
      genero: genero,
      precio: precio,
    }).then(() => {
      getLibros();
      limpiarCampos();
      Swal.fire({
        title: "<strong>ACTUALIZACIÓN EXITOSO</strong>",
        html: "<i>El libro <strong> "+titulo+" </strong> se actulizo de manera exitosa!</i>",
        icon:'success',
        timer: 4000
      })
    });
  }

  const deleteLib = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`,).then(() => {
      getLibros();
      limpiarCampos();
      Swal.fire({
        title: "<strong>ELIMINACION EXITOSA</strong>",
        html: "<i>El libro <strong> "+titulo+" </strong> se actulizo de manera exitosa!</i>",
        icon:'success',
        timer: 4000
      })
    });
  }

  const limpiarCampos = () => {
    setTitulo("");
    setAutor("");
    setGenero("");
    setPrecio("");
    setId("");
    setEditar(false);
  }

  const editarLibros = (val) =>{
    setEditar(true);

    setTitulo(val.titulo);
    setAutor(val.autor);
    setGenero(val.genero);
    setPrecio(val.precio);
    setId(val.id);

  }

  const getLibros = () => {
    Axios.get("http://localhost:3001/libros").then((response) => {
      setLibros(response.data);
    });
  }
  ///getLibros();

  return (
    <div className="container">

      <div className="card text-center">
        <div className="card-header">
          GESTION DE BIBLIOTECA
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Titulo: </span>
            <input type="text"
              onChange={(event) => {
                setTitulo(event.target.value);
              }}
              className="form-control" value={titulo} placeholder="Ingrese el titulo de libro" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Autor: </span>
            <input type="text" value={autor}
              onChange={(event) => {
                setAutor(event.target.value);
              }}
              className="form-control" placeholder="Ingrese el nombre del autor" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Genero: </span>
            <input type="text" value={genero}
              onChange={(event) => {
                setGenero(event.target.value);
              }}
              className="form-control" placeholder="Ingrese el genero de la obra" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Precio: </span>
            <input type="number" value={precio}
              onChange={(event) => {
                setPrecio(event.target.value);
              }}
              className="form-control" placeholder="Ingrese el precio en soles de la obra" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

        </div>
        <div className="card-footer text-muted">
          {
            editar? 
            <div>
            <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>  
            <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
            </div>
            :<button className='btn btn-success' onClick={add}>Registrar</button>
          }
         
        </div>
      </div>

      <table className="table table-success table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Titulo</th>
            <th scope="col">Autor</th>
            <th scope="col">Genero</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>

          {
            librosList.map((val,key) => {
              return <tr key={val.id}>
                <th>{val.id}</th>
                <td>{val.titulo} </td>
                <td>{val.autor} </td>
                <td>{val.genero} </td>
                <td>{val.precio} </td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" 
                    onClick={()=>{
                      editarLibros(val);
                    }}
                    className="btn btn-info">Editar</button>
                    <button type="button" onClick={()=>{
                      deleteLib(val.id);
                    }} class="btn btn-danger">Eliminar</button>
                  </div>
                </td>
              </tr>
            })
          }



        </tbody>
      </table>

    </div>
  );
}

export default App;
