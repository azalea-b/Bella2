let font;
let fontPoints = [];
let stars = [];
let libraPoints = [];
let rosePoints = [];
let heartPoints = [];

function preload() {
  font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight - 60);
  noStroke();

  // Estrelas de fundo animadas
  for (let i = 0; i < 300; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      alpha: random(100, 255),
      speed: random(0.01, 0.05),
      phase: random(TWO_PI)
    });
  }

  // Nome "Isabela" com menos pontos
  fontPoints = font.textToPoints("Isabela", width / 2 - 250, height / 2 + 50, 150, {
    sampleFactor: 0.1, // Menos pontos
    simplifyThreshold: 0
  });

  // Constelação de Libra - posição restaurada
  let centerX = width / 2;
  let centerY = height / 2 - 120; // Restaurado para posição original
  let scale = 1.5;

  libraPoints = [
    { x: centerX - 60 * scale, y: centerY - 30 * scale },
    { x: centerX - 30 * scale, y: centerY - 50 * scale },
    { x: centerX, y: centerY - 30 * scale },
    { x: centerX + 30 * scale, y: centerY - 60 * scale },
    { x: centerX + 60 * scale, y: centerY - 20 * scale },
    { x: centerX + 40 * scale, y: centerY + 10 * scale },
    { x: centerX + 20 * scale, y: centerY - 10 * scale }
  ];

  // Desenhando a rosa (com caule e folha)
  rosePoints = generateRoseWithStem(centerX - 100, centerY + 200);

  // Desenhando o coração (ajustando para garantir que apareça corretamente)
  heartPoints = generateHeart(centerX + 120, centerY + 200);
}

function draw() {
  background(0);

  // Fundo animado com estrelas pulsando
  for (let s of stars) {
    let pulse = sin(frameCount * s.speed + s.phase) * 50;
    fill(255, s.alpha + pulse);
    ellipse(s.x, s.y, s.size);
  }

  // 🔷 Constelação de Libra (sem preenchimento)
  stroke(255); // Branco para constelação
  noFill();
  beginShape();
  for (let pt of libraPoints) {
    ellipse(pt.x, pt.y, 4 + sin(frameCount * 0.1 + pt.x * 0.01) * 2); // brilho pulsante
    vertex(pt.x, pt.y);
  }
  endShape();

  // 🌹 Desenho da Rosa (com caule e folha, tudo em branco)
  drawRose(rosePoints);

  // ❤️ Desenho do Coração (agora deve aparecer corretamente, tudo em branco)
  drawHeart(heartPoints);

  // ✨ Isabela como constelação
  for (let i = 0; i < fontPoints.length; i++) {
    let pt = fontPoints[i];
    let brightness = 200 + sin(frameCount * 0.05 + i) * 55;
    fill(255, brightness);
    ellipse(pt.x, pt.y, 4);
  }

  stroke(255, 70);
  noFill();
  beginShape();
  for (let i = 0; i < fontPoints.length; i += 5) {
    vertex(fontPoints[i].x, fontPoints[i].y);
  }
  endShape();
}

// Função para gerar pontos para uma rosa com caule e folha
function generateRoseWithStem(x, y) {
  let points = [];
  // Petalas da rosa
  for (let i = 0; i < 12; i++) { // Menos pontos para a rosa
    let angle = map(i, 0, 12, 0, TWO_PI);
    let radius = 20 + sin(i * 4) * 5; // Ajustando o tamanho
    let px = x + radius * cos(angle);
    let py = y + radius * sin(angle);
    points.push({ x: px, y: py });
  }
  
  // Caule da rosa
  points.push({ x: x, y: y + 50 }); // Ponto do caule

  // Folha da rosa (sutil, do lado do caule)
  points.push({ x: x - 30, y: y + 70 });
  points.push({ x: x + 30, y: y + 70 });

  return points;
}

// Função para desenhar a rosa com caule e folha
function drawRose(points) {
  stroke(255); // Branco para as pétalas e caule
  strokeWeight(1);
  noFill();
  
  // Desenhando as petalas
  beginShape();
  for (let i = 0; i < 12; i++) {
    vertex(points[i].x, points[i].y);
  }
  endShape();
  
  // Desenhando o caule
  stroke(255); // Branco para o caule também
  line(points[12].x, points[12].y, points[13].x, points[13].y); // Caule
  line(points[12].x, points[12].y, points[14].x, points[14].y); // Folha à direita
  line(points[12].x, points[12].y, points[14].x, points[14].y); // Folha à esquerda
}

// Função para gerar pontos para um coração
function generateHeart(x, y) {
  let points = [];
  for (let t = 0; t < 1; t += 0.05) { // Menos pontos para o coração
    let px = 16 * sin(t) ** 3;
    let py = 13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t);
    points.push({ x: x + px * 15, y: y - py * 15 }); // Ajustando o tamanho
  }
  return points;
}

// Função para desenhar o coração
function drawHeart(points) {
  stroke(255); // Branco para o coração
  strokeWeight(2); // Aumentando um pouco o peso da linha
  noFill();
  beginShape();
  for (let pt of points) {
    vertex(pt.x, pt.y);
  }
  endShape();
}

// Interação com o mouse (nova estrela ao clicar)
function mousePressed() {
  stars.push({
    x: mouseX,
    y: mouseY,
    size: random(1, 5),
    alpha: random(150, 255),
    speed: random(0.01, 0.05),
    phase: random(TWO_PI)
  });
}
