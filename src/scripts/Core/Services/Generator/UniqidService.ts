import uniqid from 'uniqid';

export default class UniqidService {
    public static generate(): string {
        return uniqid();
    }
}