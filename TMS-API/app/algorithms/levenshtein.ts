import levenshtein from "js-levenshtein";
import Algorithm from "./algorithm";


export class Levenshtein implements Algorithm {

    getScore(compareFrom: string, compareTo: string) {
        return levenshtein(compareFrom, compareTo);
    }
}