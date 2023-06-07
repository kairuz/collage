import {SamplingDescriptor, BarDescriptor} from "../domain.js";


const SAMPLE_DRUMS_CRASH              = "crash";
const SAMPLE_DRUMS_HIHAT              = "hihat";
const SAMPLE_DRUMS_HIHAT_OPEN         = "hihat (open)";
const SAMPLE_DRUMS_SNARE              = "snare";
const SAMPLE_DRUMS_KICK               = "kick";
const SAMPLE_GUITAR_CHORUS_A_RIFF_A_A = "guitar (chorusA-riffA-A)";
const SAMPLE_GUITAR_CHORUS_A_RIFF_A_B = "guitar (chorusA-riffA-B)";
const SAMPLE_GUITAR_CHORUS_A_RIFF_A_C = "guitar (chorusA-riffA-C)";
const SAMPLE_GUITAR_CHORUS_A_RIFF_A_D = "guitar (chorusA-riffA-D)";
const SAMPLE_GUITAR_CHORUS_A_RIFF_B_A = "guitar (chorusA-riffB-A)";
const SAMPLE_GUITAR_CHORUS_A_RIFF_B_B = "guitar (chorusA-riffB-B)";
const SAMPLE_GUITAR_CHORUS_A_RIFF_B_C = "guitar (chorusA-riffB-C)";
const SAMPLE_GUITAR_CHORUS_A_RIFF_B_D = "guitar (chorusA-riffB-D)";
const SAMPLE_GUITAR_CHORUS_A_RIFF_C_A = "guitar (chorusA-riffC-A)";
const SAMPLE_GUITAR_CHORUS_A_RIFF_C_B = "guitar (chorusA-riffC-B)";
const SAMPLE_GUITAR_CHORUS_A_RIFF_C_C = "guitar (chorusA-riffC-C)";
const SAMPLE_GUITAR_CHORUS_A_RIFF_C_D = "guitar (chorusA-riffC-D)";


const SAMPLE_MODELS = {
  [SAMPLE_DRUMS_CRASH]: {
    "path": "https://kairuz.github.io/assets/audio/samples/drums-crash.ogg"
  },
  [SAMPLE_DRUMS_HIHAT]: {
    "path": "https://kairuz.github.io/assets/audio/samples/drums-hihat.ogg"
  },
  [SAMPLE_DRUMS_HIHAT_OPEN]: {
    "path": "https://kairuz.github.io/assets/audio/samples/drums-hihat-open.ogg"
  },
  [SAMPLE_DRUMS_SNARE]: {
    "path": "https://kairuz.github.io/assets/audio/samples/drums-snare.ogg"
  },
  [SAMPLE_DRUMS_KICK]: {
    "path": "https://kairuz.github.io/assets/audio/samples/drums-kick.ogg"
  },
  [SAMPLE_GUITAR_CHORUS_A_RIFF_A_A]: {
    "path": "https://kairuz.github.io/collage/assets/audio/samples/lambda/lambda-guitar-11-8-110bpm-chorusA-riffA-A.ogg"
  },
  [SAMPLE_GUITAR_CHORUS_A_RIFF_A_B]: {
    "path": "https://kairuz.github.io/collage/assets/audio/samples/lambda/lambda-guitar-11-8-110bpm-chorusA-riffA-B.ogg"
  },
  [SAMPLE_GUITAR_CHORUS_A_RIFF_A_C]: {
    "path": "https://kairuz.github.io/collage/assets/audio/samples/lambda/lambda-guitar-11-8-110bpm-chorusA-riffA-C.ogg"
  },
  [SAMPLE_GUITAR_CHORUS_A_RIFF_A_D]: {
    "path": "https://kairuz.github.io/collage/assets/audio/samples/lambda/lambda-guitar-11-8-110bpm-chorusA-riffA-D.ogg"
  },
  [SAMPLE_GUITAR_CHORUS_A_RIFF_B_A]: {
    "path": "https://kairuz.github.io/collage/assets/audio/samples/lambda/lambda-guitar-11-8-110bpm-chorusA-riffB-A.ogg"
  },
  [SAMPLE_GUITAR_CHORUS_A_RIFF_B_B]: {
    "path": "https://kairuz.github.io/collage/assets/audio/samples/lambda/lambda-guitar-11-8-110bpm-chorusA-riffB-B.ogg"
  },
  [SAMPLE_GUITAR_CHORUS_A_RIFF_B_C]: {
    "path": "https://kairuz.github.io/collage/assets/audio/samples/lambda/lambda-guitar-11-8-110bpm-chorusA-riffB-C.ogg"
  },
  [SAMPLE_GUITAR_CHORUS_A_RIFF_B_D]: {
    "path": "https://kairuz.github.io/collage/assets/audio/samples/lambda/lambda-guitar-11-8-110bpm-chorusA-riffB-D.ogg"
  },
  [SAMPLE_GUITAR_CHORUS_A_RIFF_C_A]: {
    "path": "https://kairuz.github.io/collage/assets/audio/samples/lambda/lambda-guitar-11-8-110bpm-chorusA-riffC-A.ogg"
  },
  [SAMPLE_GUITAR_CHORUS_A_RIFF_C_B]: {
    "path": "https://kairuz.github.io/collage/assets/audio/samples/lambda/lambda-guitar-11-8-110bpm-chorusA-riffC-B.ogg"
  },
  [SAMPLE_GUITAR_CHORUS_A_RIFF_C_C]: {
    "path": "https://kairuz.github.io/collage/assets/audio/samples/lambda/lambda-guitar-11-8-110bpm-chorusA-riffC-C.ogg"
  },
  [SAMPLE_GUITAR_CHORUS_A_RIFF_C_D]: {
    "path": "https://kairuz.github.io/collage/assets/audio/samples/lambda/lambda-guitar-11-8-110bpm-chorusA-riffC-D.ogg"
  },

};

