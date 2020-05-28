function volver() {
    var html = `<div class="wrap">
 <form action="" class="formulario" name="formulario_registro" method="get">
     <div>
         
         <input type="submit" id="btn-Agregar" onclick="agregarBoton()" value="Agregar">
         <input type="submit" id="btn-Editar" onclick="buscador()" value="Editar/Eliminar">
         <input type="submit" id="btn-Mostrar" onclick="mostrarBoton()" value="Mostrar">
     </div>
 </form>
</div>`;
 document.getElementById("contenedor-formulario").innerHTML = html
}
function buscador() {
    var html = `
    <center>
    <input type="text" id="buscarElemento" placeholder="buscar elemento" placeholder="id">
        <button type="submit" id="btn-Editar" onclick="buscadorP("editar")" style="color: blue">Editar</button>
        <button type="submit" id="btn-Eliminar" onclick="buscadorP("eliminar")" style="color: blue">Eliminar</button>
        <br>
         <input id="btn-submit" onclick="volver()" type="submit" value="Volver">	
    </center>
    `;
    document.getElementById("contenedor-formulario").innerHTML = html
}
function buscarExistencia() {
    
}
function buscadorP(params) {

    if(!(contarUsuarios() == 0)){

        if(params == "eliminar"){
            
            alert("Se ha eliminado correctamente")
        }else{
            alert("Se editará correctamente")
        }
    }else{
        alert("no hay usuarios")
        volver()
    }
    
}
function buscadorUsuario(correo) {
        var usuario
        var contador = 0;
        var index = true;
        while(index){
            try {
                usuario = JSON.parse(localStorage.getItem(`usuario${contador}`))
                contador++
                if(usuario.correo == correo){
                    return contador;
                }
                
            } catch (error) {
                index = false
                return contador-1;
            }
            
        }
        
    
}