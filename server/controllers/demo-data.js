exports.filaments = [
  {
    "brand" : "HQA3D",
    "name" : "PLA+",
    "material" : "PLA",
    "color" : "White",
    "cost" : 26.99,
    "size" : 1.75,
    "printTemp" : [
        200,
        220
    ],
    "bedTemp" : [
        60,
        0
    ]
  },
  {
    "brand" : "AmazonBasics",
    "material" : "PETG",
    "color" : "Black",
    "cost" : 21.99,
    "size" : 1.75,
    "printTemp" : [
        240,
        0
    ],
    "bedTemp" : [
        80,
        0
    ],
    "name" : null
  },
  {
    "brand" : "HQA3D",
    "material" : "Carbon Fiber",
    "color" : "Natural",
    "cost" : 52,
    "size" : 1.75,
    "bedTemp" : [
        60,
        70
    ],
    "name" : null,
    "printTemp" : [
        210,
        230
    ]
  },
  {
    "brand" : "Prusament",
    "material" : "PLA",
    "color" : "Azure Blue",
    "cost" : 24.99,
    "size" : 1.75,
    "bedTemp" : [
        40,
        60
    ],
    "name" : null,
    "printTemp" : [
        200,
        220
    ]
  },
  {
    "brand" : "Prusament",
    "material" : "PETG",
    "color" : "Orange",
    "cost" : 22.49,
    "size" : 1.75,
    "bedTemp" : [
        70,
        90
    ],
    "name" : null,
    "printTemp" : [
        240,
        260
    ]
  },
  {
    "brand" : "AmazonBasics",
    "material" : "ABS",
    "color" : "Red",
    "cost" : 19.99,
    "size" : 2.85,
    "bedTemp" : [
        100,
        0
    ],
    "name" : null,
    "printTemp" : [
        230,
        0
    ]
  },
  {
    "name" : "PRO Series",
    "brand" : "MatterHackers",
    "material" : "PLA",
    "color" : "Yellow",
    "cost" : 42,
    "size" : 1.75,
    "printTemp" : [
      190,
      220
    ],
    "bedTemp" : [
      60,
      70
    ]
  },
  {
    "name" : "",
    "brand" : "Overture",
    "material" : "PETG",
    "color" : "Black",
    "cost" : 20.99,
    "size" : 1.75,
    "printTemp" : [
      230,
      250
    ],
    "bedTemp" : [
      80,
      90
    ]
  },
  {
    "name" : "PolyLite",
    "brand" : "Polymaker",
    "material" : "ABS",
    "color" : "White",
    "cost" : 24.99,
    "size" : 1.75,
    "printTemp" : [
      230,
      260
    ],
    "bedTemp" : [
      100,
      110
    ]
  },
  {
    "name" : "NylonX Carbon Fiber",
    "brand" : "MatterHackers",
    "material" : "Nylon",
    "color" : "Black",
    "cost" : 116,
    "size" : 1.75,
    "printTemp" : [
      270,
      0
    ],
    "bedTemp" : [
      80,
      0
    ]
  }
];

exports.printers = [
  {
    "name" : "i3 MK3S",
    "make" : "Prusa",
    "life" : 3650,
    "cost" : 800,
    "type" : "FFF",
    "motion" : "Cartesian",
    "drive" : "Direct",
    "maxBedTemp" : 120,
    "size" : 1.75,
    "maxPrintTemp" : 300,
  },
  {
    "name" : "Delta Plus",
    "make" : "Anycubic",
    "life" : 3000,
    "cost" : 250,
    "type" : "FFF",
    "motion" : "Delta",
    "drive" : "Bowden",
    "maxBedTemp" : 100,
    "size" : 1.75,
    "maxPrintTemp" : 260,
  },
  {
    "name" : "RailCore II 300ZL",
    "make" : "RepRap",
    "life" : 4000,
    "cost" : 1750,
    "type" : "FFF",
    "motion" : "CoreXY",
    "drive" : "Bowden",
    "maxBedTemp" : 120,
    "size" : 2.85,
    "maxPrintTemp" : 450,
  }
];
