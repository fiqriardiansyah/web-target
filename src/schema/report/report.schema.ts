import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";
import { FORMAT_DATE_1 } from "../../@constant/constant";

const dateSchema = z
    .custom<Dayjs>((value) => {
        if (!value) return true;
        return dayjs.isDayjs(value)
    }, {
        message: "Invalid Day.js object",
    }).transform((value) => value ? dayjs(value).format(FORMAT_DATE_1) : undefined);

export const reportFilterSchema = z.object({
    startDate: dateSchema.optional(),
    endDate: dateSchema.optional(),
});

export type ReportFilterSchema = z.infer<typeof reportFilterSchema>;