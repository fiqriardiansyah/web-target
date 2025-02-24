import { z } from "zod";
import dayjs, { Dayjs } from "dayjs";
import { FORMAT_DATE_1 } from "../../@constant/constant";

const dateSchema = z
    .custom<Dayjs>((value) => {
        if (!value) return true;
        return dayjs.isDayjs(value)
    }, {
        message: "Invalid Day.js object",
    }).transform((value) => value ? dayjs(value).format(FORMAT_DATE_1) : undefined);

export const filterTransactionSchema = z.object({
    startDate: dateSchema.optional(),
    endDate: dateSchema.optional(),
});

export const cancelNoteSchema = z.object({
    note: z.string().min(1),
});

export type FilterTransactionSchema = z.infer<typeof filterTransactionSchema>;

export type CancelNoteSchema = z.infer<typeof cancelNoteSchema>;