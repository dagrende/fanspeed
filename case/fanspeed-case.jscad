function main() {
  var
    h = 15,
    w = 28,
    depth = 25,
    thick = 1
    boardGuideH = 1,
    boardY = 7,
    boardThick = 0.4,
    dcJackW = 8.25,
    dcJackH = 5.4,
    fanConnW = 13,
    fanConnH = 3.2,
    fanConnXCenter = 10.1,
    fanConnYCenter = 3.1,
    fanTabW = 5.7,
    fanTabH = 1,
    fanConnEdgeBetween = 6.35,
    fanConnEdgeW = 1.26,
    fanConnEdgeH = 1.5,
    usbJackW = 80,
    usbJackH = 3,
    usbJackX = 17.4,
    usbJackY = boardY + 4,
    usbJackZ = 16.1,
    encoderAxisX = 12.53 + 6.72 / 2,
    encoderAxisDiam = 7,
    boardGuide = cube().scale([boardGuideH, boardGuideH, depth]).translate([0, -boardGuideH - 0.5, 0])
      .union(cube().scale([boardGuideH, boardGuideH, depth]).translate([0, boardThick + 0.5, 0])),
    fanConn = cube().scale([13, 3.1, 10])
      .union(cube().scale([fanTabW, fanTabH, 10]).translate([(fanConnW - fanTabW) / 2, -fanTabH, 0]))
      .union(cube().scale([fanConnEdgeW, fanConnEdgeH, 10]).translate([(fanConnW + fanConnEdgeBetween) / 2, fanConnH, 0]))
      .union(cube().scale([fanConnEdgeW, fanConnEdgeH, 10]).translate([(fanConnW - fanConnEdgeBetween) / 2 - fanConnEdgeW, fanConnH, 0]));
  return cube().scale([w + 2 * thick, h + 2 * thick, depth + thick]).translate([-1, -1, -1])
    .subtract(cube().scale([w, h, depth]))
    // board guide
    .union(boardGuide.translate([0, boardY, 0]).union(boardGuide.translate([0, boardY, 0]).translate([w - boardGuideH, 0, 0])))
    // encoder axis hole
    .subtract(cylinder({r: encoderAxisDiam / 2, h: 10}).rotateX(-90).translate([encoderAxisX, -thick, 25]))
    // dc jack hole
    .subtract(cube().scale([dcJackW, dcJackH, 3]).translate([usbJackX, boardY + boardThick + 0.3, -thick]))
    // fan connector hole
    .subtract(fanConn.translate([fanConnXCenter - fanConnW / 2, boardY + boardThick + fanConnYCenter - fanConnH / 2 + boardThick, -thick]))
    // usb connector hole
    .subtract(cube().scale([usbJackW, usbJackH, 10]).rotateY(-90).translate([w + thick, usbJackY, usbJackZ]))
    .setColor([0.98, 0.95, 0.90])
}
