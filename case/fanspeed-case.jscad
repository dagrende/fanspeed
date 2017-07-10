function main() {
  var
    h = 15,
    w = 28,
    depth = 5,
    thick = 1
    boardGuideH = 1,
    boardY = 7,
    boardThick = 0.4,
    dcJackW = 8,
    dcJackH = 5.2,
    fanConnW = 13,
    fanConnH = 3.1,
    fanConnXCenter = 10.1,
    fanConnYCenter = 3,
    fanTabW = 5.7,
    fanTabH = 1,
    fanConnEdgeBetween = 6.35,
    fanConnEdgeW = 1.26,
    fanConnEdgeH = 1.5,
    usbJackW = 80,
    usbJackH = 3,
    usbJackZ = 16.1,
    usbJackY = boardY + 4,
    boardGuide = cube().scale([boardGuideH, boardGuideH, depth]).union(cube().scale([boardGuideH, boardGuideH, depth]).translate([0, boardGuideH + boardThick + 0.2 + 0.25, 0])),
    fanConn = cube().scale([13, 3.1, 10])
      .union(cube().scale([fanTabW, fanTabH, 10]).translate([(fanConnW - fanTabW) / 2, -fanTabH, 0]))
      .union(cube().scale([fanConnEdgeW, fanConnEdgeH, 10]).translate([(fanConnW + fanConnEdgeBetween) / 2, fanConnH, 0]))
      .union(cube().scale([fanConnEdgeW, fanConnEdgeH, 10]).translate([(fanConnW - fanConnEdgeBetween) / 2 - fanConnEdgeW, fanConnH, 0]));
  return cube().scale([w + 2 * thick, h + 2 * thick, depth + thick]).translate([-1, -1, -1])
    .subtract(cube().scale([w, h, depth]))
    // board guide
    .union(boardGuide.translate([0, boardY, 0]).union(boardGuide.translate([0, boardY- boardGuideH, 0]).translate([w - boardGuideH, 0, 0])))
    // encoder axis hole
    .subtract(cylinder({r: 3, h: 10}).rotateX(-90).translate([10.3 + 11.78 / 2, -thick, 25]))
    // dc jack hole
    .subtract(cube().scale([dcJackW, dcJackH, 3]).translate([17.4, boardY + boardThick, -thick]))
    // fan connector hole
    .subtract(fanConn.translate([fanConnXCenter - fanConnW / 2, boardY + fanConnYCenter / 2, -thick]))
    // usb connector hole
    .subtract(cube().scale([usbJackW, usbJackH, 10]).rotateY(-90).translate([w + thick, usbJackY, usbJackZ]))
    .setColor([0.98, 0.95, 0.90])
}
