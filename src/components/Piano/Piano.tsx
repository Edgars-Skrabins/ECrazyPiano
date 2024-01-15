import {useEffect} from 'react';

export const Piano = () => {

    useEffect(() => {
        const initializeMIDI = async () => {
            try {
                if (navigator.requestMIDIAccess) {
                    const midiAccess = await navigator.requestMIDIAccess();
                    const inputs = midiAccess.inputs.values();

                    const inputArr = Array.from(inputs);

                    inputArr.forEach((input) => {
                        input.onmidimessage = (event) => {
                            const [command, note, velocity] = (event as MIDIMessageEvent).data;
                            if (command === 144 && velocity !== 0) {
                                playSound(note,velocity);
                            } else if (command === 128 || (command === 144 && velocity === 0)) {
                                stopSound(note);
                            }
                        }
                    })
                } else {
                    console.log('Web MIDI API not supported');
                }
            } catch (error) {
                console.error('Error initializing MIDI:', error);
            }
        };

        initializeMIDI();

    }, []);

    const playSound = (note:number,velocity:number) => {
        note -= 12;
        const soundToPlay:HTMLAudioElement = new Audio(`/${note.toString()}.mp3`);
        soundToPlay.volume = 1 * (velocity / 127);
        soundToPlay.play();
    };

    const stopSound = (note) => {

    };

    const startSession = () => {
        console.log("Started session");
    }

    return (
        <div className="piano-keys">
            <button onClick={startSession}>
                Click
            </button>
        </div>
    );
};
