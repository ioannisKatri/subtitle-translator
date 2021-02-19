export default interface Algorithm {
    getScore:(compareFrom: string, compareTo: string) => number
}