const STANDARD_BEAT_NOTE  = 1/4; // quarter note beats assumed for bpm measurement

const BEATS_PER_MINUTE    = 110; // 1 quarter note = 1 beat; 110 quarter notes (220 eighth notes) per minute
const NOTES_PER_BAR       = 11;
const NOTE_TYPE           = 1/8; // song is in 11/8 time (eleven eighth notes per bar)
const BEATS_PER_NOTE      = STANDARD_BEAT_NOTE / NOTE_TYPE;
const BEATS_PER_BAR       = NOTES_PER_BAR * BEATS_PER_NOTE;
const BEAT_LENGTH_MILLIS  = (60000 / BEATS_PER_MINUTE) * (NOTE_TYPE / STANDARD_BEAT_NOTE);
const NOTE_LENGTH_MILLIS  = BEAT_LENGTH_MILLIS * BEATS_PER_NOTE;
const BAR_LENGTH_MILLIS   = NOTE_LENGTH_MILLIS * NOTES_PER_BAR;
const BAR_LENGTH_SECS     = (NOTE_LENGTH_MILLIS * NOTES_PER_BAR) / 1000;

// 1      &      2      &      3      &      4      &      5      &      6      &      7      &      8      &      9      &      10     &      11     &
const RHYTHM_DRUMS_KICK =
  [0,                                 2.5,                                      5.5,                               8                                         ];
const RHYTHM_DRUMS_SNARE =
  [                            2,                                 4.5,                                      7.5,                               10            ];
const RHYTHM_DRUMS_CRASH =
  [0                                                                                                                                                         ];
const RHYTHM_DRUMS_HIHAT =
  [0,            1,            2,            3,            4,            5,            6,            7,            8,             9,           10            ];
const RHYTHM_DRUMS_HIHAT_ACCENTED =
  [0,            1,            2,            3,            4,                          6,            7,            8,             9,           10            ];
const RHYTHM_DRUMS_HIHAT_OPEN =
  [                                                                             5.5                                                                          ];
const RHYTHM_DRUMS_HIHAT_OPEN_ACCENTED =
  [                                                                      5                                                                                   ];


