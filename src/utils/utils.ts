import { DurationType } from "src/db/entities/plan.entity";

require('dotenv').config();

class Utils {

    static getValue(key: string, throwOnMissing = true): string | undefined {
        const value = process.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }

        return value;
    }

    static durationToDate(duration: number, durationType: DurationType) {
        const now = new Date()
        switch (durationType) {
            case DurationType.YEAR:
                now.setFullYear(now.getFullYear() + duration);
                break;
            case DurationType.MONTH:
                now.setMonth(now.getMonth() + duration);
                break;
            case DurationType.DAY:
                now.setDate(now.getDate() + duration);
        }

        return now;
    }
}

export default Utils;