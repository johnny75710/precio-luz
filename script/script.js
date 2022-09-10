
let zona = '';
zona = eligeZona();
cors = 'https://proxy.cors.sh/'
let url = cors + 'https://api.preciodelaluz.org/v1/prices/all?zone=' + zona;
fetch(url)
    .then(response => response.json())
    .then(data => mostrarData(data))
    .catch(error => console.log(error))

let hora = [];

const mostrarData = data => {
    guardaArray(data)
    masBarato();
    masCaro();
    bajoMedia();
    todo();
    media();
    actual();
}

function eligeZona() {
    return 'PCB'
}
function actual() {
    let fecha = new Date();
    fecha = fecha.getHours();
    for (i = 0; i < hora.length; i++) {
        if (hora[i].hora == fecha) {
            valor = hora[i].precio
            pintaCirculo(valor, circle1)
        }
    }
    document.getElementById('actual').innerHTML = `${fecha}:00`;

}
function todo() {
    console.log('Todas las horas')
    console.log('-----------------')
    for (i = 0; i < hora.length; i++) {
        console.log(`Hora: ${hora[i].hora}-${hora[i].precio} €/kWh \n`)
    }
    console.log('\n')
}
function bajoMedia() {
    console.log('Horas más asequibles')
    console.log('--------------------')
    for (i = 0; i < hora.length; i++) {
        if (hora[i]._bajoMedia) {
            console.log(`Hora: ${hora[i].hora}-${hora[i].precio} €/kWh \n`)
        }
    }
    console.log('\n')
}
function masBarato() {
    let masPequeno = hora[0].precio
    for (i = 0; i < hora.length; i++) {
        if (hora[i].precio < masPequeno) {
            masPequeno = hora[i].precio;
            t = i;
        }
    }
    document.getElementById('cheap').innerHTML = `${hora[t].hora}:00`;
    let valor = hora[t].precio
    pintaCirculo(valor, circle2)

}

function masCaro() {
    let masGrande = hora[0].precio
    for (i = 0; i < hora.length; i++) {
        if (hora[i].precio > masGrande) {
            masGrande = hora[i].precio;
            t = i;
        }
    }
    valor = hora[t].precio
    pintaCirculo(valor, circle3)
    document.getElementById('exp').innerHTML = `${hora[t].hora}:00`;
}

function media() {
    let precio = 0;
    for (i = 0; i < hora.length; i++) {
        precio = precio + hora[i].precio
    }
    precio = precio / 24;
    console.log(`Media: ${precio.toFixed(3)}`)
}
function guardaArray(data) {

    for (let i = 0; i <= 23; i++) {
        num1 = i;
        num2 = i + 1;

        if (num1 <= 8) {
            let getObj = data[`0${num1}-0${num2}`]
            hazObjeto = new Hora(getObj.date, getObj.hour, getObj.price, getObj['is-under-avg']);
            hora[i] = hazObjeto;

        } else if (num1 <= 9) {
            getObj = data[`0${num1}-${num2}`]
            hora[i] = new Hora(getObj.date, getObj.hour, getObj.price, getObj['is-under-avg']);

        } else if (num1 <= 23) {
            getObj = data[`${num1}-${num2}`]
            hora[i] = new Hora(getObj.date, getObj.hour, getObj.price, getObj['is-under-avg']);
        }
    }
}

function calculaCirculo(valorMenor) {
    let masGrande = hora[0].precio
    for (i = 0; i < hora.length; i++) {
        if (hora[i].precio > masGrande) {
            masGrande = hora[i].precio;
            t = i;
        }
    }
    valorMayor = hora[t].precio;
    circulo = valorMenor / valorMayor
    return circulo;
}

function pintaCirculo(valor, clase) {
    var c1 = new ProgressBar.SemiCircle(clase, {
        strokeWidth: 5, //Grosor de progreso
        easing: 'easeInOut', //Animación
        duration: 1400, //Duración de la animación
        color: 'white', //Color de progreso
        trailColor: '#F17F29',
        trailWidth: 1.5,
        text: {
            value: `${valor} €/kWh`,
            style: {
                color: 'white',
                position: 'absolute',
                left: '50%',
                top: '50%',
                padding: 0,
                margin: '0 0 -1.5rem 0',
                // You can specify styles which will be browser prefixed
                transform: {
                    prefix: true,
                    value: 'translate(-50%, -50%)'
                }

            }
        }
    });

    c1.animate(calculaCirculo(valor))

}

