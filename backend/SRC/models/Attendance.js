import mongoose from "mongoose";
const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    punchInTime: {
      type: Date,
      default: null,
    },

    punchOutTime: {
      type: Date,
      default: null,
    },

    selfie: {
      type: String,
      required: true,
    },

    location: {
      latitude: {
        type: Number,
        required: true,
      },

      longitude: {
        type: Number,
        required: true,
      },
    },

    totalHours: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["completed", "incomplete"],
      default: "incomplete",
    },

    validationStatus: {
      type: String,
      enum: ["pending", "valid", "invalid"],
      default: "pending",
    },

    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
