import { Form, Input, InputProps, FormItemProps } from "antd";
import { Control, Controller, FieldValues, Path, ControllerProps } from "react-hook-form";

type ControlledInputProps<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    rules?: object;
    inputProps?: InputProps;
    formItemProps?: FormItemProps;
    controllerProps?: ControllerProps;
};

export const ControlledInput = <T extends FieldValues>({
    name,
    control,
    label,
    rules,
    inputProps,
    formItemProps,
    controllerProps,
}: ControlledInputProps<T>) => {
    return (
        <Form.Item label={label} {...formItemProps}>
            <Controller
                {...controllerProps}
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                    <>
                        {inputProps?.type === "password"
                            ? <Input.Password {...field} {...inputProps} name={name} status={error ? "error" : undefined} />
                            : <Input {...field} {...inputProps} name={name} status={error ? "error" : undefined} />}
                        {error && <span className="text-red-400 italic text-[10px]">{error.message}</span>}
                    </>
                )}
            />
        </Form.Item>
    );
};