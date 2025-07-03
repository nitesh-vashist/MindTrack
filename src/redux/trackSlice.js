import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState = {
    tracks: [
    {
        id: "1",
        name: "React YouTube Series",
        type: "YouTube", // or Book, Course, Playlist, Sheet
        source: "https://youtube.com/playlist...", // optional
        totalLectures: 40,       // user-input or fetched later
        addedOn: "2025-07-01",
        lastUpdated: "2025-07-10", // latest activity
        progress: 7,               // lectures added
        tags: ["frontend", "react", "hooks"], // optional
        isCompleted: false
    }
    ],

    sessions:{
        "1":[
             {
        id: nanoid(),
        lectureNumber: 12,
        lectureTitle: "JSX & Babel",
        watchedTime: 18, // in minutes
        watchedDate: "2025-07-01",
        status: "Understood",
        notes: "JSX gets compiled to React.createElement",
        tags: ["jsx", "babel", "basics"],
        resumePoint: "00:00:00"
      },
      {
        id: nanoid(),
        lectureNumber: 13,
        lectureTitle: "useEffect Cleanup",
        watchedTime: 22,
        watchedDate: "2025-07-02",
        status: "Confused",
        notes: "Not clear on return function in useEffect",
        tags: ["useEffect", "react-hooks"],
        resumePoint: "00:10:45"
      }
        ]
    }
}

export const trackSlice = createSlice({
    name: "track",
    initialState,
    reducers: {
       addTrack: (state, action) => {
            const { name, type, source, totalLectures, tags } = action.payload;

            const newTrack = {
                id: nanoid(),
                name,
                type,
                source,
                totalLectures: totalLectures || 0,  // default to 0 if not given
                addedOn: new Date().toISOString(),
                lastUpdated: new Date().toISOString(),
                progress: 0,
                tags: tags || [],
                isCompleted: false
            };

            state.tracks.push(newTrack);
            state.sessions[newTrack.id] = []; // initialize empty sessions array
        },

        addSession: (state, action) => {
            const {
                trackId,
                lectureNumber,
                duration, // passed only if needed
                lectureTitle,
                watchedTime,
                watchedDate,
                status,
                notes,
                tags,
                resumePoint
            } = action.payload;

            const track = state.tracks.find(t => t.id === trackId);

            // If not already created, initialize lectureDurations
            if (!track.lectureDurations) {
                track.lectureDurations = {};
            }

            // If this lectureNumber doesn't have a saved duration, save it now
            if (!track.lectureDurations[lectureNumber]) {
                track.lectureDurations[lectureNumber] = duration;
            }

            const finalDuration = track.lectureDurations[lectureNumber];

            const newSession = {
                id: nanoid(),
                lectureNumber,
                lectureTitle,
                watchedTime,
                watchedDate,
                duration: finalDuration,
                status,
                notes,
                tags,
                resumePoint
            };

            state.sessions[trackId].push(newSession);
            track.lastUpdated = new Date().toISOString();


            const sessions = state.sessions[trackId];
            const durations = track.lectureDurations || {};

            const completedLectures = new Set();
            sessions.forEach(session=>{
                const dur = durations[session.lectureNumber] || 0;
                if(!dur) return;
                const percentage = (session.watchedTime / dur) * 100;
                if(percentage>=90){
                    completedLectures.add(session.lectureNumber);
                }
            });
            track.progress = completedLectures.size;
            track.isCompleted = track.progress >= track.totalLectures;

        },


        updateSession: (state,action)=>{
            const {trackId,sessionId, updatedData:{lectureNumber, watchedTime, watchedDate, status, notes, tags, resumePoint} } = action.payload;
            state.sessions[trackId] = state.sessions[trackId].map(session => {
                if (session.id === sessionId) {
                    return {
                        ...session,
                        ...updatedData
                    };
                }
                return session;
            });

            const track = state.tracks.find(t => t.id === trackId);
            const sessions = state.sessions[trackId];
            const durations = track.lectureDurations || {};

            const completedLectures = new Set();

            sessions.forEach(session => {
                const dur = durations[session.lectureNumber] || 0;
                if (!dur) return;
                const percentWatched = (session.watchedTime / dur) * 100;
                if (percentWatched >= 90) {
                    completedLectures.add(session.lectureNumber);
                }
            });

            track.progress = completedLectures.size;
            track.isCompleted = track.progress >= track.totalLectures;
            track.lastUpdated = new Date().toISOString();

        },

        deleteSession: (state, action) => {
            const { trackId, sessionId } = action.payload;
            state.sessions[trackId] = state.sessions[trackId].filter(session => session.id !== sessionId);

            const track = state.tracks.find(t => t.id === trackId);
            const sessions = state.sessions[trackId];
            const durations = track.lectureDurations || {};

            const completedLectures = new Set();
            sessions.forEach(session => {
                const dur = durations[session.lectureNumber] || 0;
                if (!dur) return;
                const percentage = (session.watchedTime / dur) * 100;
                if (percentage >= 90) {
                    completedLectures.add(session.lectureNumber);
                }
            });

            track.progress = completedLectures.size;
            track.isCompleted = track.progress >= track.totalLectures;
            track.lastUpdated = new Date().toISOString();
        },

        deleteTrack : (state,action)=>{
            const {trackId} = action.payload;
            state.tracks = state.tracks.filter(track => track.id!==trackId);
            delete state.sessions[trackId]; // remove all sessions for this track
        }
    }
})

export const { addTrack, addSession, updateSession, deleteSession, deleteTrack } = trackSlice.actions;
export default trackSlice.reducer;