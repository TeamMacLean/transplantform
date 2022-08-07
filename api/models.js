import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// changes
// creatorIsGroupLeaderFor AND signatory are object IDs for pre-existing group
// CRUD admins on admin.vue
//      WEBMASTERS=["deeks"]
//      cannot delete webmasters OR yourself
// update .env and .env.example local & remote

const Group =
  mongoose.models.Group ||
  mongoose.model(
    'Group',
    new Schema(
      {
        name: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
          unique: true,
        },
        ldapGroups: {
          type: [String],
        },
        researchAssistants: {
          type: [String],
        },
      },
      {
        timestamps: true,
        toJSON: { virtuals: true },
      }
    )
  );

const Admin =
  mongoose.models.Admin ||
  mongoose.model(
    'Admin',
    new Schema(
      {
        // this is the username of the admin, name is more convenient as a field name
        name: {
          type: String,
          required: true,
          unique: true,
        },
        archived: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
      {
        timestamps: true,
        toJSON: { virtuals: true },
      }
    )
  );

const Specie =
  mongoose.models.Specie ||
  mongoose.model(
    'Specie',
    new Schema(
      {
        name: {
          type: String,
          required: true,
        },
        archived: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
      {
        timestamps: true,
        toJSON: { virtuals: true },
      }
    )
  );
const Genotype =
  mongoose.models.Genotype ||
  mongoose.model(
    'Genotype',
    new Schema(
      {
        name: {
          type: String,
          required: true,
        },
        archived: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
      {
        timestamps: true,
        toJSON: { virtuals: true },
      }
    )
  );
const VectorSelection =
  mongoose.models.VectorSelection ||
  mongoose.model(
    'VectorSelection',
    new Schema(
      {
        name: {
          type: String,
          required: true,
        },
        archived: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
      {
        timestamps: true,
        toJSON: { virtuals: true },
      }
    )
  );
const TdnaSelection =
  mongoose.models.TdnaSelection ||
  mongoose.model(
    'TdnaSelection',
    new Schema(
      {
        name: {
          type: String,
          required: true,
        },
        archived: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
      {
        timestamps: true,
        toJSON: { virtuals: true },
      }
    )
  );
const AgroStrain =
  mongoose.models.AgroStrain ||
  mongoose.model(
    'AgroStrain',
    new Schema(
      {
        name: {
          type: String,
          required: true,
        },
        archived: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
      {
        timestamps: true,
        toJSON: { virtuals: true },
      }
    )
  );

const Form =
  mongoose.models.Form ||
  mongoose.model(
    'Form',
    new Schema(
      {
        date: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        creatorIsAdmin: {
          type: Boolean,
          required: true,
        },
        creatorIsGroupLeaderFor: {
          type: mongoose.Schema.Types.ObjectId,
          required: false,
          default: null,
        },
        signatory: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        species: {
          // could make ObjectId but time-consuming
          type: String,
          required: true,
        },
        genotype: {
          // could make ObjectId but time-consuming
          type: String,
          required: true,
        },
        constructs: [
          {
            constructName: {
              type: String,
              required: true,
              unique: true,
            },
            binaryVectorBackbone: {
              // could make ObjectId but time-consuming
              type: String,
              required: true,
            },
            vectorSelection: {
              // could make ObjectId but time-consuming
              type: String,
              required: true,
            },
            tdnaSelection: {
              // could make ObjectId but time-consuming
              type: String,
              required: true,
            },
            agroStrain: {
              // could make ObjectId but time-consuming
              type: String,
              required: true,
            },
          },
        ],
        notes: {
          type: String,
          required: false,
          default: null,
        },
        status: {
          type: String,
          required: true,
          default: 'unknown',
        },
      },
      {
        timestamps: true,
        toJSON: { virtuals: true },
      }
    )
  );

export {
  Form,
  Group,
  Specie,
  Genotype,
  VectorSelection,
  TdnaSelection,
  AgroStrain,
  Admin,
};
