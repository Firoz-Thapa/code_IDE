const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  },
  htmlCode: {
    type: String,
    default: "<h1>Hello World</h1>"
  },
  cssCode: {
    type: String,
    default: "body { background-color: #f4f4f4; }"
  },
  jsCode: {
    type: String,
    default: "// JavaScript code here"
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;