import bcrypt from 'bcryptjs';

export default class Utils {
    public static HashPassword(password: string): string {
        return bcrypt.hashSync(password);
    }

    public static ComparePassword(plain: string, hash: string): boolean {
        return bcrypt.compareSync(plain, hash);
    }
}
