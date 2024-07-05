const daily = document.querySelector('#Daily-set')
const weekly = document.querySelector('#Weekly-set')
const monthly = document.querySelector('#Monthly-set')

const selectores = document.querySelectorAll('.user-card_menu_select')


//establece la clase activo a cada uno. 
selectores.forEach(selector =>{
    selector.addEventListener('click',()=>{
        
        seleccion(selector);
        console.log(`se selecciono ${selector.getAttribute('id')}`)

    })
})

//para seleccionar entre dia, semana y mes 
function seleccion (tabSeleccionado){
    selectores.forEach(selector =>{
        selector.classList.remove('activo')
    })
    tabSeleccionado.classList.add('activo')

}


//mostrar info segun el time frame
daily.addEventListener('click',()=>{
    elejir('daily');
    console.log('se muestran los resultados de daily')
})

monthly.addEventListener('click',()=>{
    elejir('monthly');
    console.log('se muestran los resultados de monthly')
})

weekly.addEventListener('click',()=>{
    elejir('weekly');
    console.log('se muestran los resultados de weekly')
})

//se toma daily por default
elejir('daily')









function elejir (intervalo){
    
    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
            const datosCard= data  
    
            const card = document.querySelector('[data-ul]')
            card.innerHTML=''
            datosCard.forEach (elemento=>{
                
                const timeframe = elemento.timeframes[intervalo];
                const contenido = `
                <div class="topic-card" style="background-color:${elemento.color};background-image:${elemento.img}">
                    <div class=" topic-card__info">
                        <div class="topic-card__info__set">
                            <p>${elemento.title}</p>
                                <p>${timeframe.current}hrs</p>
              
                            </div>
                        <div class="topic-card__info__hr" >
                        <img src="./images/icon-ellipsis.svg" alt="">
                        <p>Last Week - ${timeframe.previous}hrs</p>
                     </div>
                    </div>
                 </div>
                
                
                `
                
                card.innerHTML = card.innerHTML+contenido
                
            })
           
    })
    .catch(error => console.error('Error al cargar el JSON:', error));
}


