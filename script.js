function drawGraph() {
    // Obtener el lienzo y el contexto
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    
    // Ajustar dimensiones del canvas
    canvas.width = 400;
    canvas.height = 400;
    
    // Limpiar el lienzo
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Obtener la ecuación
    const equation = document.getElementById('equation').value;
    const regex = /^y\s*=\s*([\-\+]?\d*)x\s*([\-\+]\s*\d+)?$/;
    const match = equation.match(regex);

    if (!match) {
        alert("Por favor ingresa una ecuación válida (ej. y = x + 2)");
        return;
    }

    // Obtener pendiente (m) e intersección (b)
    const m = parseFloat(match[1]) || 1;
    const b = parseFloat(match[2]?.replace(/\s+/g, '') || 0);

    // Dibujar el eje de coordenadas
    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = 2;

    // Eje X
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    
    // Eje Y
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    // Dibujar números en los ejes
    ctx.fillStyle = "#000";
    ctx.font = "12px Arial";
    
    for (let i = -10; i <= 10; i++) {
        const x = canvas.width / 2 + i * 20;
        const y = canvas.height / 2 - i * 20;

        // Números en el eje X
        ctx.fillText(i, x - 5, canvas.height / 2 + 15);
        ctx.beginPath();
        ctx.moveTo(x, canvas.height / 2 - 5);
        ctx.lineTo(x, canvas.height / 2 + 5);
        ctx.stroke();

        // Números en el eje Y
        if (i !== 0) {
            ctx.fillText(-i, canvas.width / 2 + 5, y + 3);
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 - 5, y);
            ctx.lineTo(canvas.width / 2 + 5, y);
            ctx.stroke();
        }
    }

    // Dibujar la función lineal
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 3;

    // Calcular los puntos para dibujar la línea de la función
    const x1 = -canvas.width / 2;
    const y1 = m * x1 + b;
    const x2 = canvas.width / 2;
    const y2 = m * x2 + b;

    const screenX1 = 0;
    const screenY1 = canvas.height / 2 - (m * (-canvas.width / 2) + b * 20);
    const screenX2 = canvas.width;
    const screenY2 = canvas.height / 2 - (m * (canvas.width / 2) + b * 20);

    ctx.beginPath();
    ctx.moveTo(screenX1, screenY1);
    ctx.lineTo(screenX2, screenY2);
    ctx.stroke();
}
