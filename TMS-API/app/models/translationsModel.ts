import mongoose, {HookDoneFunction} from 'mongoose';


export interface TranslationsModel {
    source: string,
    target: string,
    sourceLanguage: string,
    targetLanguage: string,
    length_source?: number
}

interface TranslationDoc extends mongoose.Document {
    source: string,
    target: string,
    sourceLanguage: string,
    targetLanguage: string,
    length_source?: number
}

interface TranslationModel extends mongoose.Model<TranslationDoc> {
    build(attrs: TranslationsModel): TranslationDoc;
}


const translationSchema = new mongoose.Schema(
    {
        source: {
            type: String,
            required: true,
        },
        target: {
            type: String,
            required: true,
        },
        sourceLanguage: {
            type: String,
            required: true,
        },
        targetLanguage: {
            type: String,
            required: true,
        },
        length_source: Number
    }
)

translationSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc: any, ret: any) {
        delete ret._id;
        delete ret.__v;
        delete ret.length_source;
        delete ret.id;
    }
});

translationSchema.pre('save', async function(done: HookDoneFunction) {
    done();
});

translationSchema.statics.build = (attrs: TranslationsModel) => {
    attrs = {...attrs, length_source: attrs.source.length}
    return new Translation(attrs);
};

const Translation = mongoose.model<TranslationDoc, TranslationModel>("Translation", translationSchema);
export default Translation;
