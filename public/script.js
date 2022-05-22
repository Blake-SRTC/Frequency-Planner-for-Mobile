window.onload = () => {

const form = document.querySelector("form"),
    calcBtn = form.querySelector(".calcBtn");

calcBtn.addEventListener("click", () => {
    document.getElementById("results").reset();
    // Definicion de parametros iniciales
    let generation = document.getElementById("generation").value;
    let radius = document.getElementById("radius").value;
    let j = document.getElementById("j").value;
    let n = document.getElementById("n").value;
    let sector = document.getElementById("sector").value;
    let q = document.getElementById("q").value;

    let bw = document.getElementById("bw").value;
    let bws = document.getElementById("bws").value;

    // Ejecicion del programa principal

    let condicion = validar_j(Number(j));

    if (condicion === true) {
        let condicion_2 = viability(n, j, sector);
        if (condicion_2 === true) {
            d_reutilizacion(q, j, radius);
            let a_cluster = areaCluster(radius, j);
            areaRed(a_cluster, q);
            let num_sub = subcarriers(generation, bw, bws);
            let frec_cel = frec_celdas(num_sub, j);
            let frec_sec = frec_sector(frec_cel, sector);
            ch_gen(generation, frec_sec, j, sector, q);

            // Tabla
            frec_table(q, j, sector, num_sub);
        }
    }
    // Ejecicion del programa principal
});

// Validacion de J
function validar_j(j) {
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
                condicion = false;
                document.getElementById("j-validated").value = "True";
                return true;
            } else if (valor < j) {
                k += 1;
            } else if (valor > j) {
                i += 1;
                k = 0;
            }

            if (limite === 100) {
                condicion = false;
                document.getElementById("j-validated").value = "False";
                return false;
            }
            limite += 1;
        } while (condicion);
    } else {
        return alert("Ingrese un J Numero Entero");
    }
}

// Distancia de reutilizacion
function d_reutilizacion(q, j, radio) {
    let dReutilizacion = 0;
    if (q <= 1) {
        document.getElementById("r-distance").value = "No existe";
    } else {
        dReutilizacion = Math.sqrt(3 * j * Math.pow(radio, 2)).toFixed(2);
        document.getElementById("r-distance").value = dReutilizacion + " Km";
    }
}

// Relacion de proteccion viabilidad
function viability(n, j, sector) {
    if (n < 2.7 || n > 5) {
        document.getElementById("viability").value = "n No valido";
        return false;
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
            document.getElementById("viability").value = db + " No Viable";
            return false;
        } else if (db > 12) {
            document.getElementById("viability").value = db + " No Eficiente";
            return true;
        } else {
            document.getElementById("viability").value = db + " db Viable";
            return true;
        }
    }
}

// Area cluster en km2
function areaCluster(radio, j) {
    let a_hex = (Math.pow(radio, 2) * 3 * Math.sqrt(3)) / 2;
    let a_cluster = (a_hex * j).toFixed(2);
    document.getElementById("a-cluster").value = a_cluster + " km2";
    return a_cluster;
}

// Area red km2
function areaRed(a_cluster, q) {
    let a_red = (a_cluster * q).toFixed(2);
    document.getElementById("a-red").value = a_red + " km2";
}

// Numero de subportadoras
function subcarriers(generation, bw, bws) {
    if (generation === "1G") {
        let num_sub = parseInt(bw / bws);
        document.getElementById("subcarriers").value = num_sub;
        return num_sub;
    } else if (generation === "2G") {
        let num_sub = parseInt(bw / bws) - 1;
        document.getElementById("subcarriers").value = num_sub;
        return num_sub;
    }
}

// Numero de frecuencias por celda
function frec_celdas(num_sub, j) {
    let frec_cel = parseInt(num_sub / j);
    document.getElementById("frec-cel").value = frec_cel;
    return frec_cel;
}

// Numero de frecuencias por sector
function frec_sector(frec_cel, sector) {
    let frec_sec = parseInt(frec_cel / sector);
    document.getElementById("frec-sec").value = frec_sec;
    return frec_sec;
}

// Numero de canales por generacion
function ch_gen(generation, frec_sec, j, sector, q) {
    if (generation === "1G") {
        let ch_sector = frec_sec;
        let ch_celda = frec_sec * sector;
        let ch_cluster = ch_celda * j;
        let ch_area = ch_cluster * q;

        document.getElementById("ch-sec").value = ch_sector;
        document.getElementById("ch-cel").value = ch_celda;
        document.getElementById("ch-clus").value = ch_cluster;
        document.getElementById("ch-area").value = ch_area;
    } else if (generation === "2G") {
        let ch_sector = frec_sec * 8;
        let ch_celda = ch_sector * sector;
        let ch_cluster = ch_celda * j;
        let ch_area = ch_cluster * q;

        document.getElementById("ch-sec").value = ch_sector;
        document.getElementById("ch-cel").value = ch_celda;
        document.getElementById("ch-clus").value = ch_cluster;
        document.getElementById("ch-area").value = ch_area;
    }
}

function frec_table(q, j, sector, num_sub) {
    let columnas = j * sector;
    let filas = Math.ceil(num_sub / columnas);
    
    // Headers de tabla
    let th = "";
    const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

    for (let b = 0; b < sector; b++) {
        for (let c = 1; c <= j; c++) { 
            th += `<th>` + c + alphabet[b] +`</th>`;     
        }                
    }
    document.getElementById("header").innerHTML = th;

    // Datos de tabla
    let body = "";
    let indice = 1;
    for (let a = 0; a < filas; a++) {
        
        body += `<tr>`;
        for (let b = 0; b < columnas; b++) {
            if (indice <= num_sub) {
                body += `<td>` + indice + `</td>`;
                indice++; 
            }else {
                body += `<td>` + `-` + `</td>`;
            }     
        }
        body += `</tr>`;
    }
    document.getElementById("body").innerHTML = body;
    
}

}