const OFFSETS_KICK                = RHYTHM_DRUMS_KICK.map((note) => note * NOTE_LENGTH_MILLIS);
const OFFSETS_SNARE               = RHYTHM_DRUMS_SNARE.map((note) => note * NOTE_LENGTH_MILLIS);
const OFFSETS_CRASH               = RHYTHM_DRUMS_CRASH.map((note) => note * NOTE_LENGTH_MILLIS);
const OFFSETS_HIHAT               = RHYTHM_DRUMS_HIHAT.map((note) => note * NOTE_LENGTH_MILLIS);
const OFFSETS_HIHAT_ACCENTED      = RHYTHM_DRUMS_HIHAT_ACCENTED.map((note) => note * NOTE_LENGTH_MILLIS);
const OFFSETS_HIHAT_OPEN          = RHYTHM_DRUMS_HIHAT_OPEN.map((note) => note * NOTE_LENGTH_MILLIS);
const OFFSETS_HIHAT_OPEN_ACCENTED = RHYTHM_DRUMS_HIHAT_OPEN_ACCENTED.map((note) => note * NOTE_LENGTH_MILLIS);


const SAMPLING_DESCRIPTORS_KICK                 = OFFSETS_KICK.map((offset) => new SamplingDescriptor(SAMPLE_DRUMS_KICK, offset));
const SAMPLING_DESCRIPTORS_SNARE                = OFFSETS_SNARE.map((offset) => new SamplingDescriptor(SAMPLE_DRUMS_SNARE, offset));
const SAMPLING_DESCRIPTORS_CRASH                = OFFSETS_CRASH.map((offset) => new SamplingDescriptor(SAMPLE_DRUMS_CRASH, offset));
const SAMPLING_DESCRIPTORS_HIHAT                = OFFSETS_HIHAT.map((offset) => new SamplingDescriptor(SAMPLE_DRUMS_HIHAT, offset));
const SAMPLING_DESCRIPTORS_HIHAT_ACCENTED       = OFFSETS_HIHAT_ACCENTED.map((offset) => new SamplingDescriptor(SAMPLE_DRUMS_HIHAT, offset));
const SAMPLING_DESCRIPTORS_HIHAT_OPEN           = OFFSETS_HIHAT_OPEN.map((offset) => new SamplingDescriptor(SAMPLE_DRUMS_HIHAT_OPEN, offset));
const SAMPLING_DESCRIPTORS_HIHAT_OPEN_ACCENTED  = OFFSETS_HIHAT_OPEN_ACCENTED.map((offset) => new SamplingDescriptor(SAMPLE_DRUMS_HIHAT_OPEN, offset));



const SAMPLING_DESCRIPTOR_GUITAR_CHORUS_A_RIFF_A_BAR_A = [
    new SamplingDescriptor(SAMPLE_GUITAR_CHORUS_A_RIFF_A_A, -3 * NOTE_LENGTH_MILLIS),
    new SamplingDescriptor(SAMPLE_GUITAR_CHORUS_A_RIFF_A_B, (-3 + 5.5) * NOTE_LENGTH_MILLIS)
];
const SAMPLING_DESCRIPTOR_GUITAR_CHORUS_A_RIFF_A_BAR_B = [
    new SamplingDescriptor(SAMPLE_GUITAR_CHORUS_A_RIFF_A_C, -3 * NOTE_LENGTH_MILLIS),
    new SamplingDescriptor(SAMPLE_GUITAR_CHORUS_A_RIFF_A_D, (-3 + 5.5) * NOTE_LENGTH_MILLIS)
];

