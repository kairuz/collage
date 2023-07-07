import {SamplingDescriptor, BarDescriptor} from "../domain.js";


const sampleNameDrumsCrash            = "crash";
const sampleNameDrumsHihat            = "hihat";
const sampleNameDrumsHihatOpen        = "hihat (open)";
const sampleNameDrumsSnare            = "snare";
const sampleNameDrumsKick             = "kick";
const sampleNameGuitarChorusARiffA_A  = "guitar (chorusA-riffA-A)";
const sampleNameGuitarChorusARiffA_B  = "guitar (chorusA-riffA-B)";
const sampleNameGuitarChorusARiffA_C  = "guitar (chorusA-riffA-C)";
const sampleNameGuitarChorusARiffA_D  = "guitar (chorusA-riffA-D)";
const sampleNameGuitarChorusARiffB_A  = "guitar (chorusA-riffB-A)";
const sampleNameGuitarChorusARiffB_B  = "guitar (chorusA-riffB-B)";
const sampleNameGuitarChorusARiffB_C  = "guitar (chorusA-riffB-C)";
const sampleNameGuitarChorusARiffB_D  = "guitar (chorusA-riffB-D)";
const sampleNameGuitarChorusARiffC_A  = "guitar (chorusA-riffC-A)";
const sampleNameGuitarChorusARiffC_B  = "guitar (chorusA-riffC-B)";
const sampleNameGuitarChorusARiffC_C  = "guitar (chorusA-riffC-C)";
const sampleNameGuitarChorusARiffC_D  = "guitar (chorusA-riffC-D)";

const sampleNames = [
  sampleNameDrumsCrash,
  sampleNameDrumsHihat,
  sampleNameDrumsHihatOpen,
  sampleNameDrumsSnare,
  sampleNameDrumsKick,
  sampleNameGuitarChorusARiffA_A,
  sampleNameGuitarChorusARiffA_B,
  sampleNameGuitarChorusARiffA_C,
  sampleNameGuitarChorusARiffA_D,
  sampleNameGuitarChorusARiffB_A,
  sampleNameGuitarChorusARiffB_B,
  sampleNameGuitarChorusARiffB_C,
  sampleNameGuitarChorusARiffB_D,
  sampleNameGuitarChorusARiffC_A,
  sampleNameGuitarChorusARiffC_B,
  sampleNameGuitarChorusARiffC_C,
  sampleNameGuitarChorusARiffC_D
];

const sampleModels = {
  [sampleNameDrumsCrash]: {
    "path": "https://kairuz.github.io/assets/audio/samples/drums-crash.ogg"
  },
  [sampleNameDrumsHihat]: {
    "path": "https://kairuz.github.io/assets/audio/samples/drums-hihat.ogg"
  },
  [sampleNameDrumsHihatOpen]: {
    "path": "https://kairuz.github.io/assets/audio/samples/drums-hihat-open.ogg"
  },
  [sampleNameDrumsSnare]: {
    "path": "https://kairuz.github.io/assets/audio/samples/drums-snare.ogg"
  },
  [sampleNameDrumsKick]: {
    "path": "https://kairuz.github.io/assets/audio/samples/drums-kick.ogg"
  },
  [sampleNameGuitarChorusARiffA_A]: {
    "path": "https://kairuz.github.io/collage/assets/audio/samples/lambda/lambda-guitar-11-8-110bpm-chorusA-riffA-A.ogg"
  },
  [sampleNameGuitarChorusARiffA_B]: {
    "path": "https://kairuz.github.io/collage/assets/audio/samples/lambda/lambda-guitar-11-8-110bpm-chorusA-riffA-B.ogg"
  },
  [sampleNameGuitarChorusARiffA_C]: {
    "path": "https://kairuz.github.io/collage/assets/audio/samples/lambda/lambda-guitar-11-8-110bpm-chorusA-riffA-C.ogg"
  },
  [sampleNameGuitarChorusARiffA_D]: {
    "path": "https://kairuz.github.io/collage/assets/audio/samples/lambda/lambda-guitar-11-8-110bpm-chorusA-riffA-D.ogg"
  },
  [sampleNameGuitarChorusARiffB_A]: {
    "path": "https://kairuz.github.io/collage/assets/audio/samples/lambda/lambda-guitar-11-8-110bpm-chorusA-riffB-A.ogg"
  },
  [sampleNameGuitarChorusARiffB_B]: {
    "path": "https://kairuz.github.io/collage/assets/audio/samples/lambda/lambda-guitar-11-8-110bpm-chorusA-riffB-B.ogg"
  },
  [sampleNameGuitarChorusARiffB_C]: {
    "path": "https://kairuz.github.io/collage/assets/audio/samples/lambda/lambda-guitar-11-8-110bpm-chorusA-riffB-C.ogg"
  },
  [sampleNameGuitarChorusARiffB_D]: {
    "path": "https://kairuz.github.io/collage/assets/audio/samples/lambda/lambda-guitar-11-8-110bpm-chorusA-riffB-D.ogg"
  },
  [sampleNameGuitarChorusARiffC_A]: {
    "path": "https://kairuz.github.io/collage/assets/audio/samples/lambda/lambda-guitar-11-8-110bpm-chorusA-riffC-A.ogg"
  },
  [sampleNameGuitarChorusARiffC_B]: {
    "path": "https://kairuz.github.io/collage/assets/audio/samples/lambda/lambda-guitar-11-8-110bpm-chorusA-riffC-B.ogg"
  },
  [sampleNameGuitarChorusARiffC_C]: {
    "path": "https://kairuz.github.io/collage/assets/audio/samples/lambda/lambda-guitar-11-8-110bpm-chorusA-riffC-C.ogg"
  },
  [sampleNameGuitarChorusARiffC_D]: {
    "path": "https://kairuz.github.io/collage/assets/audio/samples/lambda/lambda-guitar-11-8-110bpm-chorusA-riffC-D.ogg"
  },

};

