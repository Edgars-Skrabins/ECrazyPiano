import { useEffect } from 'react';
import piano1 from "/1.ogg"

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
                                playSound(note);
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

    const initializeSounds = () => {

    }

    const playSound = (note:number) => {
        const testSound = new Audio(piano1);
        testSound.play();
    };

    const stopSound = (note) => {
        // Implement logic to stop the sound when the key is released
    };

    return (
        <div className="piano-keys">
            {/* Render piano keys as needed */}
        </div>
    );
};