const SAMPLING_DESCRIPTOR_GUITAR_CHORUS_A_RIFF_B_BAR_A = [
  new SamplingDescriptor(SAMPLE_GUITAR_CHORUS_A_RIFF_B_A, -3 * NOTE_LENGTH_MILLIS),
  new SamplingDescriptor(SAMPLE_GUITAR_CHORUS_A_RIFF_B_B, (-3 + 5.5) * NOTE_LENGTH_MILLIS)
];
const SAMPLING_DESCRIPTOR_GUITAR_CHORUS_A_RIFF_B_BAR_B = [
  new SamplingDescriptor(SAMPLE_GUITAR_CHORUS_A_RIFF_B_C, -3 * NOTE_LENGTH_MILLIS),
  new SamplingDescriptor(SAMPLE_GUITAR_CHORUS_A_RIFF_B_D, (-3 + 5.5) * NOTE_LENGTH_MILLIS)
];
const SAMPLING_DESCRIPTOR_GUITAR_CHORUS_A_RIFF_C_BAR_A = [
  new SamplingDescriptor(SAMPLE_GUITAR_CHORUS_A_RIFF_C_A, -3 * NOTE_LENGTH_MILLIS),
  new SamplingDescriptor(SAMPLE_GUITAR_CHORUS_A_RIFF_C_B, (-3 + 5.5) * NOTE_LENGTH_MILLIS)
];
const SAMPLING_DESCRIPTOR_GUITAR_CHORUS_A_RIFF_C_BAR_B = [
  new SamplingDescriptor(SAMPLE_GUITAR_CHORUS_A_RIFF_C_C, -3 * NOTE_LENGTH_MILLIS),
  new SamplingDescriptor(SAMPLE_GUITAR_CHORUS_A_RIFF_C_D, (-3 + 5.5) * NOTE_LENGTH_MILLIS)
];



const SAMPLING_DESCRIPTORS = [
  ...SAMPLING_DESCRIPTORS_KICK,
  ...SAMPLING_DESCRIPTORS_SNARE,
  ...SAMPLING_DESCRIPTORS_CRASH,
  ...SAMPLING_DESCRIPTORS_HIHAT,
  ...SAMPLING_DESCRIPTORS_HIHAT_ACCENTED,
  ...SAMPLING_DESCRIPTORS_HIHAT_OPEN,
  ...SAMPLING_DESCRIPTORS_HIHAT_OPEN_ACCENTED,
  ...SAMPLING_DESCRIPTOR_GUITAR_CHORUS_A_RIFF_A_BAR_A,
  ...SAMPLING_DESCRIPTOR_GUITAR_CHORUS_A_RIFF_A_BAR_B,
  ...SAMPLING_DESCRIPTOR_GUITAR_CHORUS_A_RIFF_B_BAR_A,
  ...SAMPLING_DESCRIPTOR_GUITAR_CHORUS_A_RIFF_B_BAR_B,
  ...SAMPLING_DESCRIPTOR_GUITAR_CHORUS_A_RIFF_C_BAR_A,
  ...SAMPLING_DESCRIPTOR_GUITAR_CHORUS_A_RIFF_C_BAR_B
];



const BAR_DESCRIPTOR_A_CHORUS_A_RIFF_A_BAR_A = new BarDescriptor(BAR_LENGTH_MILLIS, [
  ...SAMPLING_DESCRIPTORS_KICK,
  ...SAMPLING_DESCRIPTORS_SNARE,
  ...SAMPLING_DESCRIPTORS_CRASH,
  ...SAMPLING_DESCRIPTORS_HIHAT,
  ...SAMPLING_DESCRIPTORS_HIHAT_OPEN,
  ...SAMPLING_DESCRIPTOR_GUITAR_CHORUS_A_RIFF_A_BAR_A
]);

const BAR_DESCRIPTOR_A_CHORUS_A_RIFF_A_BAR_B = new BarDescriptor(BAR_LENGTH_MILLIS, [
  ...SAMPLING_DESCRIPTORS_KICK,
  ...SAMPLING_DESCRIPTORS_SNARE,
  ...SAMPLING_DESCRIPTORS_CRASH,
  ...SAMPLING_DESCRIPTORS_HIHAT,
  ...SAMPLING_DESCRIPTORS_HIHAT_OPEN,
  ...SAMPLING_DESCRIPTOR_GUITAR_CHORUS_A_RIFF_A_BAR_B
]);

