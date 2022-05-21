// Generacion 1G o 2G
let gen = "2G";

// Sectores
let sector = 3;

// Indice de reutilizacion
let q = 2;

// Valor n (relacion de proteccion)
let n = 2.8;

// Radio en km
let radio = 1;

// Validacion de J Rombico
let j = 7;

let condicion = true;
let i = 1;
let k = 0;

let limite = 0;
// Validar numero entero
if (Number.isInteger(j)) {
    // Validar J rombico
    do {
        let valor = Math.pow(i, 2) + Math.pow(k, 2) + i * k;

        if (valor === j) {
            console.log("J es rombico");
            condicion = false;
        } else if (valor < j) {
            k += 1;
        } else if (valor > j) {
            i += 1;
            k = 0;
        }

        if (limite === 100) {
            console.log("J No es rombico");
            condicion = false;
        }
        limite += 1;
    } while (condicion);
} else {
    console.log("Ingrese un Numero Entero");
}

// Distancia de reutilizacion
let d_reutilizacion = 0;
if (q <= 1) {
    console.log("No existe distanciade reutilizacion");
} else {
    d_reutilizacion = Math.sqrt(3 * j * Math.pow(radio, 2)).toFixed(2);
    console.log("Distancia de reutilizacion: " + d_reutilizacion + " km");
}

// Relacion de proteccion (variar entre 8 y 12) (red no viable < 8db)
if (n < 2.7 || n > 5) {
    console.log("Valor de n no valido");
} else {
    let divisor = 0;
    if (sector === 3) {
        divisor = 3;
    } else {
        divisor = 6;
    }
    let d_r = Math.sqrt(j * 3);
    let c_i = (1 / divisor) * Math.pow(d_r - 1, n);
    let db = (10 * Math.log10(c_i)).toFixed(2);
    if (db < 8) {
        console.log("Enlace No Viable");
    } else if (db > 12) {
        console.log(
            "Relacion de proteccion: " +
                db +
                " Enlace Viable pero desperdicia recursos"
        );
    } else {
        console.log("Relacion de proteccion: " + db + " Enlace Viable");
    }
}

// Area cluster en km2
let a_hex = ((Math.pow(radio, 2) * 3 * Math.sqrt(3)) / 2).toFixed(2);
let a_cluster = a_hex * j;
console.log("Area de cluster: " + a_cluster + " km2");

// Area total de red en km2
let a_red = (a_cluster * q).toFixed(2);
console.log("Area de red: " + a_red + " km2");

// Numero de subportadoras
let bw = 0;
let bws = 0;
let num_sub = 0;
if (gen === "1G") {
    bw = 10e6;
    bws = 30e3;
    num_sub = parseInt(bw / bws);
    console.log("Numero Subportadoras: " + num_sub);
} else if (gen === "2G") {
    bw = 15e6;
    bws = 200e3;
    num_sub = parseInt(bw / bws) - 1;
    console.log("Numero Subportadoras: " + num_sub);
}

// Numero de frecuencias por celdas
let frec_cel = parseInt(num_sub / j);
console.log("frecuencias por celdas: " + frec_cel);

// Numero de frecuencias por sector
let frec_sec = parseInt(frec_cel / sector);
console.log("frecuencias por sector: " + frec_sec);

// Canales por generacion 1G o 2G
if (gen === "1G") {
    // Total de canales 1G
    let ch_sector = frec_sec;
    let ch_celda = frec_sec * sector;
    let ch_cluster = ch_celda * j;
    let ch_area = ch_cluster * q;

    console.log("---------- 1G ------------------");
    console.log("Ch sector: " + ch_sector);
    console.log("Ch celda: " + ch_celda);
    console.log("Ch cluster: " + ch_cluster);
    console.log("Ch area: " + ch_area);
} else if (gen === "2G") {
    // Total de canales 2G
    let ch_sector = frec_sec * 8;
    let ch_celda = ch_sector * sector;
    let ch_cluster = ch_celda * j;
    let ch_area = ch_cluster * q;

    console.log("---------- 2G ------------------");
    console.log("Ch sector: " + ch_sector);
    console.log("Ch celda: " + ch_celda);
    console.log("Ch cluster: " + ch_cluster);
    console.log("Ch area: " + ch_area);
}

// Cantidad de columnas en la tabla
let columnas = q * j * sector;
console.log("Cantidad de columnas en la tabla: " + columnas);
// Cantidad de filas en la tabla
let filas = Math.ceil(num_sub / columnas);
console.log("Cantidad de filas en la tabla: " + filas);
