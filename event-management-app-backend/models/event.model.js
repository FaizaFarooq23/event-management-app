

module.exports =  mongoose => {
    const Event = mongoose.model(
        "event",
        mongoose.Schema(
            {
            date  : String,
            time : String,
            eventname:  String,
            user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
            },
            { timestamps: true }
        )
    );
    return Event;
};

