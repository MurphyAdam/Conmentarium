import React, { useState, useRef } from 'react';

const IS_PLAYING = 'IS_PLAYING'
const IS_PAUSED = 'IS_PAUSED'
const IS_NONE = 'IS_NONE'

export default function CoreMediaPlayer(props) {

	const audioDOMRef = useRef(null)
	// let us define our MediaPlayer state
	const [state, setState] = useState(
		{
			playlist: [],
			currentAudioNode: audioDOMRef,
			playing: false,
			paused: true,
			loading: false,
			loaded: false,
			playId: null,
		    title: '',
		    artwork: '',
		    artist: '',
		    src: '',
		    seeked: true,
		}
	)

	const mediaSessionAvailable = 'mediaSession' in navigator

	const togglePlay = () => {
		if (state.playlist.length >= 1 && state.currentAudioNode) {
			if (state.playing) {
				state.currentAudioNode.pause()
				setState({...state, playing: false, paused: true})
				return
			}
			state.currentAudioNode.play()
			setState({...state, playing: true, paused: false})
			return
		}
	}

	return (
        <audio
          className="core-music-player"
          title={state.title}
          src={state.src}
          ref={audioDOMRef}
        > import an audio </audio>
		);
}