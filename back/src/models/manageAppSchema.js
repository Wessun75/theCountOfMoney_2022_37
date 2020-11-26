const mongoose = require('mongoose');

const ManageAppSchema = mongoose.Schema({
    crypto_length: {
        type: "array",
        required: [true, "Forget crypto length !"]
    }
}, {collection: 'manage_app'})


export default ManageAppSchema;