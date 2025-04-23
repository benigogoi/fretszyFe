import React from 'react';

type FretMarkersProps = {
    numberOfFrets: number;
    orientation?: 'horizontal' | 'vertical';
    markerSize?: number;
};

const FretMarkers: React.FC<FretMarkersProps> = ({
    numberOfFrets,
    // orientation = 'horizontal',
    markerSize = 5
}) => {
    // Filter marker positions to only include those within the number of frets
    const singleMarkers = [3, 5, 7, 9, 15, 17, 19, 21].filter(fret => fret <= numberOfFrets);
    const doubleMarkers = [12, 24].filter(fret => fret <= numberOfFrets);

    return (
        <div className="absolute top-0 w-full h-full pointer-events-none">
            {/* Map over fret positions - align with fret numbers */}
            {singleMarkers.map((fret) => (
                <div
                    key={`marker-${fret}`}
                    className="absolute flex justify-center items-center"
                    style={{
                        // Position at the CENTER of each fret space, not at the fret itself
                        left: `${((fret - 0.5) * 100) / numberOfFrets}%`,
                        width: `${100 / numberOfFrets}%`,
                        height: '100%',
                        transform: 'translateX(-50%)'
                    }}
                >
                    <div className="rounded-full bg-gray-500 opacity-70"
                        style={{
                            width: `${markerSize * 5}px`,
                            height: `${markerSize * 5}px`
                        }}
                    />
                </div>
            ))}

            {/* Double markers at the 12th and 24th frets */}
            {doubleMarkers.map((fret) => (
                <div
                    key={`double-marker-${fret}`}
                    className="absolute flex justify-center items-center"
                    style={{
                        left: `${((fret - 0.5) * 100) / numberOfFrets}%`,
                        width: `${100 / numberOfFrets}%`,
                        height: '100%',
                        transform: 'translateX(-50%)'
                    }}
                >
                    <div className="flex flex-col h-full justify-around py-10">
                        <div className="rounded-full bg-gray-500 opacity-70"
                            style={{
                                width: `${markerSize * 5}px`,
                                height: `${markerSize * 5}px`
                            }}
                        />
                        <div className="rounded-full bg-gray-500 opacity-70"
                            style={{
                                width: `${markerSize * 5}px`,
                                height: `${markerSize * 5}px`
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FretMarkers;