const standardBeatNote  = 1/4; // quarter note beats assumed for bpm measurement

const beatsPerMinute    = 110; // 1 quarter note = 1 beat; 110 quarter notes (220 eighth notes) per minute
const notesPerBar       = 11;
const noteType           = 1/8; // song is in 11/8 time (eleven eighth notes per bar)
const beatsPerNote      = standardBeatNote / noteType;
const beatsPerBar       = notesPerBar * beatsPerNote;
const beatLengthMillis  = (60000 / beatsPerMinute) * (noteType / standardBeatNote);
const noteLengthMillis  = beatLengthMillis * beatsPerNote;
const barLengthMillis   = noteLengthMillis * notesPerBar;
const barLengthSecs     = (noteLengthMillis * notesPerBar) / 1000;

// 1      &      2      &      3      &      4      &      5      &      6      &      7      &      8      &      9      &      10     &      11     &
const rhythmDrumsKick =
  [0,                                 2.5,                                      5.5,                               8                                         ];
const rhythmDrumsSnare =
  [                            2,                                 4.5,                                      7.5,                               10            ];
const rhythmDrumsCrash =
  [0                                                                                                                                                         ];
const rhythmDrumsHihat =
  [0,            1,            2,            3,            4,            5,            6,            7,            8,             9,           10            ];
const rhythmDrumsHihatAccented =
  [0,            1,            2,            3,            4,                          6,            7,            8,             9,           10            ];
const rhythmDrumsHihatOpen =
  [                                                                             5.5                                                                          ];
const rhythmDrumsHihatOpenAccented =
  [                                                                      5                                                                                   ];


const offsetsKick               = rhythmDrumsKick.map((note) => note * noteLengthMillis);
const offsetsSnare              = rhythmDrumsSnare.map((note) => note * noteLengthMillis);
const offsetsCrash              = rhythmDrumsCrash.map((note) => note * noteLengthMillis);
const offsetsHihat              = rhythmDrumsHihat.map((note) => note * noteLengthMillis);
const offsetsHihatAccented      = rhythmDrumsHihatAccented.map((note) => note * noteLengthMillis);
const offsetsHihatOpen          = rhythmDrumsHihatOpen.map((note) => note * noteLengthMillis);
const offsetsHihatOpenAccented  = rhythmDrumsHihatOpenAccented.map((note) => note * noteLengthMillis);


const samplingDescriptorsKick               = offsetsKick.map((offset) => new SamplingDescriptor(sampleNameDrumsKick, offset));
const samplingDescriptorsSnare              = offsetsSnare.map((offset) => new SamplingDescriptor(sampleNameDrumsSnare, offset));
const samplingDescriptorsCrash              = offsetsCrash.map((offset) => new SamplingDescriptor(sampleNameDrumsCrash, offset));
const samplingDescriptorsHihat              = offsetsHihat.map((offset) => new SamplingDescriptor(sampleNameDrumsHihat, offset));
const samplingDescriptorsHihatAccented      = offsetsHihatAccented.map((offset) => new SamplingDescriptor(sampleNameDrumsHihat, offset));
const samplingDescriptorsHihatOpen          = offsetsHihatOpen.map((offset) => new SamplingDescriptor(sampleNameDrumsHihatOpen, offset));
const samplingDescriptorsHihatOpenAccented  = offsetsHihatOpenAccented.map((offset) => new SamplingDescriptor(sampleNameDrumsHihatOpen, offset));



