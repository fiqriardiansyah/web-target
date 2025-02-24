/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, FormItemProps, Input, InputProps } from "antd";
import { Control, Controller, ControllerProps, FieldValues, Path } from "react-hook-form";

type ControlledInputPasswordProps<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    rules?: object;
    inputProps?: InputProps;
    formItemProps?: FormItemProps;
    controllerProps?: ControllerProps;
};

export const ControlledInputPassword = <T extends FieldValues>({
    name,
    control,
    label,
    rules,
    inputProps,
    formItemProps,
    controllerProps,
}: ControlledInputPasswordProps<T>) => {
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
                        <Input.Password {...field} {...input} name={name} status={error ? "error" : undefined} />
                        {error && <span className="text-red-400 italic text-[10px]">{error.message}</span>}
                    </>
                )}
            />
        </Form.Item>
    );
};