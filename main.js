quick_draw_data_set['boligrafo', 'papel', 'botella', 'flor', 'pez', 'avión', 'rana']
time_counter=0;
timer_check="";
draw_sketch="";
answer_holder="";
score=0;

function preload(){
    classifier=ml5.imageClassifier('DoodleNet');
}

function updateCnvas(){
    fondo("blanco");
    random_number = math.floor((math.random()*quick_draw_data_set.length)+1);
console.log(quick_draw_data_set[random_number]);
sketch = quick_draw_data_set[random_number];
document.getElementById("sketch_name").innerHTML='dibujo a trazar:'+dibujo;

}
function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}
function draw() {
    check_sketch()
    if(draw_sketch==sketch)
    {
        answer_holder="set";
        score++;
        document.getElementById('score').innerHTML='puntuación:'+score;
    }
    // Establece el grosor del stroke (trazo) a 13.
    strokeWeight(13);
    // Establece el color del stroke (trazo) a negro
    stroke(0);
    // Si el mouse esta precionado, dibuja una linea entre la pocicion previa y la actual del mouse.
    if(mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }

}

function check_sketch(){
    time_counter++;
    document.getElementById('time').innerHTML='tiempo:'+time_counter;
    if(time_counter > 400)
    {
        time_counter = 0;
        timer_check = "completed" 
    }
    if(timer_check=="completed"|| answer_holder =="set")
    {
        timer_check="";
        answer_holder="";
        updateCnvas();
    }

}


function clearCanvas() {

    background("white");
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML = 'Etiqueta: ' + results[0].label;
    draw_sketch=results[0].label;
    document.getElementById('confidence ').innerHTML = 'Confianza: ' + Math.round(results[0].confidence * 100) + '%';

    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}



