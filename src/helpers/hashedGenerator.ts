import bcrypt from 'bcryptjs';

export const hashedGenerator = async (password: string) => {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}