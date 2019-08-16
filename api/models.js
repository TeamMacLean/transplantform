import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Plate = mongoose.model(
  'Plate',

  {
    a1: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    a2: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    a3: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    a4: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    a5: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    a6: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    a7: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    a8: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    a9: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    a10: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    a11: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    a12: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },

    b1: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    b2: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    b3: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    b4: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    b5: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    b6: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    b7: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    b8: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    b9: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    b10: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    b11: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    b12: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },

    c1: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    c2: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    c3: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    c4: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    c5: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    c6: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    c7: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    c8: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    c9: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    c10: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    c11: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    c12: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },

    d1: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    d2: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    d3: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    d4: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    d5: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    d6: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    d7: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    d8: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    d9: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    d10: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    d11: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    d12: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },

    e1: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    e2: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    e3: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    e4: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    e5: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    e6: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    e7: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    e8: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    e9: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    e10: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    e11: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    e12: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },

    f1: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    f2: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    f3: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    f4: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    f5: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    f6: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    f7: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    f8: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    f9: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    f10: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    f11: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    f12: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },

    g1: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    g2: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    g3: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    g4: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    g5: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    g6: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    g7: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    g8: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    g9: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    g10: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    g11: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    g12: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },

    h1: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    h2: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    h3: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    h4: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    h5: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    h6: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    h7: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    h8: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    h9: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    h10: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    h11: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
    h12: {
      fr: {type: String},
      ec: {type: String},
      volume: {type: Number, default: 900}
    },
  }
);

const Stock = mongoose.model('Stock', {
  created: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  name: {
    type: String,
    required: true
  },
  plate: {
    type: Schema.Types.ObjectId,
    ref: 'Plate',
    required: true

  },
  barcode: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  }
});

const Master = mongoose.model('Master', {
  created: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  name: {
    type: String,
    required: true
  },
  plates: [{
    type: Schema.Types.ObjectId,
    ref: 'Plate',
    required: true
  }],
  species: {
    type: String,
    required: true
  },
  stock: {
    type: Schema.Types.ObjectId,
    ref: 'Stock',
    required: true
  },
  volume: {
    type: Number,
    required: true
  }
});

export {Plate, Stock, Master}
