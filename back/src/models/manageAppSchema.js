const mongoose = require('mongoose');

const ManageAppSchema = mongoose.Schema({
    _id : {
        type: "string"
    },
    crypto_length: {
        type: "array",
        required: [true, "Forget crypto length !"]
    }
}, {collection: 'manage_app'})

export default mongoose.model('manage_app', ManageAppSchema);