const samplingDescriptorsGuitarChorusARiffABarA = [
    new SamplingDescriptor(sampleNameGuitarChorusARiffA_A, -3 * noteLengthMillis),
    new SamplingDescriptor(sampleNameGuitarChorusARiffA_B, (-3 + 5.5) * noteLengthMillis)
];
const samplingDescriptorsGuitarChorusARiffABarB = [
    new SamplingDescriptor(sampleNameGuitarChorusARiffA_C, -3 * noteLengthMillis),
    new SamplingDescriptor(sampleNameGuitarChorusARiffA_D, (-3 + 5.5) * noteLengthMillis)
];
const samplingDescriptorsGuitarChorusARiffBBarA = [
  new SamplingDescriptor(sampleNameGuitarChorusARiffB_A, -3 * noteLengthMillis),
  new SamplingDescriptor(sampleNameGuitarChorusARiffB_B, (-3 + 5.5) * noteLengthMillis)
];
const samplingDescriptorsGuitarChorusARiffBBarB = [
  new SamplingDescriptor(sampleNameGuitarChorusARiffB_C, -3 * noteLengthMillis),
  new SamplingDescriptor(sampleNameGuitarChorusARiffB_D, (-3 + 5.5) * noteLengthMillis)
];
const samplingDescriptorsGuitarChorusARiffCBarA = [
  new SamplingDescriptor(sampleNameGuitarChorusARiffC_A, -3 * noteLengthMillis),
  new SamplingDescriptor(sampleNameGuitarChorusARiffC_B, (-3 + 5.5) * noteLengthMillis)
];
const samplingDescriptorsGuitarChorusARiffCBarB = [
  new SamplingDescriptor(sampleNameGuitarChorusARiffC_C, -3 * noteLengthMillis),
  new SamplingDescriptor(sampleNameGuitarChorusARiffC_D, (-3 + 5.5) * noteLengthMillis)
];



const samplingDescriptors = [
  ...samplingDescriptorsKick,
  ...samplingDescriptorsSnare,
  ...samplingDescriptorsCrash,
  ...samplingDescriptorsHihat,
  ...samplingDescriptorsHihatAccented,
  ...samplingDescriptorsHihatOpen,
  ...samplingDescriptorsHihatOpenAccented,
  ...samplingDescriptorsGuitarChorusARiffABarA,
  ...samplingDescriptorsGuitarChorusARiffABarB,
  ...samplingDescriptorsGuitarChorusARiffBBarA,
  ...samplingDescriptorsGuitarChorusARiffBBarB,
  ...samplingDescriptorsGuitarChorusARiffCBarA,
  ...samplingDescriptorsGuitarChorusARiffCBarB
];



const barDescriptorAChorusARiffABarA = new BarDescriptor(barLengthMillis, [
  ...samplingDescriptorsKick,
  ...samplingDescriptorsSnare,
  ...samplingDescriptorsCrash,
  ...samplingDescriptorsHihat,
  ...samplingDescriptorsHihatOpen,
  ...samplingDescriptorsGuitarChorusARiffABarA
]);

const barDescriptorAChorusARiffABarB = new BarDescriptor(barLengthMillis, [
  ...samplingDescriptorsKick,
  ...samplingDescriptorsSnare,
  ...samplingDescriptorsCrash,
  ...samplingDescriptorsHihat,
  ...samplingDescriptorsHihatOpen,
  ...samplingDescriptorsGuitarChorusARiffABarB
]);

const barDescriptorBChorusARiffABarA = new BarDescriptor(barLengthMillis, [
  ...samplingDescriptorsKick,
  ...samplingDescriptorsSnare,
  ...samplingDescriptorsCrash,
  ...samplingDescriptorsHihatAccented,
  ...samplingDescriptorsHihatOpenAccented,
  ...samplingDescriptorsGuitarChorusARiffABarA
]);

const barDescriptorBChorusARiffABarB = new BarDescriptor(barLengthMillis, [
  ...samplingDescriptorsKick,
  ...samplingDescriptorsSnare,
  ...samplingDescriptorsCrash,
  ...samplingDescriptorsHihatAccented,
  ...samplingDescriptorsHihatOpenAccented,
  ...samplingDescriptorsGuitarChorusARiffABarB
]);

