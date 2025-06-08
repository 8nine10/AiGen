import mongoose from "mongoose"

const threadSchema = new mongoose.Schema({
    text: {
        type: String,
        required: false,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    parentId: {
        type: String,
        default: null,
    },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread',
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    agentName: String,
    category: String,
    description: String,
    price: String,
    aimodel: String, // or Buffer if storing raw, or URL string
    instructions: String,
    dependencies: String,
    license: String,
}, { timestamps: true });

const Thread = mongoose.models.Thread || mongoose.model('Thread', threadSchema)

export default Thread