import bcrypt from 'bcryptjs';

export const hashedPasswordGenerator = async (password: string) => {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export const deHash = async (inputPassword: string, hashedPassword: string) => {
    return await bcrypt.compare(inputPassword, hashedPassword);
}