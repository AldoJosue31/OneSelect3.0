let VT = document.getElementById('VT');
let GT = document.getElementById('GT');
let GV = document.getElementById('GV');
let numVT = 0;
let numGT = 0;
let numGV = 0;

bd.find({}, function(err, ordenes){
    numVT = 0;
    numGT = 0;
    numGV = 0;
    ordenes.forEach(element => {
        numVT = numVT + Number(element.total);
        numGT = numGT + Number(element.ganancia);
        numGV = numGT + numVT;
    });
    VT.innerHTML = numVT.toFixed(2);
    GT.innerHTML = numGT.toFixed(2);
    GV.innerHTML = numGV.toFixed(2);
    if (err) {
        console.error(err);
    }
});