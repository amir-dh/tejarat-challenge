require('dotenv').config();

class Utils {
    
    static getValue(key: string, throwOnMissing = true): string | undefined {
        const value = process.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }

        return value;
    }
}

export default Utils;