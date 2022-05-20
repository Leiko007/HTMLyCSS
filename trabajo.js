Inicio situacion profesional 2

    Variable varDificultad tipo alfanumerica
    Variable puntosTotales tipo numerico
    Variable cantidadJugadas tipo numerico
    Variable F = 2
    Variable codDificultad tipo numerico
    Variable codCopa tipo numerico
    Variable codCampo tipo numerico
    Variable codCod tipo numerico
    Variable claveMov tipo numerico
    

    Inicio interfaz grafica frmDificultad, "Dificultad"
        Marco mrcDificultad
            Etiqueta lblDificultad "Seleccione una dificultad"
            lista despegable lstopdificultad
                opciones=["Normal", "Lluvia", "Viento", "Maremoto", "Nieve", "Tornado"]
        Fin marco mrcDificultad
        boton de comando btosiguiente "Siguiente"
    Fin interfaz grafica


    Procedimiento cargarGrilla 

        Grl juego [1][1] <- "Nombre"
        Grl juego [1][2] <- "Fecha"
        Grl juego [1][3] <- "Puntos"
        Grl juego [1][4] <- "Campeonato"
        Grl juego [1][5] <- "Campo Juego"

        varDificultad <- lstopdificultad
        Abrir AD DIFICULTAD
        Leer AD DIFICULTAD
        Mientras AD DIFICULTAD se <> EOF
            Si AD DIFICULTAD.detalle == varDificultad
                codDificultad <- AD DIFICULTAD.clave
                Abrir AD COR 
                Leer AD COR 
                Mientras AD COR se <> EOF
                    Si AD COR.Dificultad == codDificultad
                        codCopa <- AD COR.copa 
                        Abrir AD CAMPEONATO
                        Leer AD CAMPEONATO
                        Mientras AD CAMPEONATO se <> EOF
                            Si codCopa == AD CAMPEONATO.cod 
                                Grl juego [F][4] <-- AD CAMPEONATO.detalle
                                F = F + 1
                            Fin Si
                        Fin Mientras
                        Cerrar AD CAMPEONATO
                    Fin Si
                    Leer AD COR
                Fin Mientras
                F = 2
                Mientras AD COR se <> EOF
                    Si AD COR.Dificultad == codDificultad
                        codCampo <- AD COR.campo 
                        Abrir AD CAMPO
                        Leer AD CAMPO
                        Mientras AD CAMPO se <> EOF
                            Si codCampo == AD CAMPO.cod 
                                Grl juego [F][5] <-- AD CAMPO.detalle
                                F = F + 1
                            Fin Si
                        Fin Mientras
                        Cerrar AD CAMPO
                    Fin Si
                    Leer AD COR
                Fin Mientras
                F = 2
                Mientras AD COR se <> EOF
                    Si AD COR.Dificultad == codDificultad
                        codCod <- AD COR.cod 
                        Abrir AD MOV
                        Leer AD MOV
                        Mientras AD MOV se <> EOF
                            Si codCod == AD MOV.cod 
                                Grl juego [F][2] <-- AD MOV.fecha
                                Grl juego [F][3] <-- AD MOV.puntos
                            Fin Si
                            puntosTotales = puntosTotales + AD MOV.puntos
                            cantidadJugadas = cantidadJugadas + 1
                            claveMov <- AD MOV.clave
                            Abrir AD CLAVE 
                            Leer AD CLAVE
                            Mientras AD CLAVE se <> EOF
                                Si claveMov == AD CLAVE.clave
                                    Grl juego [F][1] <-- AD CLAVE.nombre
                                    F = F + 1
                                Fin Si
                            Fin Mientras
                            Cerrar AD CLAVE
                            Leer AD MOV
                        Fin Mientras
                        Cerrar AD MOV
                    Fin Si
                    Leer AD COR
                Fin Mientras
                Cerrar AD COR
            Fin Si   
        Fin Mientras
        Cerrar AD DIFICULTAD
        Etiqueta lbl puntosTotales <- puntosTotales
        Etiqueta lbl cantidadJugadas <- cantidadJugadas

    Fin Procedimiento

   Inicio Procedimiento boton de comando btosiguiente = "Click"
        procedimiento cargarGrilla
    Fin Procedimiento
    
Fin