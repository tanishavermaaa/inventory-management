const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a category name'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Filter out soft-deleted categories in queries
// categorySchema.pre(/^find/, function (next) {
//   this.where({ isDeleted: false });
//   next();
// });

module.exports = mongoose.model('Category', categorySchema);
