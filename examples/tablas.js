function frec_table(q, j, sector, num_sub) {
    let columnas = q * j * sector;
    let filas = Math.ceil(num_sub / columnas);

    let th = "";
    const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

    for (let b = 0; b < sector; b++) {

        for (let c = 1; c <= j; c++) {
                
            th += `<th>` + c + alphabet[b] +`</th>`;
            
                
        }            
            
    }
    //console.log(th);


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

    //console.log(body);






}

frec_table(1, 4, 3, 124);

//<tr><td>1</td><td>2</td><td>3</td></tr>  <tr><td>4</td><td>5</td><td>6</td></tr> <tr><td>7</td><td>8</td><td>9</td></tr>