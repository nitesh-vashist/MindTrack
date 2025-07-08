import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    lectureNumber: Number,
    lectureTitle: String,
    duration: Number,
    watchedTime: Number,
    watchedDate: String,
    status: String,
    notes: String,
    tags: [String],
    resumePoint: String,
});

const trackSchema = new mongoose.Schema({
    name: String,
    type: String,
    totalLectures: Number,
    progress: Number,
    isCompleted: Boolean,
    lastUpdated: String,
    tags: [String],
    sessions: [sessionSchema],
});

const Track = mongoose.model("Track", trackSchema);
module.exports = Track;