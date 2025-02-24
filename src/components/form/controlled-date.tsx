import { DatePicker, Form, FormItemProps, DatePickerProps } from "antd";
import { Control, Controller, ControllerProps, FieldValues, Path } from "react-hook-form";

type ControlledDateProps<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    rules?: object;
    inputProps?: DatePickerProps;
    formItemProps?: FormItemProps;
    controllerProps?: ControllerProps;
};

export const ControlledDate = <T extends FieldValues>({
    name,
    control,
    label,
    rules,
    inputProps,
    formItemProps,
    controllerProps,
}: ControlledDateProps<T>) => {
    return (
        <Form.Item label={label} {...formItemProps} className="w-full">
            <Controller
                {...controllerProps}
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                    <div className="flex flex-col w-full">
                        <DatePicker {...field} {...inputProps} name={name} status={error ? "error" : undefined} />
                        {error && <span className="text-red-400 italic text-[10px]">{error.message}</span>}
                    </div>
                )}
            />
        </Form.Item>
    );
};