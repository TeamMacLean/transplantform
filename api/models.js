import mongoose from 'mongoose';
const { Schema, models, model } = mongoose;

const Group =
  models.Group ||
  model(
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
  models.Admin ||
  model(
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
  models.Specie ||
  model(
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
  models.Genotype ||
  model(
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
  models.VectorSelection ||
  model(
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
  models.TdnaSelection ||
  model(
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
  models.AgroStrain ||
  model(
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
  models.Form ||
  model(
    'Form',
    new Schema(
      {
        trfId: {
          type: String,
          required: true,
          unique: true,
        },
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
        creatorIsGroupLeader: {
          type: Boolean,
          required: false,
          default: false,
        },
        signatoryId: {
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
            shortName: {
              type: String,
              required: false,
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
