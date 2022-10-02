let VT = document.getElementById('VT');
let totalC = 0;

bd.find({}, function(err, ordenes){
    ordenes.forEach(element => {
        totalC = 0;
        totalC = totalC + Number(element.total);
    });

    VT.innerHTML = totalC;
    if (err) {
        console.error(err);
        process.exit(0);
    }
});