const BAR_DESCRIPTOR_B_CHORUS_A_RIFF_A_BAR_A = new BarDescriptor(BAR_LENGTH_MILLIS, [
  ...SAMPLING_DESCRIPTORS_KICK,
  ...SAMPLING_DESCRIPTORS_SNARE,
  ...SAMPLING_DESCRIPTORS_CRASH,
  ...SAMPLING_DESCRIPTORS_HIHAT_ACCENTED,
  ...SAMPLING_DESCRIPTORS_HIHAT_OPEN_ACCENTED,
  ...SAMPLING_DESCRIPTOR_GUITAR_CHORUS_A_RIFF_A_BAR_A
]);

const BAR_DESCRIPTOR_B_CHORUS_A_RIFF_A_BAR_B = new BarDescriptor(BAR_LENGTH_MILLIS, [
  ...SAMPLING_DESCRIPTORS_KICK,
  ...SAMPLING_DESCRIPTORS_SNARE,
  ...SAMPLING_DESCRIPTORS_CRASH,
  ...SAMPLING_DESCRIPTORS_HIHAT_ACCENTED,
  ...SAMPLING_DESCRIPTORS_HIHAT_OPEN_ACCENTED,
  ...SAMPLING_DESCRIPTOR_GUITAR_CHORUS_A_RIFF_A_BAR_B
]);

const BAR_DESCRIPTOR_C_CHORUS_A_RIFF_B_BAR_A = new BarDescriptor(BAR_LENGTH_MILLIS, [
  ...SAMPLING_DESCRIPTORS_KICK,
  ...SAMPLING_DESCRIPTORS_SNARE,
  ...SAMPLING_DESCRIPTORS_CRASH,
  ...SAMPLING_DESCRIPTORS_HIHAT,
  ...SAMPLING_DESCRIPTORS_HIHAT_OPEN,
  ...SAMPLING_DESCRIPTOR_GUITAR_CHORUS_A_RIFF_B_BAR_A
]);

const BAR_DESCRIPTOR_C_CHORUS_A_RIFF_B_BAR_B = new BarDescriptor(BAR_LENGTH_MILLIS, [
  ...SAMPLING_DESCRIPTORS_KICK,
  ...SAMPLING_DESCRIPTORS_SNARE,
  ...SAMPLING_DESCRIPTORS_CRASH,
  ...SAMPLING_DESCRIPTORS_HIHAT,
  ...SAMPLING_DESCRIPTORS_HIHAT_OPEN,
  ...SAMPLING_DESCRIPTOR_GUITAR_CHORUS_A_RIFF_B_BAR_B
]);


const BAR_DESCRIPTOR_D_CHORUS_A_RIFF_C_BAR_A = new BarDescriptor(BAR_LENGTH_MILLIS, [
  ...SAMPLING_DESCRIPTORS_KICK,
  ...SAMPLING_DESCRIPTORS_SNARE,
  ...SAMPLING_DESCRIPTORS_CRASH,
  ...SAMPLING_DESCRIPTORS_HIHAT_ACCENTED,
  ...SAMPLING_DESCRIPTORS_HIHAT_OPEN_ACCENTED,
  ...SAMPLING_DESCRIPTOR_GUITAR_CHORUS_A_RIFF_C_BAR_A
]);

const BAR_DESCRIPTOR_D_CHORUS_A_RIFF_C_BAR_B = new BarDescriptor(BAR_LENGTH_MILLIS, [
  ...SAMPLING_DESCRIPTORS_KICK,
  ...SAMPLING_DESCRIPTORS_SNARE,
  ...SAMPLING_DESCRIPTORS_CRASH,
  ...SAMPLING_DESCRIPTORS_HIHAT_ACCENTED,
  ...SAMPLING_DESCRIPTORS_HIHAT_OPEN_ACCENTED,
  ...SAMPLING_DESCRIPTOR_GUITAR_CHORUS_A_RIFF_C_BAR_B
]);


