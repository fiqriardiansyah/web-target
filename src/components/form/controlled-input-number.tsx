/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, FormItemProps, Input, InputProps } from "antd";
import { Control, Controller, ControllerProps, FieldValues, Path } from "react-hook-form";
import { formatNumberWithDots } from "../../utils";

type ControlledInputNumberProps<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    rules?: object;
    inputProps?: InputProps;
    formItemProps?: FormItemProps;
    controllerProps?: ControllerProps;
};

export const ControlledInputNumber = <T extends FieldValues>({
    name,
    control,
    label,
    rules,
    inputProps,
    formItemProps,
    controllerProps,
}: ControlledInputNumberProps<T>) => {
    const { type, ...input } = inputProps || {};
    return (
        <Form.Item label={label} {...formItemProps}>
            <Controller
                {...controllerProps}
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <Input
                            {...field}
                            {...input}
                            type="text"
                            onKeyDown={(e) => {
                                if (!/^\d$/.test(e.key) && e.key !== "Backspace") {
                                    e.preventDefault();
                                }
                            }}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                field.onChange(formatNumberWithDots(parseInt(value === '' ? '0' : value)));
                            }}
                            name={name}
                            status={error ? "error" : undefined} />
                        {error && <span className="text-red-400 italic text-[10px]">{error.message}</span>}
                    </>
                )}
            />
        </Form.Item>
    );
};