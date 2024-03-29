function draw_grid(ctx, minor, major, stroke, fill) {
  minor = minor || 10;
  major = major || minor * 5;
  stroke = stroke || "#00FF00";
  fill = fill || "#009900";
  ctx.save();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.strokeStyle = stroke;
  ctx.fillStyle = fill;

  for (var x = 0; x < ctx.canvas.width; x += minor) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, ctx.canvas.height);
    ctx.lineWidth = x % major == 0 ? 0.5 : 0.25;
    ctx.stroke();
    if (x % major == 0) {
      ctx.fillText(x, x, 10);
    }
  }
  for (var y = 0; y < ctx.canvas.height; y += minor) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(ctx.canvas.width, y);
    ctx.lineWidth = y % major == 0 ? 0.5 : 0.25;
    ctx.stroke();
    if (y % major == 0) {
      ctx.fillText(y, 0, y + 10);
    }
  }
  ctx.restore();
}

function draw_ship(ctx, radius, options) {
  options = options || {};
  ctx.save();
  ctx.lineWidth = options.lineWidth || 2;
  ctx.strokeStyle = options.stroke || "white";
  ctx.fillStyle = options.fill || "black";
  let angle = (options.angle || 0.5 * Math.PI) / 2;
  let curve1 = options.curve1 || 0.25;
  let curve2 = options.curve2 || 0.75;

  if (options.thruster) {
    ctx.save();
    ctx.strokeStyle = "yellow";
    ctx.fillStyle = "red";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(
      (Math.cos(Math.PI + angle * 0.8) * radius) / 2,
      (Math.sin(Math.PI + angle * 0.8) * radius) / 2
    );
    ctx.quadraticCurveTo(
      -radius * 2,
      0,
      (Math.cos(Math.PI - angle * 0.8) * radius) / 2,
      (Math.sin(Math.PI - angle * 0.8) * radius) / 2
    );
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.quadraticCurveTo(
    Math.cos(angle) * radius * curve2,
    Math.sin(angle) * radius * curve2,
    Math.cos(Math.PI - angle) * radius,
    Math.sin(Math.PI - angle) * radius
  );
  ctx.quadraticCurveTo(
    -radius * curve1,
    0,
    Math.cos(Math.PI + angle) * radius,
    Math.sin(Math.PI + angle) * radius
  );
  ctx.quadraticCurveTo(
    Math.cos(-angle) * radius * curve2,
    Math.sin(-angle) * radius * curve2,
    radius,
    0
  );

  ctx.fill();
  ctx.stroke();
  if (options.guide) {
    ctx.fillStyle = "white";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(Math.cos(-angle) * radius, Math.sin(-angle) * radius);
    ctx.lineTo(0, 0);
    ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    ctx.moveTo(-radius, 0);
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(
      Math.cos(angle) * radius * curve2,
      Math.sin(angle) * radius * curve2,
      radius / 40,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.beginPath();
    ctx.arc(
      Math.cos(-angle) * radius * curve2,
      Math.sin(-angle) * radius * curve2,
      radius / 40,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.beginPath();
    ctx.arc(-radius * curve1, 0, radius / 40, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
  ctx.restore();
}

function draw_asteroid(ctx, radius, shape, options) {
  options = options || {};
  ctx.strokeStyle = options.stroke || "white";
  ctx.fillStyle = options.fill || "black";
  if (options.noise === undefined) {
    options.noise = 0.4;
  }
  ctx.save();
  ctx.beginPath();
  for (let i = 0; i < shape.length; i++) {
    ctx.rotate((2 * Math.PI) / shape.length);
    ctx.lineTo(radius + radius * options.noise * shape[i], 0);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  if (options.guide) {
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.lineWidth = 0.25;
    ctx.beginPath();
    ctx.arc(0, 0, radius * (1 + options.noise / 2), 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * (1 - options.noise / 2), 0, 2 * Math.PI);
    ctx.stroke();
  }
  ctx.restore();
}

function draw_projectile(ctx, radius, lifetime) {
  ctx.save();
  ctx.fillStyle = "rgb(100%, 100%, " + 100 * lifetime + "%)";
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
}