const BAR_DESCRIPTOR_D_CHORUS_A_RIFF_C_BAR_C = new BarDescriptor(BAR_LENGTH_MILLIS, [
  ...SAMPLING_DESCRIPTORS_KICK,
  ...SAMPLING_DESCRIPTORS_SNARE,
  ...SAMPLING_DESCRIPTORS_CRASH,
  ...SAMPLING_DESCRIPTORS_HIHAT_ACCENTED,
  ...SAMPLING_DESCRIPTORS_HIHAT_OPEN_ACCENTED,
  ...SAMPLING_DESCRIPTOR_GUITAR_CHORUS_A_RIFF_C_BAR_A,
  ...SAMPLING_DESCRIPTOR_GUITAR_CHORUS_A_RIFF_A_BAR_A
]);

const BAR_DESCRIPTOR_D_CHORUS_A_RIFF_C_BAR_D = new BarDescriptor(BAR_LENGTH_MILLIS, [
  ...SAMPLING_DESCRIPTORS_KICK,
  ...SAMPLING_DESCRIPTORS_SNARE,
  ...SAMPLING_DESCRIPTORS_CRASH,
  ...SAMPLING_DESCRIPTORS_HIHAT_ACCENTED,
  ...SAMPLING_DESCRIPTORS_HIHAT_OPEN_ACCENTED,
  ...SAMPLING_DESCRIPTOR_GUITAR_CHORUS_A_RIFF_C_BAR_B,
  ...SAMPLING_DESCRIPTOR_GUITAR_CHORUS_A_RIFF_A_BAR_B
]);



const BAR_DESCRIPTORS = [

    BAR_DESCRIPTOR_D_CHORUS_A_RIFF_C_BAR_A, BAR_DESCRIPTOR_D_CHORUS_A_RIFF_C_BAR_B,
    BAR_DESCRIPTOR_D_CHORUS_A_RIFF_C_BAR_A, BAR_DESCRIPTOR_D_CHORUS_A_RIFF_C_BAR_B,

    BAR_DESCRIPTOR_D_CHORUS_A_RIFF_C_BAR_C, BAR_DESCRIPTOR_D_CHORUS_A_RIFF_C_BAR_D,
    BAR_DESCRIPTOR_A_CHORUS_A_RIFF_A_BAR_A, BAR_DESCRIPTOR_A_CHORUS_A_RIFF_A_BAR_B,

    BAR_DESCRIPTOR_D_CHORUS_A_RIFF_C_BAR_A, BAR_DESCRIPTOR_D_CHORUS_A_RIFF_C_BAR_B,
    BAR_DESCRIPTOR_D_CHORUS_A_RIFF_C_BAR_A, BAR_DESCRIPTOR_D_CHORUS_A_RIFF_C_BAR_B,
    BAR_DESCRIPTOR_B_CHORUS_A_RIFF_A_BAR_A, BAR_DESCRIPTOR_B_CHORUS_A_RIFF_A_BAR_B,
    BAR_DESCRIPTOR_A_CHORUS_A_RIFF_A_BAR_A, BAR_DESCRIPTOR_A_CHORUS_A_RIFF_A_BAR_B,
    BAR_DESCRIPTOR_C_CHORUS_A_RIFF_B_BAR_A, BAR_DESCRIPTOR_C_CHORUS_A_RIFF_B_BAR_B,

    // BAR_DESCRIPTOR_D_CHORUS_A_RIFF_C_BAR_A, BAR_DESCRIPTOR_D_CHORUS_A_RIFF_C_BAR_B,
    // BAR_DESCRIPTOR_D_CHORUS_A_RIFF_C_BAR_A, BAR_DESCRIPTOR_D_CHORUS_A_RIFF_C_BAR_B,

    // BAR_DESCRIPTOR_D_CHORUS_A_RIFF_C_BAR_C, BAR_DESCRIPTOR_D_CHORUS_A_RIFF_C_BAR_D,
    // BAR_DESCRIPTOR_A_CHORUS_A_RIFF_A_BAR_A, BAR_DESCRIPTOR_A_CHORUS_A_RIFF_A_BAR_B,


];


export {
  SAMPLE_MODELS,
  SAMPLING_DESCRIPTORS,
  BAR_DESCRIPTORS
}