const barDescriptorCChorusARiffBBarA = new BarDescriptor(barLengthMillis, [
  ...samplingDescriptorsKick,
  ...samplingDescriptorsSnare,
  ...samplingDescriptorsCrash,
  ...samplingDescriptorsHihat,
  ...samplingDescriptorsHihatOpen,
  ...samplingDescriptorsGuitarChorusARiffBBarA
]);

const barDescriptorCChorusARiffBBarB = new BarDescriptor(barLengthMillis, [
  ...samplingDescriptorsKick,
  ...samplingDescriptorsSnare,
  ...samplingDescriptorsCrash,
  ...samplingDescriptorsHihat,
  ...samplingDescriptorsHihatOpen,
  ...samplingDescriptorsGuitarChorusARiffBBarB
]);


const barDescriptorDChorusARiffCBarA = new BarDescriptor(barLengthMillis, [
  ...samplingDescriptorsKick,
  ...samplingDescriptorsSnare,
  ...samplingDescriptorsCrash,
  ...samplingDescriptorsHihatAccented,
  ...samplingDescriptorsHihatOpenAccented,
  ...samplingDescriptorsGuitarChorusARiffCBarA
]);

const barDescriptorDChorusARiffCBarB = new BarDescriptor(barLengthMillis, [
  ...samplingDescriptorsKick,
  ...samplingDescriptorsSnare,
  ...samplingDescriptorsCrash,
  ...samplingDescriptorsHihatAccented,
  ...samplingDescriptorsHihatOpenAccented,
  ...samplingDescriptorsGuitarChorusARiffCBarB
]);


const barDescriptorDChorusARiffCBarC = new BarDescriptor(barLengthMillis, [
  ...samplingDescriptorsKick,
  ...samplingDescriptorsSnare,
  ...samplingDescriptorsCrash,
  ...samplingDescriptorsHihatAccented,
  ...samplingDescriptorsHihatOpenAccented,
  ...samplingDescriptorsGuitarChorusARiffCBarA,
  ...samplingDescriptorsGuitarChorusARiffABarA
]);

const barDescriptorDChorusARiffCBarD = new BarDescriptor(barLengthMillis, [
  ...samplingDescriptorsKick,
  ...samplingDescriptorsSnare,
  ...samplingDescriptorsCrash,
  ...samplingDescriptorsHihatAccented,
  ...samplingDescriptorsHihatOpenAccented,
  ...samplingDescriptorsGuitarChorusARiffCBarB,
  ...samplingDescriptorsGuitarChorusARiffABarB
]);



const barDescriptors = [

    barDescriptorDChorusARiffCBarA, barDescriptorDChorusARiffCBarB,
    barDescriptorDChorusARiffCBarA, barDescriptorDChorusARiffCBarB,

    barDescriptorDChorusARiffCBarC, barDescriptorDChorusARiffCBarD,
    barDescriptorAChorusARiffABarA, barDescriptorAChorusARiffABarB,

    barDescriptorDChorusARiffCBarA, barDescriptorDChorusARiffCBarB,
    barDescriptorDChorusARiffCBarA, barDescriptorDChorusARiffCBarB,
    barDescriptorBChorusARiffABarA, barDescriptorBChorusARiffABarB,
    barDescriptorAChorusARiffABarA, barDescriptorAChorusARiffABarB,
    barDescriptorCChorusARiffBBarA, barDescriptorCChorusARiffBBarB,

    // barDescriptorDChorusARiffCBarA, barDescriptorDChorusARiffCBarB,
    // barDescriptorDChorusARiffCBarA, barDescriptorDChorusARiffCBarB,

    // barDescriptorDChorusARiffCBarC, barDescriptorDChorusARiffCBarD,
    // barDescriptorAChorusARiffABarA, barDescriptorAChorusARiffABarB,


];


export {
  sampleNameDrumsCrash, sampleNameDrumsHihat, sampleNameDrumsHihatOpen, sampleNameDrumsSnare, sampleNameDrumsKick,
  sampleNameGuitarChorusARiffA_A, sampleNameGuitarChorusARiffA_B, sampleNameGuitarChorusARiffA_C, sampleNameGuitarChorusARiffA_D,
  sampleNameGuitarChorusARiffB_A, sampleNameGuitarChorusARiffB_B, sampleNameGuitarChorusARiffB_C, sampleNameGuitarChorusARiffB_D,
  sampleNameGuitarChorusARiffC_A, sampleNameGuitarChorusARiffC_B, sampleNameGuitarChorusARiffC_C, sampleNameGuitarChorusARiffC_D,
  sampleNames, sampleModels,
  samplingDescriptors,
  barDescriptors
}
